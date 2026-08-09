import nodemailer from "nodemailer"
import asyncHandler from "express-async-handler"


const sendMail = asyncHandler(async ({email, html} ) => {
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_APP_PASSWORD,
    }
    })
    const info = await transporter.sendMail({
        from: '"cua-hang-dien-tu" <no-reply@cuahangdientu.com>',
        to: email,
        subject: "Forgot password!", 
        html
        });
        return info
    }
)

export default sendMail