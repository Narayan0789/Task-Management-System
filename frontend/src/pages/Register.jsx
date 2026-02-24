import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Employee Registered ✅");
      navigate("/");
    } catch {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h1 className="title">Task Manager</h1>
        <p className="subtitle">Create your employee account</p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="register-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>

      </div>
    </div>
  );
}

export default Register;