import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/home/Navbar";
import Dashboard from "./components/home/Dashboard";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="container">
      <Navbar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
      <Dashboard openSidebar={openSidebar} />
    </div>
  );
};

export default App;
