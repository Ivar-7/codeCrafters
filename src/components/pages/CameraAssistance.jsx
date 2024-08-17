import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const CameraAssistance = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const identifyPlant = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt =
        "Identify this plant and provide management tips for best crop yields. Format the response as follows: Plant Name: [name], Management Tips: [tip1], [tip2], [tip3]";

      const imageParts = [
        {
          inlineData: {
            data: await fileToGenerativePart(image),
            mimeType: image.type,
          },
        },
      ];

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();

      setResult(parseResponse(text));
    } catch (err) {
      setError("Error identifying plant. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return base64EncodedDataPromise;
  }

  function parseResponse(text) {
    const plantNameMatch = text.match(/Plant Name: (.+)/);
    const tipsMatch = text.match(/Management Tips: (.+)/);

    const plantName = plantNameMatch
      ? plantNameMatch[1].trim()
      : "Unknown Plant";
    const tips = tipsMatch
      ? tipsMatch[1].split(",").map((tip) => tip.trim())
      : ["No specific tips available"];

    return {
      plantName,
      managementTips: tips,
    };
  }

  return (
    <div className="camera-assistance">
      <h2>Crop Identification and Management</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={identifyPlant} disabled={!image || loading}>
        {loading ? "Identifying..." : "Identify Plant"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Identified Plant: {result.plantName}</h3>
          <p>Management Tips:</p>
          <ul>
            {result.managementTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CameraAssistance;
