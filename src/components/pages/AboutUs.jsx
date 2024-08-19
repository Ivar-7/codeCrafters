import React from "react";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="tooltip-container">
        <span className="tooltip">About US</span>
        <span className="text">About </span>
      </div>
      <p>
        Welcome to AgroIntel, your partner in precision agriculture. Our mission is to empower farmers with data-driven insights and cutting-edge technology that revolutionizes farming practices across Africa. We are dedicated to providing personalized guidance to help farmers optimize their yield, manage resources efficiently, and contribute to sustainable agriculture.
      </p>
      <p>
        At AgroIntel, we believe in the power of technology to transform agriculture. Our AI-powered platform leverages advanced analytics and real-time data to offer actionable insights tailored to your farm's unique conditions. From soil analysis to climate monitoring, we provide comprehensive solutions that enable you to make informed decisions and achieve better results.
      </p>
      <p>
        Join us on our journey to create a more sustainable and prosperous future for farmers everywhere. Together, we can make a difference in the world of agriculture.
      </p>

      <div className="card-container">
        {/* Contact Us Card */}
        <div className="card contact-card">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:support@example.com">itsamon2@gmail.com</a></p>
            <p><strong>Mobile 1:</strong> <a href="tel:+1234567890">+254745188124</a></p>
            <p><strong>Mobile 2:</strong> <a href="tel:+0987654321">+254743822624</a></p>
            <p><strong>Twitter:</strong> <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">@yourprofile</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
