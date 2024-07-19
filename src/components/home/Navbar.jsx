import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./Home";
import Ai from "./Ai";

const Navbar = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg justify-content-center fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ai">
                  Ai
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr
          className="mt-0 mb-0"
          style={{ backgroundColor: "black", height: "1px" }}
        />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/ai" element={<Ai />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
