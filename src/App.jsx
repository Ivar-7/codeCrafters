// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import CropRotationPlanner from './components/pages/CropRotationPlanner'; 
import PrivateRoute from './components/auth/PrivateRoute';
import CropRotationPlanner from './components/pages/CropRotationPlanner'; // Import CropRotationPlanner

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

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute element={<Dashboard toggleSidebar={toggleSidebar} />} />} />
              <Route path="/chatbot" element={<PrivateRoute element={<ChatBot />} />} />
              <Route path="/about-us" element={<PrivateRoute element={<AboutUs />} />} />
              <Route path="/farm" element={<PrivateRoute element={<Farm />} />} />
              <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
              <Route path="/support" element={<PrivateRoute element={<Support />} />} />
              <Route path="/camera-assistance" element={<PrivateRoute element={<CameraAssistance />} />} />
              <Route path="/analytics-reports" element={<PrivateRoute element={<AnalyticsReports />} />} />
              <Route path="/crop-management" element={<PrivateRoute element={<CropManagement />} />} />
              <Route path="/crop-rotation-planner" element={<PrivateRoute element={<CropRotationPlanner />} />} />
              <Route path="*" element={<Navigate to="/signup" />} />
              <Route exact path="/" element={<Dashboard toggleSidebar={toggleSidebar} />} />
              <Route exact path="/chatbot" element={<ChatBot />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/about-us" element={<AboutUs />} />
              <Route exact path="/farm" element={<Farm />} />
              <Route exact path="/settings" element={<Settings />} />
              <Route exact path="/support" element={<Support />} />
              <Route exact path="/camera-assistance" element={<CameraAssistance />} />
              <Route exact path="/analytics-reports" element={<AnalyticsReports />} />
              <Route exact path="/crop-management" element={<CropManagement />} />
              <Route exact path="/crop-rotation-planner" element={<CropRotationPlanner />} /> {/* Ensure this path is correct */}
            </Routes>
          </div>
        </div>
      </Router>
    </DashboardProvider>
  );
};

export default App;
