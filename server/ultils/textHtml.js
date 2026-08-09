const html = (resetToken) =>  `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
">

    <div style="
        width: 100%;
        padding: 40px 0;
        background-color: #f4f7fb;
    ">

        <div style="
            max-width: 520px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            padding: 40px;
            box-sizing: border-box;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        ">

            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="
                    display: inline-block;
                    width: 55px;
                    height: 55px;
                    line-height: 55px;
                    border-radius: 14px;
                    background-color: #2563eb;
                    color: #ffffff;
                    font-size: 24px;
                    font-weight: bold;
                ">
                    E
                </div>
            </div>

            <!-- Title -->
            <h1 style="
                margin: 0 0 15px;
                text-align: center;
                color: #111827;
                font-size: 28px;
            ">
                Reset Your Password
            </h1>

            <!-- Description -->
            <p style="
                margin: 0 0 25px;
                color: #6b7280;
                font-size: 15px;
                line-height: 1.7;
                text-align: center;
            ">
                We received a request to reset your password.
                Click the button below to create a new password for your account.
            </p>

            <!-- Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a
                    href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}"
                    style="
                        display: inline-block;
                        padding: 14px 28px;
                        background-color: #2563eb;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 10px;
                        font-size: 15px;
                        font-weight: bold;
                    "
                >
                    Reset Password
                </a>
            </div>

            <!-- Warning -->
            <div style="
                background-color: #f9fafb;
                border-radius: 10px;
                padding: 15px;
                margin-top: 25px;
            ">
                <p style="
                    margin: 0;
                    color: #6b7280;
                    font-size: 13px;
                    line-height: 1.6;
                ">
                    If you didn't request a password reset, you can safely
                    ignore this email. Your password will remain unchanged.
                </p>
            </div>

            <!-- Footer -->
            <div style="
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
            ">
                <p style="
                    margin: 0;
                    color: #9ca3af;
                    font-size: 12px;
                ">
                    © 2026 E-Commerce. All rights reserved.
                </p>
            </div>

        </div>

    </div>

</body>
</html>
`
export default html