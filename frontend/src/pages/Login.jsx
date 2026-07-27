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
            window.dispatchEvent(new Event("authChanged"));

toast.success("Login Successful 🎉");

navigate("/dashboard", { replace: true });

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <div
  style={{
    textAlign:"right",
    marginBottom:"18px"
  }}
>
  <Link
    to="/forgot-password"
    style={{
      color:"#4f46e5",
      textDecoration:"none",
      fontSize:"14px",
      fontWeight:"500"
    }}
  >
    Forgot Password?
  </Link>
</div>

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