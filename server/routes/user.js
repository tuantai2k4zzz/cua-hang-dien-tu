import express from "express"
const router = express.Router()
import {forgotPassword, getCurrent, login, logout, refreshAccessToken, register, resetPassword} from "../controllers/user.js"
import { verifyAccessToken } from "../middlewares/verifyToken.js"


router.post("/register", register)
router.post("/login", login)
router.get("/current", verifyAccessToken, getCurrent)
router.post("/refreshAccessToken", refreshAccessToken)
router.get("/logout", logout)
router.get("/forgotPassword", forgotPassword)
router.put("/resetPassword", resetPassword)


export default router