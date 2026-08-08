import axios from "axios";

const API =
    `${import.meta.env.VITE_API_URL}/auth`;

// =====================================
// Login
// Login works with Email OR Phone
// =====================================

export const loginUser = async (userData) => {

    const response =
        await axios.post(
            `${API}/login`,
            userData
        );

    return response.data;
};


// =====================================
// Forgot Password - Send OTP
// Email ONLY
// =====================================

export const forgotPassword = async (email) => {

    const response =
        await axios.post(

            `${API}/forgot-password`,

            {
                email,
            }

        );

    return response.data;
};


// =====================================
// Verify Reset OTP
// Email ONLY
// =====================================

export const verifyResetOtp = async (
    email,
    otp
) => {

    const response =
        await axios.post(

            `${API}/verify-reset-otp`,

            {
                email,
                otp,
            }

        );

    return response.data;
};


// =====================================
// Reset Password
// Email ONLY
// =====================================

export const resetPassword = async (
    email,
    password
) => {

    const response =
        await axios.post(

            `${API}/reset-password`,

            {
                email,
                password,
            }

        );

    return response.data;
};