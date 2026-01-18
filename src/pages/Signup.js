import React from "react";
import "../styles/Signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-card">

        {/* LEFT SIDE */}
        <div className="signup-left">
          <h1>WELCOME</h1>
          <p>Student Registration</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="signup-right">
          <h2>Create Account</h2>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Class / Grade" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <button className="signup-btn">Register</button>

          <p className="login-text">
            Already have an account? <span>Sign In</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;
