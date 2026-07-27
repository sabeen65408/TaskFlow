import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { resetPassword } from "../services/authService";

import "../styles/login.css";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!password || !confirmPassword) {

            toast.error("Please fill all fields");

            return;

        }

        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;

        }

        if (password !== confirmPassword) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }

        try {

            setLoading(true);

            const res = await resetPassword(
                token,
                password
            );

            toast.success(res.message);

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

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>

                    🔒 Reset Password

                </h1>

                <p>

                    Enter your new password.

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="password"

                        placeholder="New Password"

                        value={password}

                        onChange={(e)=>

                            setPassword(e.target.value)

                        }

                        required

                    />

                    <input

                        type="password"

                        placeholder="Confirm Password"

                        value={confirmPassword}

                        onChange={(e)=>

                            setConfirmPassword(e.target.value)

                        }

                        required

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Updating..."

                                : "Reset Password"

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

export default ResetPassword;