import express from "express"
const router = express.Router()
import {getCurrent, login, register} from "../controllers/user.js"
import { verifyAccessToken } from "../middlewares/verifyToken.js"


router.post("/register", register)
router.post("/login", login)
router.get("/current", verifyAccessToken, getCurrent)

export default router