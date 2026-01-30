import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa";
import "../styles/Login.css";

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [error, setError] = useState("");

  /* 🔁 LOAD SETTINGS */
  useEffect(() => {
    const savedUser = localStorage.getItem("rememberUser");
    const theme = localStorage.getItem("theme");

    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }

    if (theme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  /* 🌙 DARK MODE */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  /* 🔐 ACCOUNT LOCK CHECK */
  const isLocked = () => {
    const lockUntil = localStorage.getItem("lockUntil");
    return lockUntil && Date.now() < lockUntil;
  };

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    if (isLocked()) {
      setError("Account locked. Try again after 15 minutes.");
      return;
    }

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    const result = await dispatch(loginUser({ username, password }));
<<<<<<< HEAD
=======

>>>>>>> 402eed8 (Updated school management system)
    if (loginUser.fulfilled.match(result)) {
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("lockUntil");

      rememberMe
        ? localStorage.setItem("rememberUser", username)
        : localStorage.removeItem("rememberUser");

      const role = result.payload.role;
      if (role === "Admin") navigate("/admin");
      else if (role === "Teacher") navigate("/teacher");
      else navigate("/student");
    } else {
      let attempts = Number(localStorage.getItem("loginAttempts") || 0) + 1;
      localStorage.setItem("loginAttempts", attempts);

      // if (attempts >= MAX_ATTEMPTS) {
      //   localStorage.setItem("lockUntil", Date.now() + LOCK_TIME);
      //   setError("Too many failed attempts. Account locked for 15 minutes.");
      // } else {
      //   setError(`Invalid credentials (${MAX_ATTEMPTS - attempts} attempts left)`);
      // }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animate-in">

        {/* LEFT */}
        <div className="login-left">
          <h1>WELCOME</h1>
          <p>School Management System</p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <div className="top-actions">
            <span onClick={toggleDarkMode} className="theme-btn">
              {darkMode ? <FaSun /> : <FaMoon />}
            </span>
          </div>

          <h2>Sign In</h2>
          {error && <p className="error-text shake">{error}</p>}

          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) =>
                setCapsLock(e.getModifierState("CapsLock"))
              }
            />
            <span
              className="eye-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {capsLock && (
            <p className="caps-warning">⚠ Caps Lock is ON</p>
          )}

          <div className="options-row">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>

            <span
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>

          <button className="login-btn press" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
