import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [roleTab, setRoleTab] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/employee");

    } catch {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h1 className="title">Task Management System</h1>

        {/* ROLE TABS */}
        <div className="tabs">
          <button
            className={roleTab === "admin" ? "active" : ""}
            onClick={() => setRoleTab("admin")}
          >
            Admin
          </button>

          <button
            className={roleTab === "employee" ? "active" : ""}
            onClick={() => setRoleTab("employee")}
          >
            Employee
          </button>
        </div>

        {/* FORM */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          {roleTab === "admin"
            ? "Login as Admin"
            : "Login as Employee"}
        </button>

        {roleTab === "employee" && (
          <p className="register-text">
            New Employee?{" "}
            <span onClick={() => navigate("/register")}>
              Register here
            </span>
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;