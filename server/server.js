const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = 5001 || process.env.PORT


app.use("/", (req, res) => {
    res.send("SERVER ON!")
})
app.listen(port, () => {
    console.log("server is running!")
})