import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", {
        username: fullName,
        password,
        confirmPassword,
        email,
        mobileNumber: mobileNumber?.trim() || "9999999999",
        role: "Student",
      });

      navigate("/login", { replace: true });
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-left">
          <h1>WELCOME</h1>
          <p>Student Registration</p>
        </div>

        <div className="signup-right">
          <h2>Create Account</h2>
          {error && <p className="error-text">{error}</p>}

          <input placeholder="Full Name" autoComplete="off" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input placeholder="Email Address" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Mobile Number (optional)" autoComplete="off" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          <input placeholder="Class / Grade" autoComplete="off" value={studentClass} onChange={(e) => setStudentClass(e.target.value)} />
          <input type="password" placeholder="Password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" autoComplete="off" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <button className="signup-btn" onClick={handleSignup}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
