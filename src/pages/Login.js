import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import "../styles/Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    const result = await dispatch(loginUser({ username, password }));
debugger
    if (loginUser.fulfilled.match(result)) {
      const role = result.payload.role;
      if (role === "Admin"){
         navigate("/admin");
      }
      else if (role === "Teacher"){
         navigate("/teacher");
      }
      else {
        navigate("/student");
      }
    } 
    else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* LEFT */}
        <div className="login-left">
          <h1>WELCOME</h1>
          <p>School Management System</p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Sign In</h2>

          {error && <p className="error-text">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>

          {/* 🔥 SIGNUP LINK (THIS WAS MISSING) */}
          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
