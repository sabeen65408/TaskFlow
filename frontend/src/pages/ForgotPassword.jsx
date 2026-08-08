import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    forgotPassword,
    verifyResetOtp
} from "../services/authService";

import "../styles/login.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [step, setStep] =
        useState(1);

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // Send OTP
    // ==========================================

    const handleSendOtp = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error(
                "Please enter your email address"
            );

            return;

        }


        try {

            setLoading(true);


            const res =
                await forgotPassword(
                    email.trim()
                );


            toast.success(
                res.message
            );


            setStep(2);

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Unable to send OTP"

            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // Verify OTP
    // ==========================================

    const handleVerifyOtp = async (e) => {

        e.preventDefault();


        if (!otp.trim()) {

            toast.error(
                "Please enter the OTP"
            );

            return;

        }


        if (!/^\d{6}$/.test(otp)) {

            toast.error(
                "OTP must be 6 digits"
            );

            return;

        }


        try {

            setLoading(true);


            const res =
                await verifyResetOtp(

                    email.trim(),

                    otp.trim()

                );


            toast.success(
                res.message
            );


            // ==================================
            // Move to Reset Password page
            // ==================================

            navigate(
                "/reset-password",
                {

                    state: {
                        email:
                            email.trim()
                    }

                }
            );

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Invalid OTP"

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


                {step === 1 ? (

                    <>
                        <h1>
                            🔑 Forgot Password
                        </h1>


                        <p>

                            Enter your registered
                            email address.

                            <br />

                            We'll send you a
                            verification OTP.

                        </p>


                        <form
                            onSubmit={
                                handleSendOtp
                            }
                        >

                            <input

                                type="email"

                                placeholder="Email Address"

                                value={email}

                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }

                                required

                            />


                            <button

                                type="submit"

                                disabled={loading}

                            >

                                {loading

                                    ? "Sending OTP..."

                                    : "Send OTP"

                                }

                            </button>

                        </form>

                    </>

                ) : (

                    <>
                        <h1>
                            🔐 Verify OTP
                        </h1>


                        <p>

                            Enter the 6-digit OTP
                            sent to your registered
                            email address.

                        </p>


                        <form
                            onSubmit={
                                handleVerifyOtp
                            }
                        >

                            <input

                                type="text"

                                inputMode="numeric"

                                maxLength="6"

                                placeholder="Enter 6-digit OTP"

                                value={otp}

                                onChange={(e) => {

                                    const value =
                                        e.target.value
                                            .replace(
                                                /\D/g,
                                                ""
                                            );

                                    setOtp(value);

                                }}

                                required

                            />


                            <button

                                type="submit"

                                disabled={loading}

                            >

                                {loading

                                    ? "Verifying..."

                                    : "Verify OTP"

                                }

                            </button>

                        </form>


                        {/* Change Email */}

                        <button

                            type="button"

                            onClick={() => {

                                setStep(1);

                                setOtp("");

                            }}

                            style={{
                                marginTop: "12px",
                                background:
                                    "transparent",
                                color:
                                    "#4f46e5",
                                border: "none",
                                cursor:
                                    "pointer",
                                fontWeight:
                                    "500"
                            }}

                        >

                            Change Email

                        </button>

                    </>

                )}


                {/* Login */}

                <p className="bottom-text">

                    Remember your password?

                    {" "}

                    <Link to="/"
                    style={{
                                color: "#4f46e5",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}>

                        Login

                    </Link>

                </p>


            </div>

        </div>

    );

}

export default ForgotPassword;