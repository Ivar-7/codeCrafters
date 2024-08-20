import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardContext } from "../api/FirebaseApi";
import { auth } from "../../config/firebaseCon";

const Navbar = ({ isSidebarOpen }) => {
  const { user, setUser, isDarkMode } = useContext(DashboardContext);
  const [isSidebarVisible, setSidebarVisible] = useState(isSidebarOpen);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleClose = () => {
    setSidebarVisible(false);
  };

  const handleOpen = () => {
    setSidebarVisible(true);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode-variables");
    } else {
      document.body.classList.remove("dark-mode-variables");
    }
  }, [isDarkMode]);

  useEffect(() => {
    setSidebarVisible(isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <>
      {/* This button is for opening the sidebar on smaller screens */}
      {!isSidebarVisible && (
        <button className="open-sidebar-btn" onClick={handleOpen}>
          <span className="material-icons-sharp">menu</span>
        </button>
      )}

      <aside style={{ display: isSidebarVisible ? "block" : "none" }}>
        <div className="toggle">
          <div className="logo">
            <img src="images/logo.png" alt="Logo" />
            <h2>
              Agro<span className="danger">Intel</span>
            </h2>
          </div>
          <div className="close" id="close-btn" onClick={handleClose}>
            <span className="material-icons-sharp close">close</span>
          </div>
        </div>

        <div className="sidebar">
          <Link to="/">
            <span className="material-icons-sharp">dashboard</span>
            <h3>Dashboard</h3>
          </Link>
          <Link to="/farm">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Farm Management</h3>
          </Link>
          <Link to="/crop-management">
            <span className="material-icons-sharp">receipt_long</span>
            <h3>Crop Management</h3>
          </Link>
          <Link to="/camera-assistance">
            <span className="material-icons-sharp">photo_camera</span>
            <h3>Camera Assistance</h3>
          </Link>
          <Link to="/analytics-reports">
            <span className="material-icons-sharp">leaderboard</span>
            <h3>Analytics</h3>  
          </Link>
          <Link to="/chatbot">
            <span className="material-icons-sharp">android</span>
            <h3>Chat Bot</h3>
          </Link>
          <Link to="/support">
            <span className="material-icons-sharp">payments</span>
            <h3>Billing</h3>
          </Link>
          <Link to="/settings">
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
          </Link>
          <Link to="/about-us">
            <span className="material-icons-sharp">question_mark</span>
            <h3>About US</h3>
          </Link>
          {/* Conditional Rendering for Login/Logout */}
          {user ? (
            <Link to="/" onClick={handleLogout}>
              <span className="material-icons-sharp">logout</span>
              <h3>Logout</h3>
            </Link>
          ) : (
            <Link to="/login">
              <span className="material-icons-sharp">login</span>
              <h3>Login</h3>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
