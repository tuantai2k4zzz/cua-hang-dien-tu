import User from "../models/user.js"
import asyncHandler from "express-async-handler"


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
        const {password, role, ...userData} = response.toObject()
        res.status(200).json({
            success: true,
            userData
        })
    }else {
        throw new Error("Invalid credentials!")
    }
})
export {register, login}