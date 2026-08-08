import User from "../models/user.js"
import asyncHandler from "express-async-handler"
import {generateAccessToken, generateRefreshToken} from "../middlewares/jwt.js"


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

export {register, login, getCurrent}