import React, { useState } from "react";

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

const Dashboard = ({ toogleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  if (isDarkMode) {
    document.body.classList.add("dark-mode-variables");
  } else {
    document.body.classList.remove("dark-mode-variables");
  }
  return (
    <>
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
            <tbody>
              {orders.map((order) => (
                <tr key={order.cropName}>
                  <td>{order.cropName}</td>
                  <td>{order.datePlanted}</td>
                  <td>{order.growthStage}</td>
                  <td
                    className={
                      order.condition === "Good"
                        ? "danger"
                        : order.condition === "Perfect"
                        ? "primary"
                        : ""
                    }
                  >
                    {order.condition}
                  </td>
                  <td className="primary">Details</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#">Show All</a>
        </div>
      </main>

      <div className="right-section">
        <div className="nav">
          <button id="menu-btn" onClick={() => toogleSidebar()}>
            <span className="material-icons-sharp">menu</span>
          </button>
          <div className="dark-mode" onClick={() => toggleDarkMode()}>
            <span
              className={`material-icons-sharp ${isDarkMode ? "" : "active"}`}
              onClick={toggleDarkMode}
            >
              light_mode
            </span>
            <span
              className={`material-icons-sharp ${isDarkMode ? "active" : ""}`}
              onClick={toggleDarkMode}
            >
              dark_mode
            </span>
          </div>

          <div className="profile">
            <div className="info">
              <p>
                Hey, <b>Reza</b>
              </p>
              <small className="text-muted">Admin</small>
            </div>
            <div className="profile-photo">
              <img src="images/profile-1.jpeg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
