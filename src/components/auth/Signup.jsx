import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="login-background">
      <div className="login-shape"></div>
      <div className="login-shape"></div>
      <form className="login-form">
        <h3>Sign Up</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />
        <button type="button">Log In</button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
        <p className="redirect-to-signup">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
