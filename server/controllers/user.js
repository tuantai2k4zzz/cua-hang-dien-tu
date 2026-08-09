import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import {generateAccessToken, generateRefreshToken} from "../middlewares/jwt.js"
import jwt, { decode } from "jsonwebtoken"
import sendMail from "../ultils/sendmail.js"
import html from "../ultils/textHtml.js"
import crypto from "crypto"


const register = asyncHandler(async (req, res) => {
    const {email, password, firstname, lastname, mobile} = req.body
    if(!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            sucess: false, 
            mes: "Missing inputs"
        })
    }
    const user = await User.findOne({email})
    if(user) throw new Error("User has existed!")
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            sucess: newUser ? true : false,
            mes: newUser ? "Register is successfully. Please go to login!" : "Something went wrong!"        
        })
    }
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({
            sucess: false, 
            mes: "Missing inputs"
        })
    }
    const response = await User.findOne({email})

    if(response && await response.isCorrectPassword(password) === true) {
        const {password, role, refreshtoken, ...userData} = response.toObject()
        const accesToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, {refreshtoken: refreshToken}, {returnDocument: "after"})
        res.cookie("refreshtoken", refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
        res.status(200).json({
            success: true,
            userData,
            accesToken
        })
    }else {
        throw new Error("Invalid credentials!")
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const user = await User.findById(_id).select("-refreshtoken")
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : "User not found!"
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.refreshtoken) {
        throw new Error("No refreshToken in cookie!");
    }

    const decode = jwt.verify(
        cookie.refreshtoken,
        process.env.JWT_SECRET
    );

    const response = await User.findOne({
        _id: decode._id,
        refreshtoken: cookie.refreshtoken
    });

    return res.status(response ? 200 : 401).json({
        success: response ? true : false,
        newAccessToken: response
            ? generateAccessToken(response._id, response.role)
            : "refresh token not matched!"
    });
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshtoken) throw new Error("No refreshToken in cookie!");
    await User.findOneAndUpdate({refreshtoken: cookie.refreshToken}, {refreshtoken: ''}, {new: true})
    res.clearCookie("refreshtoken", {httpOnly: true, secure: true})
    return res.status(200).json({
        success: true,
        mes: "Logout success"
    })
})

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body
    if(!email) throw new Error("Missing input!");
    const user = await User.findOne({email})
    if(!user) throw new Error("User not found!")
    const resetToken = user.createPasswordChangeToken()
    await user.save()

    const textHtml = html(resetToken)

    const data = {
        email,
        html : textHtml
    }

    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })

})

const resetPassword = asyncHandler(async (req,res) => {
    const {password, token} = req.body
    if(!password || !token) throw new Error("Missing inputs!")
    const tokenReset = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken: tokenReset, passwordResetExpire: {$gt: Date.now()}}, {new: true})
    if(!user) throw new Erro("Token not match!")
    user.password = password
    user.passwordChangeAt = Date.now()
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined
    user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Updated password!" : "Something went wrong!"
    })
})

export {register, login, getCurrent, refreshAccessToken, logout, forgotPassword,resetPassword}