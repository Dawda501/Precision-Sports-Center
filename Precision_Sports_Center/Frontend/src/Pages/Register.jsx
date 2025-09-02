// src/components/Register.jsx
import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="register-container">
      <form className="register-form">
        <input type="text" placeholder="First name" required />
        <input type="text" placeholder="Last name" required />
        <input type="email" placeholder="Email address" required />

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            className="show-btn"
            onClick={togglePassword}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" defaultChecked />
            Keep me signed in
          </label>
          <p className="note">
            Uncheck if using a public device. <a href="#">Show</a>
          </p>
        </div>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" defaultChecked />
            Send me emails about new arrivals, hot items, daily savings, & more.
          </label>
        </div>

        <p className="terms">
          By clicking Create Account, you acknowledge you have read and agreed to our
          <a href="#"> Terms of Use</a> and <a href="#"> Privacy Policy</a>.
        </p>

        <button type="submit" className="create-btn">Create Account</button>

        <p className="signin-prompt">Already have an account?</p>
        <button type="button" className="signin-btn">Sign In</button>
      </form>
    </div>
  );
};

export default Register;
