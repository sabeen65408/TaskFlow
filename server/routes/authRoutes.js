const express = require("express");

const router = express.Router();

const {
    loginUser,
    forgotPassword,
    verifyResetOtp,
    resetPassword
} = require("../controllers/authController");


// =====================================
// Login
// =====================================

router.post(
    "/login",
    loginUser
);


// =====================================
// Forgot Password - Send OTP
// =====================================

router.post(
    "/forgot-password",
    forgotPassword
);


// =====================================
// Verify OTP
// =====================================

router.post(
    "/verify-reset-otp",
    verifyResetOtp
);


// =====================================
// Reset Password
// =====================================

router.post(
    "/reset-password",
    resetPassword
);


module.exports = router;