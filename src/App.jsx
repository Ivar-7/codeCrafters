import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardProvider } from "./components/api/FirebaseApi";
import Navbar from "./components/home/Navbar";
import Dashboard from "./components/home/Dashboard";
import ChatBot from "./components/home/ChatBot";
import Login from "./components/auth/Login";
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <DashboardProvider>
      <Router>
        <div className="container">
          <div className="navbar">
            <Navbar isSidebarOpen={isSidebarOpen} />
          </div>
          <div className="main-content">
            <Routes>
              <Route
                exact
                path="/"
                element={<Dashboard toggleSidebar={toggleSidebar} />}
              />
              <Route exact path="/chatbot" element={<ChatBot />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DashboardProvider>
  );
};

export default App;