import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css"; // reuse base styles

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("If the account exists, a reset link has been sent to your email.");
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
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
        <div className="login-right forgot-right">
          <h2>Forgot Password</h2>

          <p className="forgot-info">
            Enter your registered email address and we’ll send you a reset link.
          </p>

          {error && <p className="error-text shake">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <input
            className="login-input"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="login-btn press"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="back-to-login">
            Remember your password?
            <span onClick={() => navigate("/")}> Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
