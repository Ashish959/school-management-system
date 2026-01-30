import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: password
      });

      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setError("Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h3 style={{ padding: "40px" }}>Invalid or expired reset link</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card animate-in">

        {/* LEFT PANEL */}
        <div className="login-left">
          <h1>RESET</h1>
          <p>School Management System</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right reset-right">
          <h2>Reset Password</h2>

          <p className="reset-info">
            Create a strong password to secure your account.
          </p>

          {error && <p className="error-text shake">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <input
            className="login-input"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <small className="password-hint">
            Minimum 8 characters recommended
          </small>

          <button
            className="login-btn press"
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
