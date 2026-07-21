import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      toast.success("Registration Successful 🎉");

      navigate("/dashboard");

    } catch (err) {
    toast.error(
        err.response?.data?.message || "Registration Failed"
    );
}
  };

  return (
  <div className="login-page">

    <div className="login-card">

      <h1>🚀 TaskFlow</h1>

      <p>Create your account</p>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p className="bottom-text">
        Already have an account?

        <Link to="/">
          Login
        </Link>
      </p>

    </div>

  </div>
);
}

export default Register;