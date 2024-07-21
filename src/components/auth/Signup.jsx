import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../../config/firebaseCon";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await db.collection("users").doc(userCredential.user.uid).set({
        email: userCredential.user.email,
        // Add any other user information you want to store, for example:
        // username: "",
        // profilePicture: "",
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(
        "Account created and saved to Firestore:",
        userCredential.user
      );
      history.push("/");
    } catch (error) {
      console.error("Error signing up and saving user:", error.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-shape"></div>
      <div className="login-shape"></div>
      <form className="login-form" onSubmit={signUp}>
        <h3>Sign Up</h3>
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
