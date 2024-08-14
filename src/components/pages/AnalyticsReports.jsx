import React from "react";
import "./analyticRport.css";

const AnalyticsReports = () => {
  return (
    <div className="card-container">
    <div className="card large">
        <h3>Labor Efficiency</h3>
        <canvas id="laborEfficiencyBarChart"></canvas>
        <p>Summary of labor utilization and strategies to optimize workforce deployment.</p>
    </div>

    <div className="card medium">
        <h3>Machinery Utilization</h3>
        <canvas id="machineryUtilizationPieChart"></canvas>
        <p>Insights into machinery efficiency and recommended maintenance.</p>
    </div>

    <div className="card small">
        <h3>Market Price Trends</h3>
        <canvas id="marketPriceBarChart"></canvas>
        <p>Analysis of market trends and advice on timing sales.</p>
    </div>

    <div className="card medium">
        <h3>Storage and Post-Harvest Losses</h3>
        <canvas id="postHarvestLossesPieChart"></canvas>
        <p>Strategies to reduce post-harvest losses and improve storage.</p>
    </div>

    <div className="card large">
        <h3>Crop Rotation Benefits</h3>
        <canvas id="cropRotationBarChart"></canvas>
        <p>Benefits observed from crop rotation and further optimization suggestions.</p>
    </div>

    <div className="card small">
        <h3>Sustainability Metrics</h3>
        <canvas id="sustainabilityPieChart"></canvas>
        <p>Summary of sustainability efforts and additional eco-friendly practices.</p>
    </div>
</div>
  );
};

export default AnalyticsReports;
