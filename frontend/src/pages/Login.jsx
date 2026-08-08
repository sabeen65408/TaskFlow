import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";

function Login() {

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser({
                emailOrPhone,
                password,
            });

            console.log("Login Response:", data);

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "role",
                data.role
            );

            localStorage.setItem(
                "name",
                data.name
            );

            window.dispatchEvent(
                new Event("authChanged")
            );

            toast.success(
                "Login Successful 🎉"
            );

            if (data.role === "admin") {

                navigate("/dashboard", {
                    replace: true,
                });

            } else {

                navigate("/employee/dashboard", {
                    replace: true,
                });

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid Email/Phone or Password"
            );

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>
                    🚀 TaskFlow
                </h1>

                <p>
                    Manage your work efficiently
                </p>

                <form onSubmit={handleLogin}>

                    {/* Email / Phone */}

                    <input
                        type="text"
                        placeholder="Email or Phone Number"
                        value={emailOrPhone}
                        onChange={(e) =>
                            setEmailOrPhone(e.target.value)
                        }
                        required
                    />

                    {/* Password */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {/* Forgot Password */}

                    <div
                        style={{
                            textAlign: "right",
                            marginBottom: "18px",
                        }}
                    >

                        <Link
                            to="/forgot-password"
                            style={{
                                color: "#4f46e5",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Login Button */}

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;