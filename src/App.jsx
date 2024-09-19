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
import Settings from "./components/pages/marketing";
import Support from "./components/pages/Support";
import CropRotationPlanner from './components/pages/CropRotationPlanner'; // Import CropRotationPlanner
import PrivateRoute from './components/auth/PrivateRoute'; // Import PrivateRoute
import PublicMarketingView from './components/pages/PublicMarketingView'; // Import PublicMarketingView

import "./App.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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
              <Route path="/" element={<PrivateRoute element={<Dashboard toggleSidebar={toggleSidebar} totalPrice={totalPrice} />} />} />
              <Route path="/chatbot" element={<PrivateRoute element={<ChatBot />} />} />
              <Route path="/about-us" element={<PrivateRoute element={<AboutUs />} />} />
              <Route path="/farm" element={<PrivateRoute element={<Farm />} />} />
              <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
              <Route path="/support" element={<PrivateRoute element={<Support />} />} />
              <Route path="/camera-assistance" element={<PrivateRoute element={<CameraAssistance />} />} />
              <Route path="/analytics-reports" element={<PrivateRoute element={<AnalyticsReports totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />} />
              <Route path="/crop-management" element={<PrivateRoute element={<CropManagement />} />} />
              <Route path="/crop-rotation-planner" element={<PrivateRoute element={<CropRotationPlanner />} />} />
              
              {/* Public route for marketing view */}
              <Route path="/products/:userId" element={<PublicMarketingView />} />

              <Route path="*" element={<Navigate to="/signup" />} />{/* Ensure this path is correct */}
            </Routes>
          </div>
        </div>
      </Router>
    </DashboardProvider>
  );
};

export default App;
