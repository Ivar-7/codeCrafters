import React from "react";
import "./cameraAI.css";

const CameraAssistance = () => {
  return (

<div className="container">
<form className="form">
  <span className="form-title">Upload your file</span>
  <p className="form-paragraph">
      File should be an image
    </p>
   <label for="file-input" className="drop-container">
  <span className="drop-title">Drop files here</span>
  or
  <input type="file" accept="image/*" required="" id="file-input"></input>
</label>
</form>
</div>
  );
};

export default CameraAssistance;
