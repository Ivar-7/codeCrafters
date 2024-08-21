import React, { useState, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider, facebookProvider } from "../../config/firebaseCon"; // Added providers
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Added signInWithPopup
import { doc, setDoc } from "firebase/firestore";
import { DashboardContext } from "../api/FirebaseApi";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(DashboardContext);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
      });
      setUser(userCredential.user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing up and saving user:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
      });
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
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
      });
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
      <form className="login-form" onSubmit={signUp}>
        <h3>Sign Up</h3>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <div className="social">
          <div className="go" onClick={handleGoogleSignIn}>
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb" onClick={handleFacebookSignIn}>
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
