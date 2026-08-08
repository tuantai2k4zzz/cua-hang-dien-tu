import express from "express"
const router = express.Router()
import {getCurrent, login, logout, refreshAccessToken, register} from "../controllers/user.js"
import { verifyAccessToken } from "../middlewares/verifyToken.js"


router.post("/register", register)
router.post("/login", login)
router.get("/current", verifyAccessToken, getCurrent)
router.post("/refreshAccessToken", refreshAccessToken)
router.get("/logout", logout)


export default router