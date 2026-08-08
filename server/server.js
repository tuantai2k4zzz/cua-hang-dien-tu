import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnect from "./config/dbconnect.js"
import initRoutes from "./routes/index.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = 5001 || process.env.PORT



// user
initRoutes(app)
dbConnect().then(() => {
    app.listen(port, () => {
    console.log("server is running!")
})
})