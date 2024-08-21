import React, { useEffect, useState } from "react";
import axios from "axios";
import "./farm.css";

const Farm = () => {
  const [weatherData, setWeatherData] = useState({
    currentWeather: "Loading...",
    temperature: "Loading...",
    rainfall: "Loading...",
    forecast: "Loading...",
    climateZone: "Loading...",
    windSpeed: "Loading...",
    humidity: "Loading...",
  });

  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your OpenWeatherMap API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
        );

        const data = response.data;
        setWeatherData({
          currentWeather: data.current.weather[0].description,
          temperature: `${data.current.temp}°C`,
          rainfall: `${data.daily[0].rain || 0} mm`,
          forecast: `${data.daily[0].weather[0].description}`,
          climateZone: "Tropical", // Placeholder; you may need to determine this differently
          windSpeed: `${data.current.wind_speed} km/h`,
          humidity: `${data.current.humidity}%`,
        });
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser");
    }
  }, []);

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

      <div className="soilHealthCard card">
        <div className="projectTop">
          <h2>Soil Health</h2>
          <div className="descDots">
            <span className="material-icons-sharp">arrow_drop_down</span>
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

      <div className="weatherCard card">
        <div className="projectTop">
          <h2>Climate and Weather</h2>
          <div className="tasksDots">
            <span className="material-icons-sharp">wb_sunny</span>
          </div>
        </div>
        <div className="weather">
          <ul>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Current Weather: {weatherData.currentWeather}</span>
              </span>
              <span className="tasksStar full">
                <span className="material-icons-sharp">sunny</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Average Temperature: {weatherData.temperature}</span>
              </span>
              <span className="tasksStar half">
                <span className="material-icons-sharp">thermostat</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Annual Rainfall: {weatherData.rainfall}</span>
              </span>
              <span className="tasksStar half">
                <span className="material-icons-sharp">analytics</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">7-day Forecast: {weatherData.forecast}</span>
              </span>
              <span className="tasksStar half">
                <span className="material-icons-sharp">next_week</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Climate Zone: {weatherData.climateZone}</span>
              </span>
              <span className="tasksStar full">
                <span className="material-icons-sharp">travel_explore</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Wind Speed: {weatherData.windSpeed}</span>
              </span>
              <span className="tasksStar half">
                <span className="material-icons-sharp">speed</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Humidity Level: {weatherData.humidity}</span>
              </span>
              <span className="tasksStar half">
                <span className="material-icons-sharp">water_drop</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="CropManageMent card">
        <div className="projectTop">
          <h2>Crop Mini-Management</h2>
          <div className="timelineDots">
            <span className="material-icons-sharp">spa</span>
          </div>
        </div>
        <div className="plantDescrib">
          <ul>
            <li>
              <span className="plantInfo">
                <span className="material-icons-sharp full">local_florist</span>
                <span className="text">Current Crop:</span>
              </span>
              <span className="timelineTime">Maize</span>
            </li>
            <li>
              <span className="plantInfo">
                <span className="material-icons-sharp">calendar_today</span>
                <span className="text">Planting Date:</span>
              </span>
              <span className="timelineTime">2024/03/15</span>
            </li>
            <li>
              <span className="plantInfo">
                <span className="material-icons-sharp">bar_chart</span>
                <span className="text">Growth Stage:</span>
              </span>
              <span className="timelineTime">Flowering</span>
            </li>
            <li>
              <span className="plantInfo">
                <span className="material-icons-sharp">eco</span>
                <span className="text">Expected Yield:</span>
              </span>
              <span className="timelineTime">5 tons</span>
            </li>
            <li>
              <span className="plantInfo">
                <span className="material-icons-sharp">campaign</span>
                <span className="text">Pest/Disease Alerts:</span>
              </span>
              <span className="timelineTime">None</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="Reminder card">
        <div className="projectTop">
          <h2>Reminder</h2>
        </div>
        <ul>
          <li>Historical Yield Data: 2023: 4.5 tons, 2022: 4.2 tons</li>
          <li>Production Trends: Increasing</li>
          <li>Yield Predictions: 5 tons</li>
          <li>Comparison with Regional Averages: Above average</li>
          <li>Graphical Representation: [Chart]</li>
          <li>
            <strong>Reminder:</strong> Review soil nutrient levels and update
            fertilization plan before the next growth cycle.
          </li>
        </ul>
      </div>

      <div className="AgroIntel card">
        <div className="projectTop">
          <h2>AgroIntel-Recommendation</h2>
          <div className="descDots">
            <span className="material-icons-sharp">more_horiz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farm;
