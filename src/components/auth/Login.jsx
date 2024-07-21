import React, { useState, useContext } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebaseCon";
import { DashboardContext } from "../api/FirebaseApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(DashboardContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Assuming username is an email. Adjust accordingly if you're allowing phone numbers
      const userCredential = await auth.signInWithEmailAndPassword(
        username,
        password
      );
      setUser(userCredential.user);
      //   console.log("Logged in user:", userCredential.user);
      history.push("/dashboard"); // Redirects the user to the dashboard after login
    } catch (error) {
      console.error("Error logging in:", error.message);
      // Here, you could set an error message to display to the user
    }
  };

  return (
    <div className="login-background">
      <div className="login-shape"></div>
      <div className="login-shape"></div>
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Login</h3>
        <label htmlFor="username">Username</label>
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
          {/* Social login functionality can be added here */}
        </div>
        <p className="redirect-to-signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
