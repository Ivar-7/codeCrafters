import React, { useState, useEffect } from "react";
import "./App.css";

const orders = [
  {
    cropName: "Maize",
    datePlanted: "2-3-2024",
    growthStage: "Reproductive Stage",
    condition: "Good",
  },
  {
    cropName: "Wheat",
    datePlanted: "1-2-2024",
    growthStage: "Maturation",
    condition: "Perfect",
  },
  {
    cropName: "Barley",
    datePlanted: "3-1-2024",
    growthStage: "Maturation",
    condition: "Perfect",
  },
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode-variables");
    } else {
      document.body.classList.remove("dark-mode-variables");
    }
  }, [isDarkMode]);

  return (
    <div className="container">
      <aside>
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
          <a href="#">
            <span className="material-icons-sharp">dashboard</span>
            <h3>Dashboard</h3>
          </a>
          <a href="#" className="active">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Farm Management</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">receipt_long</span>
            <h3>Crop Management</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">insights</span>
            <h3>Camera Assistance</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">mail_outline</span>
            <h3>Analytics & Reports</h3>
            <span className="message-count">27</span>
          </a>
          <a href="#">
            <span className="material-icons-sharp">inventory</span>
            <h3>Chat Bot</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">report_gmailerrorred</span>
            <h3>Support</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">add</span>
            <h3>About US</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">logout</span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
      <main>
        <h1>Analytics</h1>
        <div className="analyse">
          <div className="sales">
            <div className="status">
              <div className="info">
                <h3>Farm Efficiency</h3>
                <h1>Good</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>+81%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="visits">
            <div className="status">
              <div className="info">
                <h3>Resource Utilization</h3>
                <h1>Above Average</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>68%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="searches">
            <div className="status">
              <div className="info">
                <h3>Cost Savings</h3>
                <h1>$4,147</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>+21%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new-users">
          <h2>Farm Management</h2>
          <div className="user-list">
            <div className="user">
              <img src="images/profile-4.jpeg" />
              <h2>Soil Health</h2>
              <p>
                Last Checked <b>54 Min Ago</b>
              </p>
            </div>
            <div className="user">
              <img src="images/profile-3.jpeg" />
              <h2>Climate Data</h2>
              <p>
                Updated <b>3 Hours Ago</b>
              </p>
            </div>
            <div className="user">
              <img src="images/profile-2.jpeg" />
              <h2>Crop Plan</h2>
              <p>reviewed 6 Hours Ago</p>
            </div>
            <div className="user">
              <img src="images/plus.png" />
              <h2>More</h2>
              <p>New Info</p>
            </div>
          </div>
        </div>
        <div className="crop-management">
          <h2>Crop Management</h2>
          <table>
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Date Planted</th>
                <th>Growth Stage Today</th>
                <th>Crop Condition</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <a href="#">Show All</a>
        </div>
      </main>
    </div>
  );
};

export default App;
