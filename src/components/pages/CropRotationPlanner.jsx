import React, { useState } from 'react';
import './croprotationplanner.css'; 

const CropRotationPlanner = () => {
    const [rotationPlan, setRotationPlan] = useState('');
    const [analysis, setAnalysis] = useState('');

    const generateRotation = () => {
        const crop1 = document.getElementById('crop1').value.trim();
        const crop2 = document.getElementById('crop2').value.trim();
        const crop3 = document.getElementById('crop3').value.trim();
        const crop4 = document.getElementById('crop4').value.trim();

        if (crop1 && crop2 && crop3 && crop4) {
            const plan = `
                <li><strong>Year 1:</strong> ${crop1}</li>
                <li><strong>Year 2:</strong> ${crop2}</li>
                <li><strong>Year 3:</strong> ${crop3}</li>
                <li><strong>Year 4:</strong> ${crop4}</li>
            `;
            setRotationPlan(plan);
        } else {
            alert('Please enter all crops for each year.');
        }
    };

    const analyzePlan = async () => {
        if (!rotationPlan) {
            alert('Please generate a plan before analyzing.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/analyze-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: rotationPlan }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to analyze the plan.');
        }
    };

    return (
        <div className="container4">
            <h1>Crop Rotation Planner</h1>
            <form id="rotation-form">
                <label htmlFor="crop1">Year 1 Crop:</label>
                <input type="text" id="crop1" placeholder="Enter Year 1 Crop" />

                <label htmlFor="crop2">Year 2 Crop:</label>
                <input type="text" id="crop2" placeholder="Enter Year 2 Crop" />

                <label htmlFor="crop3">Year 3 Crop:</label>
                <input type="text" id="crop3" placeholder="Enter Year 3 Crop" />

                <label htmlFor="crop4">Year 4 Crop:</label>
                <input type="text" id="crop4" placeholder="Enter Year 4 Crop" />

                <button type="button" onClick={generateRotation}>Generate Rotation Plan</button>
                <button type="button" onClick={analyzePlan}>Analyze</button>
            </form>

            <div id="rotation-plan">
                <h2>Your Crop Rotation Plan:</h2>
                <ul id="plan-list" dangerouslySetInnerHTML={{ __html: rotationPlan }}></ul>
            </div>

            {analysis && (
                <div id="analysis-result">
                    <h2>Analysis Result:</h2>
                    <p>{analysis}</p>
                </div>
            )}
        </div>
    );
};

export default CropRotationPlanner;
