import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import "../styles/Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const handleLogin = () => {
    dispatch(
      login({
        username: "demo",
        role: role,
      })
    );

    if (role === "admin") navigate("/admin");
    if (role === "teacher") navigate("/teacher");
    if (role === "student") navigate("/student");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h1>WELCOME</h1>
          <p>School Management System</p>
        </div>

        <div className="login-right">
          <h2>Sign In</h2>

          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>

          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
