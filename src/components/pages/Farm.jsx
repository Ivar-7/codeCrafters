import React, { useEffect, useState } from "react";
import axios from "axios";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseCon";
import "./farm.css";
import useAuth from "../auth/useAuth";

const Farm = () => {
  const { user, loading } = useAuth();
  const [weatherData, setWeatherData] = useState({
    currentWeather: "Loading...",
    temperature: "Loading...",
    rainfall: "Loading...",
    forecast: "Loading...",
    climateZone: "Loading...",
    windSpeed: "Loading...",
    humidity: "Loading...",
  });
  const [reminders, setReminders] = useState([]);
  const [farmOverview, setFarmOverview] = useState(null);
  const [soilHealth, setSoilHealth] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
        );

        const data = response.data;
        setWeatherData({
          currentWeather: data.current.weather[0].description,
          temperature: `${data.current.temp}°C`,
          rainfall: `${data.daily[0].rain || 0} mm`,
          forecast: `${data.daily[0].weather[0].description}`,
          climateZone: "Tropical",
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

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userId = user.uid;

        // Fetch Farm Overview
        const farmDocRef = doc(db, "farmData", userId);
        const farmDocSnap = await getDoc(farmDocRef);
        if (farmDocSnap.exists()) {
          setFarmOverview(farmDocSnap.data());
        }

        // Fetch Soil Health
        const soilDocRef = doc(db, "soilHealthData", userId);
        const soilDocSnap = await getDoc(soilDocRef);
        if (soilDocSnap.exists()) {
          setSoilHealth(soilDocSnap.data());
        }

        // Fetch Reminders
        const reminderDocRef = doc(db, "reminders", userId);
        const reminderDocSnap = await getDoc(reminderDocRef);
        if (reminderDocSnap.exists()) {
          setReminders(reminderDocSnap.data().reminderList || []);
        }
      }
    };
    
    fetchData();
  }, [user]);

  const createDocuments = async () => {
    if (loading || !user) return;

    const userId = user.uid;

    // Create Farm Overview
    const farmOverview = {
      farmName: "",
      location: "",
      totalArea: 0,
      farmingType: "",
    };
    await setDoc(doc(db, "farmData", userId), farmOverview);

    // Create Soil Health
    const soilHealth = {
      soilType: "",
      pHLevel: 0,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      calcium: 0,
    };
    await setDoc(doc(db, "soilHealthData", userId, "currentSoilHealth"), soilHealth);

    // Create Reminders
    const reminderDoc = {
      reminderList: [],
    };
    await setDoc(doc(db, "reminders", userId), reminderDoc);

    alert("Documents created successfully!");
  };

  const addReminder = async () => {
    if (loading || !user) return;

    const userId = user.uid;
    const reminderText = prompt("Enter the reminder text:");
    const reminderDate = prompt("Enter the reminder date (YYYY-MM-DD):");

    if (reminderText && reminderDate) {
      const newReminder = { text: reminderText, date: reminderDate };

      const docRef = doc(db, "reminders", userId);
      const docSnap = await getDoc(docRef);

      let updatedReminders = [];
      if (docSnap.exists()) {
        updatedReminders = docSnap.data().reminderList || [];
      }
      updatedReminders.push(newReminder);

      await setDoc(docRef, { reminderList: updatedReminders });
      setReminders(updatedReminders);
      alert("Reminder added successfully!");
    } else {
      alert("Please provide reminder text and date.");
    }
  };

  const addFarmOverview = async () => {
    if (loading || !user) return;

    const userId = user.uid;
    const farmName = prompt("Enter the farm name:");
    const location = prompt("Enter the location:");
    const totalArea = prompt("Enter the total area (in hectares):");
    const farmingType = prompt("Enter the type of farming:");

    if (farmName && location && totalArea && farmingType) {
      const farmOverview = {
        farmName,
        location,
        totalArea: Number(totalArea),
        farmingType,
      };

      await setDoc(doc(db, "farmData", userId), farmOverview);
      alert("Farm Overview added successfully!");
      setFarmOverview(farmOverview); // Update state
    } else {
      alert("Please provide all farm details.");
    }
  };

  const addSoilHealth = async () => {
    if (loading || !user) return;

    const userId = user.uid;
    const soilType = prompt("Enter the soil type:");
    const pHLevel = prompt("Enter the pH level:");
    const nitrogen = prompt("Enter nitrogen level:");
    const phosphorus = prompt("Enter phosphorus level:");
    const potassium = prompt("Enter potassium level:");
    const calcium = prompt("Enter calcium level:");

    if (soilType && pHLevel && nitrogen && phosphorus && potassium && calcium) {
      const soilHealth = {
        soilType,
        pHLevel: Number(pHLevel),
        nitrogen: Number(nitrogen),
        phosphorus: Number(phosphorus),
        potassium: Number(potassium),
        calcium: Number(calcium),
      };

      await setDoc(doc(db, "soilHealthData", userId), soilHealth);
      alert("Soil Health added successfully!");
      setSoilHealth(soilHealth); // Update state
    } else {
      alert("Please provide all soil health details.");
    }
  };

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
            <li>Farm Name: {farmOverview ? farmOverview.farmName : "Loading..."}</li>
            <li>Location: {farmOverview ? farmOverview.location : "Loading..."}</li>
            <li>Total Area: {farmOverview ? farmOverview.totalArea : "Loading..."} hectares</li>
            <li>Type of Farming: {farmOverview ? farmOverview.farmingType : "Loading..."}</li>
          </ul>
          <button className="btn" onClick={addFarmOverview}>Update</button>
        </div>
      </div>

      <div className="soilHealthCard card">
        <div className="projectTop">
          <h2>Soil Health</h2>
        </div>
        <div className="SoilInfromation">
          <div className="soilInfo">
            <ul>
              <li>Soil Type: {soilHealth ? soilHealth.soilType : "Loading..."}</li>
              <li>pH Level: {soilHealth ? soilHealth.pHLevel : "Loading..."}</li>
              <li>Nitrogen: {soilHealth ? soilHealth.nitrogen : "Loading..."}</li>
              <li>Phosphorus: {soilHealth ? soilHealth.phosphorus : "Loading..."}</li>
              <li>Potassium: {soilHealth ? soilHealth.potassium : "Loading..."}</li>
              <li>Calcium: {soilHealth ? soilHealth.calcium : "Loading..."}</li>
            </ul>
            <button className="btn" onClick={addSoilHealth}>Update Soil Health</button>
          </div>
        </div>
      </div>

      <div className="weatherCard card">
        <div className="projectTop">
          <h2>Climate and Weather</h2>
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
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Average Temperature: {weatherData.temperature}</span>
              </span>
            </li>
            <li>
              <span className="weatherIconName">
                <span className="tasksIcon done">
                  <span className="material-icons-sharp">check</span>
                </span>
                <span className="weatherName">Rainfall: {weatherData.rainfall}</span>
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

      <div className="remindersCard card">
        <div className="projectTop">
          <h2>Reminders</h2>
        </div>
        <div className="reminderList">
          <ul>
            {reminders.map((reminder, index) => (
              <li key={index}>
                {reminder.text} - {reminder.date}
              </li>
            ))}
          </ul>
        </div>
        <button className="btn" onClick={addReminder}>Add Reminder</button>
      </div>

      <div className="AgroIntel card">
        <div className="projectTop">
          <h2>AgroIntel-Recommendation</h2>
          <div className="descDots">
            <span className="material-icons-sharp">more_horiz</span>
          </div>
        </div>
      </div> 
      {/* <div className="actions">
        <button onClick={createDocuments}>Create Initial Documents</button>
      </div> */}
    </div>
  );
};

export default Farm;
