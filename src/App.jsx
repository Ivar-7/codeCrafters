import React from "react";
import { DashboardProvider } from "./components/api/FirebaseApi";
import Navbar from "./components/home/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <DashboardProvider>
        <Navbar />
      </DashboardProvider>
    </>
  );
}

export default App;
