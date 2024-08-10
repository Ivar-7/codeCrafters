import React from "react";
import "./cropManagemnt.css";

const CropManagement = () => {
  return (
    <div className="container3">
    <h1>Crop Management</h1>
    <div className="card-grid">
        <div className="card">
            <h2>Companion Planting</h2>
            <p>Find and manage beneficial plant pairings.</p>
            <button className="btn">Explore</button>
        </div>
        <div className="card">
            <h2>Crop Rotation Planning</h2>
            <p>Create a multi-year crop rotation plan.</p>
            <button className="btn">Plan</button>
        </div>
        <div className="card">
            <h2>Cover Cropping</h2>
            <p>Improve soil health with cover crops.</p>
            <button className="btn">Learn More</button>
        </div>
        <div className="card">
            <h2>Climate-Resilient Crops</h2>
            <p>Choose crops that withstand climate challenges.</p>
            <button className="btn">Select</button>
        </div>
        <div className="card">
            <h2>Precision Farming Tools</h2>
            <p>Apply precise inputs with variable rate tools.</p>
            <button className="btn">Use Tools</button>
        </div>
        <div className="card">
            <h2>Alternative Cropping Systems</h2>
            <p>Explore agroforestry, intercropping, and more.</p>
            <button className="btn">Discover</button>
        </div>
    </div>
</div>
  );
};

export default CropManagement;
