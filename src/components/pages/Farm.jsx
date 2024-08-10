import React from "react";
import "./farm.css";

const Farm = () => {
  return (
    <div className="container1">
       <div className="headerFm">
        <h1>Farm Management</h1>

           </div>
<div className="farmViewCard card">
   <div className="projectTop">
    <h2>Farm Overview</h2>
   </div>
     <div className="process">
           <ul>
           <li>Farm Name: Green Valley Farms</li>
              <li>Location: Nairobi, Kenya</li>
              <li>Total Area: 50 hectares</li>
              <li>Type of Farming: Organic</li>
           </ul>
            </div>

</div>

        <div className="soilHealthCard card ">
          <div className="projectTop">
            <h2>Soil Health</h2>
            <div className="descDots">
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </div>
          </div>
          <div className="SoilInfromation">
            <div className="soilInfo">
              <ul>
                <li id="soilTypeDisplay">Soil Type: Loamy</li>
                <li id="phLevelDisplay">pH Level: 6.8</li>
                <li id="nitrogenDisplay">Nitrogen: 20 ppm</li>
                <li id="phosphorusDisplay">Phosphorus: 15 ppm</li>
                <li id="potassiumDisplay">Potassium: 25 ppm</li>
                <li id="calciumDisplay">Calcium: 20 ppm</li>
              </ul>
            </div>
          </div>
            <a href="#" className="btn">Update</a>
          </div>
        
        <div className="weatherCard card ">
          <div className="projectTop">
            <h2>Climate and Weather</h2>
            <div className="tasksDots">
              <span className="material-symbols-outlined">weather_mix</span>
            </div>
          </div>
          <div className="weather">
            <ul>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">Current Weather: Sunny</span>
                </span>
                <span className="tasksStar full">
                  <span className="material-symbols-outlined">sunny</span>
                </span>
              </li>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">Average Temperature: 25°C</span>
                </span>
                <span className="tasksStar half">
                  <span className="material-symbols-outlined">thermostat_auto</span>
                </span>
              </li>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">Annual Rainfall: 1200 mm</span>
                </span>
                <span className="tasksStar half">
                  <span className="material-symbols-outlined">analytics</span>
                </span>
              </li>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">7-day Forecast: Mostly Sunny</span>
                </span>
                <span className="tasksStar half">
                  <span className="material-symbols-outlined">next_week</span>
                </span>
              </li>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">Climate Zone: Tropical</span>
                </span>
                <span className="tasksStar full">
                  <span className="material-symbols-outlined">travel_explore</span>
                </span>
              </li>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">Wind Speed: 15 km/h</span>
                </span>
                <span className="tasksStar half">
                  <span className="material-symbols-outlined">speed</span>
                </span>
                <span className="tasksStar full"></span>
              </li>
              <li>
                <span className="weatherIconName">
                  <span className="tasksIcon done">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <span className="weatherName">Humidity Level: 60%</span>
                </span>
                <span className="tasksStar half">
                  <span className="material-symbols-outlined">humidity_percentage</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="CropManageMent card ">
          <div className="projectTop">
            <h2>Crop Mini-Management</h2>
            <div className="timelineDots">
              <span className="material-symbols-outlined">spa</span>
            </div>
          </div>
          <div className="plantDescrib">
            <ul>
              <li>
                <span className="plantInfo">
                  <span className="material-symbols-outlined full">Psychiatry</span>
                  <span className="text">Current Crop:</span>
                </span>
                <span className="timelineTime">Maize</span>
              </li>
              <li>
                <span className="plantInfo">
                  <span className="material-symbols-outlined">calendar_view_day</span>
                  <span className="text">Planting Date:</span>
                </span>
                <span className="timelineTime">2024/03/15</span>
              </li>
              <li>
                <span className="plantInfo">
                  <span className="material-symbols-outlined">process_chart</span>
                  <span className="text">Growth Stage:</span>
                </span>
                <span className="timelineTime">Flowering</span>
              </li>
              <li>
                <span className="plantInfo">
                  <span className="material-symbols-outlined">decimal_increase</span>
                  <span className="text">Expected Yield:</span>
                </span>
                <span className="timelineTime">5 tons</span>
              </li>
              <li>
                <span className="plantInfo">
                  <span className="material-symbols-outlined">campaign</span>
                  <span className="text">Pest/Disease Alerts:</span>
                </span>
                <span className="timelineTime">None</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="Reminder  card">
          <div className="projectTop">
            <h2>Reminder</h2>
          </div>
          <ul>
            <li>Historical Yield Data: 2023: 4.5 tons, 2022: 4.2 tons</li>
            <li>Production Trends: Increasing</li>
            <li>Yield Predictions: 5 tons</li>
            <li>Comparison with Regional Averages: Above average</li>
            <li>Graphical Representation: [Chart]</li>
            <li><strong>Reminder:</strong> Review soil nutrient levels and update fertilization plan before the next growth cycle.</li>
          </ul>
        </div>
        <div className="AgroIntel card ">
          <div className="projectTop">
            <h2>AgroIntel-Recommendation</h2>
            <div className="descDots">
              <span className="material-symbols-outlined">more_horiz</span>
            </div>
          </div>
        </div>
      </div>
  );
};
export default Farm;
