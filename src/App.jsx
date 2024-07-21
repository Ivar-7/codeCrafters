import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardProvider } from "./components/api/FirebaseApi";
import Navbar from "./components/home/Navbar";
import Dashboard from "./components/home/Dashboard";
import ChatBot from "./components/home/ChatBot";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AboutUs from "./components/pages/AboutUs";
import AnalyticsReports from "./components/pages/AnalyticsReports";
import CameraAssistance from "./components/pages/CameraAssistance";
import CropManagement from "./components/pages/CropManagement";
import Farm from "./components/pages/Farm";
import Settings from "./components/pages/Settings";
import Support from "./components/pages/Support";

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
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/about-us" element={<AboutUs />} />
              <Route exact path="/farm" element={<Farm />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/support" element={<Support />} />
              <Route
                exact
                path="/camera-assistance"
                element={<CameraAssistance />}
              />
              <Route
                exact
                path="/analytics-reports"
                element={<AnalyticsReports />}
              />
              <Route
                exact
                path="/crop-management"
                element={<CropManagement />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </DashboardProvider>
  );
};

export default App;