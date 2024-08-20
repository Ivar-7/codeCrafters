import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './analyticRport.css';

const AnalyticsReport = () => {
    const chartsRef = useRef({});

    const createChart = (chartId, chartType, data, options) => {
        useEffect(() => {
            if (chartsRef.current[chartId]) {
                chartsRef.current[chartId].destroy();
            }
            const ctx = document.getElementById(chartId).getContext('2d');
            chartsRef.current[chartId] = new Chart(ctx, {
                type: chartType,
                data: data,
                options: options,
            });

            return () => {
                if (chartsRef.current[chartId]) {
                    chartsRef.current[chartId].destroy();
                }
            };
        }, [chartId, chartType, data, options]);
    };

    // Example data and options for charts
    const laborEfficiencyData = {
        labels: ['Planting', 'Harvesting', 'Weeding', 'Irrigation'],
        datasets: [{
            label: 'Hours Spent',
            data: [50, 30, 20, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const pieChartData = (labels, data, colors) => ({
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors.map(color => `${color}0.2`),
            borderColor: colors,
            borderWidth: 1
        }]
    });

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Creating different charts
    createChart('laborEfficiencyBarChart', 'bar', laborEfficiencyData, barChartOptions);
    createChart('machineryUtilizationPieChart', 'pie', pieChartData(
        ['Plowing', 'Irrigation', 'Harvesting', 'Transport'],
        [40, 20, 20, 20],
        [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)'
        ]
    ));

    const marketPriceData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Market Price',
            data: [200, 220, 180, 240],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    createChart('marketPriceBarChart', 'bar', marketPriceData, barChartOptions);

    createChart('postHarvestLossesPieChart', 'pie', pieChartData(
        ['Loss 1', 'Loss 2', 'Loss 3', 'Loss 4'],
        [30, 10, 20, 40],
        [
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
        ]
    ));

    const cropRotationData = {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
        datasets: [{
            label: 'Yield Increase',
            data: [10, 15, 20, 25],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    };

    createChart('cropRotationBarChart', 'bar', cropRotationData, barChartOptions);

    createChart('sustainabilityPieChart', 'pie', pieChartData(
        ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'],
        [35, 25, 15, 25],
        [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)'
        ]
    ));

    return (
        <div className="card-container">
            <h1>Analytics</h1>
            <div className="card large">
                <h3>Labor Efficiency</h3>
                <canvas id="laborEfficiencyBarChart"></canvas>
                <p>Summary of labor utilization and strategies to optimize workforce deployment.</p>
            </div>

            <div className="card large">
                <h3>Machinery Utilization</h3>
                <canvas id="machineryUtilizationPieChart"></canvas>
                <p>Insights into machinery efficiency and recommended maintenance.</p>
            </div>

            <div className="card large">
                <h3>Market Price Trends</h3>
                <canvas id="marketPriceBarChart"></canvas>
                <p>Analysis of market trends and advice on timing sales.</p>
            </div>

            <div className="card large">
                <h3>Storage and Post-Harvest Losses</h3>
                <canvas id="postHarvestLossesPieChart"></canvas>
                <p>Strategies to reduce post-harvest losses and improve storage.</p>
            </div>

            <div className="card large">
                <h3>Crop Rotation Benefits</h3>
                <canvas id="cropRotationBarChart"></canvas>
                <p>Benefits observed from crop rotation and further optimization suggestions.</p>
            </div>

            <div className="card large">
                <h3>Sustainability Metrics</h3>
                <canvas id="sustainabilityPieChart"></canvas>
                <p>Summary of sustainability efforts and additional eco-friendly practices.</p>
            </div>
        </div>
    );
};

export default AnalyticsReport;
