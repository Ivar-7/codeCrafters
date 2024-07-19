import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/home/Navbar";
import Dashboard from "./components/home/Dashboard";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toogleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  console.log(isSidebarOpen);

  return (
    <div className="container">
      <Navbar isSidebarOpen={isSidebarOpen} />
      <Dashboard toogleSidebar={toogleSidebar} />
    </div>
  );
};

export default App;
