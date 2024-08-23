import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useAuth from '../auth/useAuth';
import { db } from "../../config/firebaseCon";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './analyticRport.css';

const AnalyticsReport = () => {
    const chartsRef = useRef({});
    const { user } = useAuth();

    // State variables for data
    const [laborEfficiencyData, setLaborEfficiencyData] = useState({});
    const [machineryUtilizationData, setMachineryUtilizationData] = useState({});
    const [marketPriceData, setMarketPriceData] = useState({});
    const [postHarvestLossesData, setPostHarvestLossesData] = useState({});
    const [cropRotationData, setCropRotationData] = useState({});
    const [sustainabilityData, setSustainabilityData] = useState({});

    // State variables for selected categories and inputs
    const [selectedLaborType, setSelectedLaborType] = useState('Planting');
    const [laborEfficiencyValue, setLaborEfficiencyValue] = useState('');
    const [selectedMachineryType, setSelectedMachineryType] = useState('Tractor Usage');
    const [machineryUtilizationValue, setMachineryUtilizationValue] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('Corn');
    const [marketPrice, setMarketPrice] = useState('');
    const [postHarvestLossesValue, setPostHarvestLossesValue] = useState('');
    const [selectedLossType, setSelectedLossType] = useState('Storage Losses');
    const [cropRotationCategory, setCropRotationCategory] = useState('Corn to Soybean');
    const [cropRotationValue, setCropRotationValue] = useState('');
    const [sustainabilityCategory, setSustainabilityCategory] = useState('Soil Conservation');
    const [sustainabilityValue, setSustainabilityValue] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user's analytics data from Firestore
    const fetchUserAnalyticsData = async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const docRef = doc(db, 'analyticsReports', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log('Fetched data:', data);
                setLaborEfficiencyData(data.laborEfficiency || {});
                setMachineryUtilizationData(data.machineryUtilization || {});
                setMarketPriceData(data.marketPrices || {});
                setPostHarvestLossesData(data.postHarvestLosses || {});
                setCropRotationData(data.cropRotation || {});
                setSustainabilityData(data.sustainability || {});
            } else {
                console.log('No analytics report found for this user.');
                setError('No analytics report found.');
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    // Update charts whenever data changes
    useEffect(() => {
        if (!user) return;

        const createChart = (chartId, data, options) => {
            if (chartsRef.current[chartId]) {
                chartsRef.current[chartId].destroy();
            }
            const ctx = document.getElementById(chartId)?.getContext('2d');
            if (ctx) {
                chartsRef.current[chartId] = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options,
                });
            } else {
                console.error(`Canvas context for ${chartId} is null`);
            }
        };

        const convertToChartData = (data, label, unit) => ({
            labels: Object.keys(data),
            datasets: [{
                label: `${label} (${unit})`,
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        });

        const laborEfficiencyChartData = convertToChartData(laborEfficiencyData, 'Labor Efficiency', 'hours');
        const machineryUtilizationChartData = convertToChartData(machineryUtilizationData, 'Machinery Utilization', 'hours');
        const marketPriceChartData = {
            labels: marketPriceData[selectedCrop] && marketPriceData[selectedCrop].map((_, index) => `Week ${index + 1}`) || [],
            datasets: [{
                label: 'Market Price ($)',
                data: marketPriceData[selectedCrop] || [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        };
        
        const postHarvestLossesChartData = convertToChartData(postHarvestLossesData, 'Post Harvest Losses', 'kg');
        const cropRotationChartData = convertToChartData(cropRotationData, 'Crop Rotation Yield', 'kg');
        const sustainabilityChartData = convertToChartData(sustainabilityData, 'Sustainability Metrics', 'score');

        const barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        createChart('laborEfficiencyBarChart', laborEfficiencyChartData, barChartOptions);
        createChart('machineryUtilizationBarChart', machineryUtilizationChartData, barChartOptions);
        createChart('marketPriceBarChart', marketPriceChartData, barChartOptions);
        createChart('postHarvestLossesBarChart', postHarvestLossesChartData, barChartOptions);
        createChart('cropRotationBarChart', cropRotationChartData, barChartOptions);
        createChart('sustainabilityBarChart', sustainabilityChartData, barChartOptions);

        return () => {
            Object.values(chartsRef.current).forEach(chart => chart.destroy());
        };
    }, [user, laborEfficiencyData, machineryUtilizationData, marketPriceData, postHarvestLossesData, cropRotationData, sustainabilityData, selectedCrop]);

    // Save user's analytics data to Firestore
    const saveUserAnalyticsData = async (data) => {
        if (!user) return;

        const docRef = doc(db, 'analyticsReports', user.uid);
        await setDoc(docRef, {
            ...data
        }, { merge: true });
    };

    // Handle adding a new category to data
    const handleAddCategory = (categoryData, setData, category, value, categoryName) => {
        const updatedData = {
            ...categoryData,
            [category]: parseFloat(value) || 0
        };
        setData(updatedData);
        saveUserAnalyticsData({
            laborEfficiency: categoryName === 'laborEfficiency' ? updatedData : laborEfficiencyData,
            machineryUtilization: categoryName === 'machineryUtilization' ? updatedData : machineryUtilizationData,
            postHarvestLosses: categoryName === 'postHarvestLosses' ? updatedData : postHarvestLossesData,
            cropRotation: categoryName === 'cropRotation' ? updatedData : cropRotationData,
            sustainability: categoryName === 'sustainability' ? updatedData : sustainabilityData,
            marketPrices: categoryName === 'marketPrices' ? updatedData : marketPriceData,
        });
    };

    // Handle removing a category from data
    const handleRemoveCategory = (categoryName, category, setData) => {
        setData(prevData => {
            const updatedData = { ...prevData };
            delete updatedData[category];
            saveUserAnalyticsData({
                laborEfficiency: categoryName === 'laborEfficiency' ? updatedData : laborEfficiencyData,
                machineryUtilization: categoryName === 'machineryUtilization' ? updatedData : machineryUtilizationData,
                postHarvestLosses: categoryName === 'postHarvestLosses' ? updatedData : postHarvestLossesData,
                cropRotation: categoryName === 'cropRotation' ? updatedData : cropRotationData,
                sustainability: categoryName === 'sustainability' ? updatedData : sustainabilityData,
                marketPrices: marketPriceData,
            });
            return updatedData;
        });
    };

    // Handle adding a new market price
    const handleAddMarketPrice = () => {
        setMarketPriceData(prevData => ({
            ...prevData,
            [selectedCrop]: [...(prevData[selectedCrop] || []), parseFloat(marketPrice)]
        }));
        saveUserAnalyticsData({
            marketPrices: {
                ...marketPriceData,
                [selectedCrop]: [...(marketPriceData[selectedCrop] || []), parseFloat(marketPrice)]
            }
        });
        setMarketPrice('');
    };

    // Handle removing the last market price
    const handleRemoveMarketPrice = () => {
        setMarketPriceData(prevData => ({
            ...prevData,
            [selectedCrop]: (prevData[selectedCrop] || []).slice(0, -1)
        }));
        saveUserAnalyticsData({
            marketPrices: {
                ...marketPriceData,
                [selectedCrop]: (marketPriceData[selectedCrop] || []).slice(0, -1)
            }
        });
    };

    if (!user) {
        return <p>Please sign in to view the analytics report.</p>;
    }

    return(
        <div className="card-container">
            <h1>Analytics</h1>
            <button className='update' onClick={fetchUserAnalyticsData} disabled={loading}>
                {loading ? 'Loading...' : 'Update Data'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Labor Efficiency Chart */}
            <div className="card large">
                <h2>Labor Efficiency</h2>
                <canvas id="laborEfficiencyBarChart"></canvas>
                <select 
                    className='selector'
                    value={selectedLaborType} 
                    onChange={(e) => setSelectedLaborType(e.target.value)}
                >
                    
    <option className="selector" value="Planting">Planting</option>
    <option className="selector" value="Harvesting">Harvesting</option>
    <option className="selector" value="Irrigation">Irrigation</option>
    <option className="selector" value="Weeding">Weeding</option>
    <option className="selector" value="Fertilizing">Fertilizing</option>
    <option className="selector" value="Pruning">Pruning</option>
    <option className="selector" value="Pest Control">Pest Control</option>
    <option className="selector" value="Soil Preparation">Soil Preparation</option>
    <option className="selector" value="Seeding">Seeding</option>
    <option className="selector" value="Transplanting">Transplanting</option>
    <option className="selector" value="Tilling">Tilling</option>
    <option className="selector" value="Cultivating">Cultivating</option>
    <option className="selector" value="Watering">Watering</option>
    <option className="selector" value="Thinning">Thinning</option>
    <option className="selector" value="Mulching">Mulching</option>
    <option className="selector" value="Crop Monitoring">Crop Monitoring</option>
    <option className="selector" value="Field Maintenance">Field Maintenance</option>
    <option className="selector" value="Harvest Collection">Harvest Collection</option>
    <option className="selector" value="Post-Harvest Handling">Post-Harvest Handling</option>
    <option className="selector" value="Packaging">Packaging</option>
    <option className="selector" value="Storage Management">Storage Management</option>
    <option className="selector" value="Machinery Maintenance">Machinery Maintenance</option>
    <option className="selector" value="Field Mapping">Field Mapping</option>
    <option className="selector" value="Record Keeping">Record Keeping</option>
    <option className="selector" value="Training & Supervision">Training & Supervision</option>
                    {/* Add other options as needed */}
                </select>
                <button className='add' onClick={() => handleAddCategory(laborEfficiencyData, setLaborEfficiencyData, selectedLaborType, laborEfficiencyValue, 'laborEfficiency')}>
                    Add labour Data
                </button>
                <input 
                    type="number" 
                    className='input-group'
                    value={laborEfficiencyValue} 
                    onChange={(e) => setLaborEfficiencyValue(e.target.value)}
                    placeholder="Hours worked on"
                />
            </div>

            {/* Machinery Utilization Chart */}
            <div className="card medium">
                <h2>Machinery Utilization</h2>
                <canvas id="machineryUtilizationBarChart"></canvas>
                <select
                    className='selector' 
                    value={selectedMachineryType} 
                    onChange={(e) => setSelectedMachineryType(e.target.value)}
                >
                  <option className="selector" value="Tractor Usage">Tractor Usage</option>
    <option className="selector" value="Harvesting Equipment">Harvesting Equipment</option>
    <option className="selector" value="Irrigation Systems">Irrigation Systems</option>
    <option className="selector" value="Plowing Machinery">Plowing Machinery</option>
    <option className="selector" value="Planting Equipment">Planting Equipment</option>
    <option className="selector" value="Fertilizer Spreaders">Fertilizer Spreaders</option>
    <option className="selector" value="Sprayers">Sprayers</option>
    <option className="selector" value="Combine Harvesters">Combine Harvesters</option>
    <option className="selector" value="Seed Drills">Seed Drills</option>
    <option className="selector" value="Tillage Equipment">Tillage Equipment</option>
    <option className="selector" value="Soil Preparation Tools">Soil Preparation Tools</option>
    <option className="selector" value="Crop Monitoring Drones">Crop Monitoring Drones</option>
    <option className="selector" value="Precision Planting Systems">Precision Planting Systems</option>
    <option className="selector" value="Grain Carts">Grain Carts</option>
    <option className="selector" value="Bale Wrappers">Bale Wrappers</option>
    <option className="selector" value="Silage Cutters">Silage Cutters</option>
    <option className="selector" value="Manure Spreaders">Manure Spreaders</option>
    <option className="selector" value="Rotary Tillers">Rotary Tillers</option>
    <option className="selector" value="Mulchers">Mulchers</option>
    <option className="selector" value="Post-Hole Diggers">Post-Hole Diggers</option>
    <option className="selector" value="Field Sprayers">Field Sprayers</option>
    <option className="selector" value="Row Crop Cultivators">Row Crop Cultivators</option>
    <option className="selector" value="Grain Augers">Grain Augers</option>
    <option className="selector" value="Farm Loaders">Farm Loaders</option>
    <option className="selector" value="Windrowers">Windrowers</option>
                    {/* Add other options as needed */}
                </select>
                <button  className='add' onClick={() => handleAddCategory(machineryUtilizationData, setMachineryUtilizationData, selectedMachineryType, machineryUtilizationValue, 'machineryUtilization')}>
                    Add Machinery Data
                </button>
                <input 
                    type="number"
                    className='input-group' 
                    value={machineryUtilizationValue} 
                    onChange={(e) => setMachineryUtilizationValue(e.target.value)}
                    placeholder="Hours Used"
                />
            </div>

            {/* Market Price Chart */}
            <div className="card large">
                <h2>Market Prices</h2>
                <canvas id="marketPriceBarChart"></canvas>
                <label htmlFor="cropSelect">Select Crop:</label>
                <select
                    id="cropSelect"
                    className='selector'
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                >
                    <option  className="selector" value="Corn">Corn</option>
                    <option  className="selector" value="Wheat">Wheat</option>
                    <option  className="selector" value="Soybeans">Soybeans</option>
                    <option  className="selector" value="Rice">Rice</option>
                    <option  className="selector" value="Cotton">Cotton</option>
                    <option  className="selector" value="Barley">Barley</option>
                    <option  className="selector" value="Oats">Oats</option>
                    <option  className="selector" value="Sunflowers">Sunflowers</option>
                    <option  className="selector" value="Canola">Canola</option>
                    <option  className="selector" value="Sugarcane">Sugarcane</option>
                    <option  className="selector" value="Sorghum">Sorghum</option>
                    <option  className="selector" value="Peanuts">Peanuts</option>
                    <option  className="selector" value="Potatoes">Potatoes</option>
                    <option  className="selector" value="Coffee">Coffee</option>
                    <option  className="selector" value="Cocoa">Cocoa</option>
                </select>
                <button className='add' onClick={handleAddMarketPrice}>
                    Add Market Price
                </button>
                <input 
                    type="number" 
                    className='input-group'
                    value={marketPrice} 
                    onChange={(e) => setMarketPrice(e.target.value)}
                    placeholder="Price ($)"
                />
            </div>

            {/* Post Harvest Losses Chart */}
            <div className="card medium">
                <h2>Post Harvest Losses</h2>
                <canvas id="postHarvestLossesBarChart"></canvas>
                <select
                    className='selector' 
                    value={selectedLossType} 
                    onChange={(e) => setSelectedLossType(e.target.value)}
                >
                     <option className="selector" value="Storage Losses">Storage Losses</option>
    <option className="selector" value="Transportation Losses">Transportation Losses</option>
    <option className="selector" value="Processing Losses">Processing Losses</option>
    <option className="selector" value="Packaging Losses">Packaging Losses</option>
    <option className="selector" value="Handling Losses">Handling Losses</option>
    <option className="selector" value="Pest Damage">Pest Damage</option>
    <option className="selector" value="Moisture Damage">Moisture Damage</option>
    <option className="selector" value="Mechanical Damage">Mechanical Damage</option>
    <option className="selector" value="Quality Degradation">Quality Degradation</option>
    <option className="selector" value="Spoilage">Spoilage</option>
    <option className="selector" value="Theft">Theft</option>
    <option className="selector" value="Temperature Fluctuations">Temperature Fluctuations</option>
    <option className="selector" value="Grain Shrinkage">Grain Shrinkage</option>
    <option className="selector" value="Fungal Contamination">Fungal Contamination</option>
    <option className="selector" value="Improper Drying">Improper Drying</option>
    <option className="selector" value="Rodent Infestation">Rodent Infestation</option>
    <option className="selector" value="Inadequate Storage Facilities">Inadequate Storage Facilities</option>
    <option className="selector" value="Improper Handling">Improper Handling</option>
    <option className="selector" value="Contamination">Contamination</option>
    <option className="selector" value="Oxidation">Oxidation</option>
    <option className="selector" value="Discoloration">Discoloration</option>
    <option className="selector" value="Pest Infestation">Pest Infestation</option>
    <option className="selector" value="Microbial Contamination">Microbial Contamination</option>
    <option className="selector" value="Inadequate Ventilation">Inadequate Ventilation</option>
    <option className="selector" value="Spillage During Transport">Spillage During Transport</option>
                    {/* Add other options as needed */}
                </select>
                <button className='add' onClick={() => handleAddCategory(postHarvestLossesData, setPostHarvestLossesData, selectedLossType, postHarvestLossesValue, 'postHarvestLosses')}>
                    Add Losses Data
                </button>
                <input 
                    type="number"
                    className='input-group' 
                    value={postHarvestLossesValue} 
                    onChange={(e) => setPostHarvestLossesValue(e.target.value)}
                    placeholder="Kilograms(-)"
                />
            </div>

            {/* Crop Rotation Chart */}
            <div className="card large">
                <h2>Crop Rotation</h2>
                <canvas id="cropRotationBarChart"></canvas>
                <select 
                    className='selector'
                    value={cropRotationCategory} 
                    onChange={(e) => setCropRotationCategory(e.target.value)}
                >
                    <option className="selector" value="Corn to Soybean">Corn to Soybean</option>
    <option className="selector" value="Wheat to Corn">Wheat to Corn</option>
    <option className="selector" value="Rice to Wheat">Rice to Wheat</option>
    <option className="selector" value="Cotton to Corn">Cotton to Corn</option>
    <option className="selector" value="Soybean to Wheat">Soybean to Wheat</option>
    <option className="selector" value="Barley to Canola">Barley to Canola</option>
    <option className="selector" value="Oats to Peas">Oats to Peas</option>
    <option className="selector" value="Sunflowers to Soybeans">Sunflowers to Soybeans</option>
    <option className="selector" value="Canola to Wheat">Canola to Wheat</option>
    <option className="selector" value="Sugarcane to Sorghum">Sugarcane to Sorghum</option>
    <option className="selector" value="Sorghum to Millet">Sorghum to Millet</option>
    <option className="selector" value="Peanuts to Cotton">Peanuts to Cotton</option>
    <option className="selector" value="Potatoes to Barley">Potatoes to Barley</option>
    <option className="selector" value="Coffee to Corn">Coffee to Corn</option>
    <option className="selector" value="Cocoa to Cassava">Cocoa to Cassava</option>
    <option className="selector" value="Alfalfa to Corn">Alfalfa to Corn</option>
    <option className="selector" value="Maize to Soybean">Maize to Soybean</option>
    <option className="selector" value="Peas to Barley">Peas to Barley</option>
    <option className="selector" value="Clover to Corn">Clover to Corn</option>
    <option className="selector" value="Tomatoes to Peppers">Tomatoes to Peppers</option>
    <option className="selector" value="Garlic to Onions">Garlic to Onions</option>
    <option className="selector" value="Pumpkins to Beans">Pumpkins to Beans</option>
    <option className="selector" value="Squash to Corn">Squash to Corn</option>
    <option className="selector" value="Spinach to Lettuce">Spinach to Lettuce</option>
    <option className="selector" value="Carrots to Radishes">Carrots to Radishes</option>
                    {/* Add other options as needed */}
                </select>
                <button className='add' onClick={() => handleAddCategory(cropRotationData, setCropRotationData, cropRotationCategory, cropRotationValue, 'cropRotation')}>
                    Add  Data
                </button>
                <input 
                    type="number" 
                    className='input-group'
                    value={cropRotationValue} 
                    onChange={(e) => setCropRotationValue(e.target.value)}
                    placeholder="+ Kilograms"
                />
            </div>

            {/* Sustainability Chart */}
            <div className="card medium">
                <h2>Sustainability</h2>
                <canvas id="sustainabilityBarChart"></canvas>
                <select
                    className='selector' 
                    value={sustainabilityCategory} 
                    onChange={(e) => setSustainabilityCategory(e.target.value)}
                >
    <option className="selector" value="Soil Conservation">Soil Conservation</option>
    <option className="selector" value="Water Management">Water Management</option>
    <option className="selector" value="Biodiversity">Biodiversity</option>
    <option className="selector" value="Crop Residue Management">Crop Residue Management</option>
    <option className="selector" value="Energy Efficiency">Energy Efficiency</option>
    <option className="selector" value="Organic Farming Practices">Organic Farming Practices</option>
    <option className="selector" value="Integrated Pest Management">Integrated Pest Management</option>
    <option className="selector" value="Carbon Sequestration">Carbon Sequestration</option>
    <option className="selector" value="Agroforestry">Agroforestry</option>
    <option className="selector" value="Cover Cropping">Cover Cropping</option>
    <option className="selector" value="No-Till Farming">No-Till Farming</option>
    <option className="selector" value="Renewable Energy Use">Renewable Energy Use</option>
    <option className="selector" value="Efficient Irrigation">Efficient Irrigation</option>
    <option className="selector" value="Reduced Chemical Inputs">Reduced Chemical Inputs</option>
    <option className="selector" value="Conservation Tillage">Conservation Tillage</option>
    <option className="selector" value="Water Conservation">Water Conservation</option>
    <option className="selector" value="Greenhouse Gas Reduction">Greenhouse Gas Reduction</option>
    <option className="selector" value="Wildlife Habitat Protection">Wildlife Habitat Protection</option>
    <option className="selector" value="Composting">Composting</option>
    <option className="selector" value="Permaculture">Permaculture</option>
    <option className="selector" value="Pollinator Support">Pollinator Support</option>
    <option className="selector" value="Sustainable Forestry">Sustainable Forestry</option>
    <option className="selector" value="Precision Agriculture">Precision Agriculture</option>
    <option className="selector" value="Water Recycling">Water Recycling</option>
    <option className="selector" value="Soil Health Monitoring">Soil Health Monitoring</option>
                    {/* Add other options as needed */}
                </select>
                <button className='add' onClick={() => handleAddCategory(sustainabilityData, setSustainabilityData, sustainabilityCategory, sustainabilityValue, 'sustainability')}>
                    Add Sustainability Data
                </button>
                <input 
                    className='input-group'
                    type="number" 
                    value={sustainabilityValue} 
                    onChange={(e) => setSustainabilityValue(e.target.value)}
                    placeholder="Score"
                />
            </div>
        </div>
    );
};

export default AnalyticsReport;
