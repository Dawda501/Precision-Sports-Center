// src/components/Login.jsx
import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <span className="icon">👤</span>
          <input type="text" placeholder="Username" />
        </div>

        <div className="input-group">
          <span className="icon">🔒</span>
          <input type="password" placeholder="Password" />
        </div>

        <p className="register-text">
          Haven't Account? <a href="#">Register</a>
        </p>

        <div className="login-button">
          <span className="arrow">➤</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
