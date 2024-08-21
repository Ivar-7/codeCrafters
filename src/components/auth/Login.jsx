import React, { useState, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, facebookProvider } from "../../config/firebaseCon";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Added signInWithPopup
import { DashboardContext } from "../api/FirebaseApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(DashboardContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      setUser(userCredential.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Google Sign In Error:", error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Facebook Sign In Error:", error.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-shape"></div>
      <div className="login-shape"></div>
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login</h3>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="username">Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <div className="social">
          <div className="go" onClick={handleGoogleSignIn}>
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb" onClick={handleFacebookSignIn}>
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
        <p className="redirect-to-signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
