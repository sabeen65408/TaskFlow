const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// ==================================================
// Login User
// Login with Email OR Phone
// ==================================================

const loginUser = async (req, res) => {

    try {

        const {
            emailOrPhone,
            password,
        } = req.body;


        // ==========================================
        // Validate Input
        // ==========================================

        if (!emailOrPhone || !emailOrPhone.trim()) {

            return res.status(400).json({

                message:
                    "Email or phone number is required",

            });

        }

        if (!password) {

            return res.status(400).json({

                message:
                    "Password is required",

            });

        }


        const input =
            emailOrPhone.trim();


        // ==========================================
        // Find User
        // ==========================================

        const user =
            await User.findOne({

                $or: [

                    {
                        email:
                            input.toLowerCase(),
                    },

                    {
                        phone:
                            input,
                    },

                ],

            });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid Email or Password",

            });

        }


        // ==========================================
        // Compare Password
        // ==========================================

        const isMatch =
            await bcrypt.compare(

                password,

                user.password

            );


        if (!isMatch) {

            return res.status(401).json({

                message:
                    "Invalid Email or Password",

            });

        }


        // ==========================================
        // Generate JWT
        // ==========================================

        const token =
            jwt.sign(

                {
                    id: user._id,
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d",
                }

            );


        // ==========================================
        // Response
        // ==========================================

        const response = {

            _id:
                user._id,

            name:
                user.name,

            email:
                user.email,

            phone:
                user.phone,

            role:
                user.role,

            token,

        };


        res.json(response);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ==================================================
// Forgot Password - Send Email OTP
// ==================================================

const forgotPassword = async (req, res) => {

    try {

        // ==========================================
        // Get Email
        // ==========================================

        const { email } = req.body;


        // ==========================================
        // Validate Email
        // ==========================================

        if (!email || !email.trim()) {

            return res.status(400).json({

                message:
                    "Please enter your registered email address",

            });

        }


        const input =
            email.trim().toLowerCase();


        // ==========================================
        // Find User by Email
        // ==========================================

        const user =
            await User.findOne({

                email:
                    input,

            });


        if (!user) {

            return res.status(404).json({

                message:
                    "No account found with this email address",

            });

        }


        // ==========================================
        // Generate 6-Digit OTP
        // ==========================================

        const otp =
            crypto
                .randomInt(
                    100000,
                    1000000
                )
                .toString();


        // ==========================================
        // Hash OTP
        // ==========================================

        const hashedOtp =
            await bcrypt.hash(

                otp,

                10

            );


        // ==========================================
        // Store OTP
        // ==========================================

        user.resetPasswordOtp =
            hashedOtp;


        // OTP valid for 10 minutes

        user.resetPasswordOtpExpire =
            Date.now() +
            10 * 60 * 1000;


        user.resetPasswordOtpVerified =
            false;


        await user.save();


        // ==========================================
        // Create Email Transporter
        // ==========================================

        const transporter =
            nodemailer.createTransport({

                service: "gmail",

                auth: {

                    user:
                        process.env.EMAIL_USER,

                    pass:
                        process.env.EMAIL_PASS,

                },

            });


        // ==========================================
        // Email Content
        // ==========================================

        const mailOptions = {

            from:
                process.env.EMAIL_USER,

            to:
                user.email,

            subject:
                "TaskFlow Password Reset OTP",

            html: `

                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: auto;
                        padding: 20px;
                    "
                >

                    <h2>
                        TaskFlow Password Reset
                    </h2>

                    <p>
                        Hello ${user.name},
                    </p>

                    <p>
                        We received a request to reset
                        your TaskFlow password.
                    </p>

                    <p>
                        Your verification OTP is:
                    </p>

                    <div
                        style="
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            padding: 15px;
                            background: #f3f4f6;
                            text-align: center;
                            border-radius: 8px;
                        "
                    >

                        ${otp}

                    </div>

                    <p>

                        This OTP will expire in

                        <strong>
                            10 minutes
                        </strong>.

                    </p>

                    <p>

                        If you did not request a
                        password reset, you can
                        safely ignore this email.

                    </p>

                </div>

            `,

        };


        // ==========================================
        // Send Email
        // ==========================================

        await transporter.sendMail(
            mailOptions
        );


        // ==========================================
        // Success
        // ==========================================

        res.json({

            success: true,

            method: "email",

            message:
                "OTP sent successfully to your registered email",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ==================================================
// Verify Reset OTP
// ==================================================

const verifyResetOtp = async (req, res) => {

    try {

        const {
            email,
            otp,
        } = req.body;


        // ==========================================
        // Validate Email
        // ==========================================

        if (!email || !email.trim()) {

            return res.status(400).json({

                message:
                    "Email address is required",

            });

        }


        // ==========================================
        // Validate OTP
        // ==========================================

        if (!otp || !otp.trim()) {

            return res.status(400).json({

                message:
                    "OTP is required",

            });

        }


        const input =
            email.trim().toLowerCase();


        // ==========================================
        // Find User
        // ==========================================

        const user =
            await User.findOne({

                email:
                    input,

            });


        if (!user) {

            return res.status(404).json({

                message:
                    "No account found with this email address",

            });

        }


        // ==========================================
        // Check OTP Exists
        // ==========================================

        if (
            !user.resetPasswordOtp ||
            !user.resetPasswordOtpExpire
        ) {

            return res.status(400).json({

                message:
                    "No OTP request found. Please request a new OTP.",

            });

        }


        // ==========================================
        // Check OTP Expiry
        // ==========================================

        if (
            user.resetPasswordOtpExpire <
            Date.now()
        ) {

            user.resetPasswordOtp =
                null;

            user.resetPasswordOtpExpire =
                null;

            user.resetPasswordOtpVerified =
                false;

            await user.save();


            return res.status(400).json({

                message:
                    "OTP has expired. Please request a new OTP.",

            });

        }


        // ==========================================
        // Compare OTP
        // ==========================================

        const isOtpValid =
            await bcrypt.compare(

                otp.trim(),

                user.resetPasswordOtp

            );


        if (!isOtpValid) {

            return res.status(400).json({

                message:
                    "Invalid OTP",

            });

        }


        // ==========================================
        // OTP Verified
        // ==========================================

        user.resetPasswordOtpVerified =
            true;

        await user.save();


        res.json({

            success: true,

            message:
                "OTP verified successfully",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ==================================================
// Reset Password
// ==================================================

const resetPassword = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;


        // ==========================================
        // Validate Email
        // ==========================================

        if (!email || !email.trim()) {

            return res.status(400).json({

                message:
                    "Email address is required",

            });

        }


        // ==========================================
        // Validate Password
        // ==========================================

        if (!password) {

            return res.status(400).json({

                message:
                    "Password is required",

            });

        }


        if (password.length < 6) {

            return res.status(400).json({

                message:
                    "Password must be at least 6 characters",

            });

        }


        const input =
            email.trim().toLowerCase();


        // ==========================================
        // Find User
        // ==========================================

        const user =
            await User.findOne({

                email:
                    input,

            });


        if (!user) {

            return res.status(404).json({

                message:
                    "No account found with this email address",

            });

        }


        // ==========================================
        // Check OTP Verification
        // ==========================================

        if (
            user.resetPasswordOtpVerified
            !== true
        ) {

            return res.status(400).json({

                message:
                    "Please verify the OTP first",

            });

        }


        // ==========================================
        // Hash New Password
        // ==========================================

        const hashedPassword =
            await bcrypt.hash(

                password,

                10

            );


        user.password =
            hashedPassword;


        // ==========================================
        // Clear OTP Data
        // ==========================================

        user.resetPasswordOtp =
            null;

        user.resetPasswordOtpExpire =
            null;

        user.resetPasswordOtpVerified =
            false;


        await user.save();


        // ==========================================
        // Success
        // ==========================================

        res.json({

            success: true,

            message:
                "Password reset successfully",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                error.message,

        });

    }

};


// ==================================================
// Export Controllers
// ==================================================

module.exports = {

    loginUser,

    forgotPassword,

    verifyResetOtp,

    resetPassword,

};