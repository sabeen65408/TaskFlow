import { useState } from "react";
import {
    useNavigate,
    useLocation,
    Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    resetPassword
} from "../services/authService";

import "../styles/login.css";

function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    // Email passed from ForgotPassword.jsx
    const email =
        location.state?.email;


    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // Protect Page
    // ==========================================

    if (!email) {

        return (

            <div className="login-page">

                <div className="login-card">

                    <h1>
                        ⚠️ Invalid Request
                    </h1>

                    <p>
                        Please start the password
                        reset process again.
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                "/forgot-password"
                            )
                        }
                    >
                        Forgot Password
                    </button>

                </div>

            </div>

        );

    }


    // ==========================================
    // Reset Password
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // ======================================
        // Validate Fields
        // ======================================

        if (
            !password ||
            !confirmPassword
        ) {

            toast.error(
                "Please fill all fields"
            );

            return;

        }


        // ======================================
        // Validate Password Length
        // ======================================

        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;

        }


        // ======================================
        // Confirm Password
        // ======================================

        if (
            password !== confirmPassword
        ) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }


        try {

            setLoading(true);


            // ==================================
            // Reset Password
            // ==================================

            const res =
                await resetPassword(

                    email,

                    password

                );


            toast.success(
                res.message
            );


            // ==================================
            // Redirect to Login
            // ==================================

            setTimeout(() => {

                navigate("/");

            }, 1800);

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to reset password"

            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>
                    🔒 Reset Password
                </h1>


                <p>
                    Enter your new password.
                </p>


                <form
                    onSubmit={handleSubmit}
                >

                    {/* New Password */}

                    <input

                        type="password"

                        placeholder="New Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                        required

                    />


                    {/* Confirm Password */}

                    <input

                        type="password"

                        placeholder="Confirm Password"

                        value={confirmPassword}

                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }

                        required

                    />


                    {/* Submit */}

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {loading

                            ? "Updating..."

                            : "Reset Password"

                        }

                    </button>

                </form>


                {/* Login Link */}

                <p className="bottom-text">

                    Remember your password?

                    {" "}

                    <Link to="/">

                        Login

                    </Link>

                </p>


            </div>

        </div>

    );

}

export default ResetPassword;