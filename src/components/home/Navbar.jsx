import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isSidebarOpen }) => {
  return (
    <aside style={{ display: isSidebarOpen ? "block" : "" }}>
      <div className="toggle">
        <div className="logo">
          <img src="images/logo.png" />
          <h2>
            Agro<span className="danger">Intel</span>
          </h2>
        </div>
        <div className="close" id="close-btn">
          <span className="material-icons-sharp">close</span>
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
          <span className="material-icons-sharp">insights</span>
          <h3>Camera Assistance</h3>
        </Link>
        <Link to="/analytics-reports">
          <span className="material-icons-sharp">mail_outline</span>
          <h3>Analytics & Reports</h3>
          <span className="message-count">27</span>
        </Link>
        <Link to="/chatbot">
          <span className="material-icons-sharp">inventory</span>
          <h3>Chat Bot</h3>
        </Link>
        <Link to="/support">
          <span className="material-icons-sharp">report_gmailerrorred</span>
          <h3>Support</h3>
        </Link>
        <Link to="/settings">
          <span className="material-icons-sharp">settings</span>
          <h3>Settings</h3>
        </Link>
        <Link to="/about-us">
          <span className="material-icons-sharp">add</span>
          <h3>About US</h3>
        </Link>
        <Link to="/logout">
          <span className="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </Link>
      </div>
    </aside>
  );
};

export default Navbar;
