import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { forgotPassword } from "../services/authService";

import "../styles/login.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error("Please enter your email");

            return;

        }

        try {

            setLoading(true);

            const res = await forgotPassword(email);

            toast.success(res.message);

            setEmail("");

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Something went wrong"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>

                    🔑 Forgot Password

                </h1>

                <p>

                    Enter your registered email address.

                    <br />

                    We'll send you a password reset link.

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="email"

                        placeholder="Enter your email"

                        value={email}

                        onChange={(e) =>

                            setEmail(e.target.value)

                        }

                        required

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Sending..."

                                : "Send Reset Link"

                        }

                    </button>

                </form>

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

export default ForgotPassword;