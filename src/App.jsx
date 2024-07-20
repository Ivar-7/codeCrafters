import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Dashboard from "./components/home/Dashboard";
import ChatBot from "./components/home/ChatBot";
import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;