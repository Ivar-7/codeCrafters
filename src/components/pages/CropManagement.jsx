import React from "react";
import "./cropManagemnt.css";
import { Link } from 'react-router-dom';

const CropManagement = () => {
  return (
    <div className="container3">
    <h1>Crop Management</h1>
    <div className="card-grid">
        <div className="card">
            <h2>Companion Planting</h2>
            <p>Find and manage beneficial plant pairings.</p>
            <a href="https://www.almanac.com/companion-planting-guide-vegetables" target="_blank" rel="noopener noreferrer">
  <button className="btn">Explore</button>
</a>

        </div>
        <div className="card">
            <h2>Crop Rotation Planning</h2>
            <p>Create a multi-year crop rotation plan.</p>
            <Link to="/crop-rotation-planner">
                <button className="btn">Plan</button>
            </Link>
        </div>
        <div className="card">
            <h2>Cover Cropping</h2>
            <p>Improve soil health with cover crops.</p>
            <a href="https://extension.umn.edu/yard-and-garden-news/cover-crops-improve-soil-health-even-small-scale" target="_blank" rel="noopener noreferrer">
    <button className="btn">Learn More</button>
  </a>
        </div>
        <div className="card">
            <h2>Climate-Resilient Crops</h2>
            <p>Leanr about crops that withstand climate challenges.</p>
            <a href="https://www.sciencedirect.com/science/article/pii/S0308521X23001981" target="_blank" rel="noopener noreferrer">
  <button className="btn">Study</button>
</a>

        </div>
        <div className="card">
            <h2>Precision Farming Tools</h2>
            <p>Apply precise inputs with variable rate tools.</p>
            <button className="btn">Use Tools</button>
        </div>
        <div className="card">
            <h2>Alternative Cropping Systems</h2>
            <p>Explore agroforestry, intercropping, and more.</p>
            <a href="https://www.sciencedirect.com/topics/earth-and-planetary-sciences/intercropping" target="_blank" rel="noopener noreferrer">
  <button className="btn">Discover</button>
</a>

        </div>
    </div>
</div>
  );
};

export default CropManagement;
