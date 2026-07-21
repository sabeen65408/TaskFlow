import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser({
                email,
                password
            });

            console.log("Login Response:", data);

            localStorage.setItem("token", data.token);
            toast.success("Login Successful 🎉");
            navigate("/dashboard");

        } catch (error) {

            toast.error(error.response.data.message);

        }

    };

    return (
  <div className="login-page">

    <div className="login-card">

      <h1>🚀 TaskFlow</h1>

      <p>
        Manage your work efficiently
      </p>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>
          Login
        </button>

      </form>

      <p className="bottom-text">
        Don't have an account?

        <Link to="/register">
          Register
        </Link>
      </p>

    </div>

  </div>
);

}
export default Login;