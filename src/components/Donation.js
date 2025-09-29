import React, { useState, useEffect } from 'react';

// Import images
import image1 from '../assests/Screenshot_19-10-2024_145124_www.bing.com.jpeg';
import image2 from '../assests/Screenshot_19-10-2024_145342_www.bing.com.jpeg';
import image3 from '../assests/Screenshot_19-10-2024_14540_www.bing.com.jpeg';

function Donation() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [donationAmount, setDonationAmount] = useState('');

  // Image slider logic
  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Donation logic
  const handleDonationChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleDonate = () => {
    // Donation processing logic can go here
    console.log(`Donation amount: ₹${donationAmount}`);
    alert(`Thank you for donating ₹${donationAmount}!`);
  };

  return (
    <div className="donation-container">
      {/* CSS Styles */}
      <style>
        {`
          .donation-container {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            padding: 10px;
            text-align: center;
          }
          .header {
            display: flex;
            align-items: center;
            background-color: #001f4d;
            padding: 10px;
            color: white;
            justify-content: center;
            position: relative;
          }
          .back-arrow {
            position: absolute;
            left: 15px;
            font-size: 24px;
            color: white;
            cursor: pointer;
          }
          .card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            margin: 15px 0;
            padding: 20px;
          }
          .card img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 15px;
          }
          .image-slider img {
            width: 100%;
            height: auto;
            border-radius: 8px;
          }
          .know-more-button {
            background-color: #008cff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
          }
          .know-more-button:hover {
            background-color: #005bb5;
          }
          .donation-page {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            margin-top: 15px;
          }
          .donation-options button {
            background-color: #f0f0f0;
            border: 1px solid #cccccc;
            padding: 10px 20px;
            margin: 10px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 16px;
            color: #333333;
          }
          .donation-options button:hover {
            background-color: #e0e0e0;
          }
          input[type="number"] {
            padding: 10px;
            margin-top: 10px;
            width: 80%;
            border-radius: 8px;
            border: 1px solid #cccccc;
            font-size: 16px;
          }
          .donation-page p {
            margin-top: 15px;
            font-size: 14px;
            color: #555;
          }
          .donate-button {
            background-color: #c50000;
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
          }
          .donate-button:disabled {
            background-color: #e0e0e0;
            cursor: not-allowed;
          }
          .donate-button:hover:not(:disabled) {
            background-color: #a30000;
          }
          h2 {
            margin: 0;
            color: #00a000;
          }
          .card-title {
            font-size: 24px;
            margin-bottom: 10px;
          }
          .card-subtitle {
            font-size: 16px;
            margin-bottom: 20px;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          ul li {
            margin: 10px 0;
            font-size: 14px;
            color: #555555;
          }
        `}
      </style>

      {/* Header Section */}
      <div className="header">
        <span className="back-arrow">&lt;</span>
        <h2>GLOF Tracker Disaster Relief</h2>
      </div>

      {/* Image Slider Section */}
      <div className="card">
        <h2 className="card-title">Funds For Disaster Relief</h2>
        <p className="card-subtitle">All day, every day, wherever someone needs us.</p>
        <div className="image-slider">
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
          />
        </div>
        <button className="know-more-button">Know More</button>
      </div>

      {/* Donation Section */}
      <div className="donation-page">
        <h2>Donate Now to Disaster Relief</h2>
        <p>Help People affected by disasters big and small.</p>

        <div className="donation-options">
          <button onClick={() => setDonationAmount('100')}>₹100</button>
          <button onClick={() => setDonationAmount('200')}>₹200</button>
          <button onClick={() => setDonationAmount('500')}>₹500</button>
          <button onClick={() => setDonationAmount('1000')}>₹1000</button>
          <button onClick={() => setDonationAmount('2000')}>₹2000</button>
          <input
            type="number"
            value={donationAmount}
            onChange={handleDonationChange}
            placeholder="Other Amount"
          />
        </div>

        <p>₹10 is the minimum online donation</p>
        <button onClick={handleDonate} disabled={donationAmount < 10}>
          Donate Now
        </button>

        <h2>Why Donate with Us?</h2>
        <ul>
          <li>Transparency at its best to track donations in real-time.</li>
          <li>Millions of lives touched.</li>
          <li>50% tax savings on every donation.</li>
          <li>Communities need you. Be the difference.</li>
        </ul>
      </div>
    </div>
  );
}

export default Donation;
