import React from 'react';

const SurvivalGuide = () => {
  return (
    <div className="about-container">
      {/* Embedded CSS */}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }

          body {
            background-color: #ffffff;
            padding: 20px;
            line-height: 1.6;
          }

          .header {
            display: flex;
            align-items: center;
            background-color: #001f4d;
            padding: 10px;
            color: white;
            justify-content: center;
            position: relative;
            border-radius: 10px;
          }

          .back-arrow {
            cursor: pointer;
            fill: #333;
            padding-right: 30px;
          }

          header h1 {
            font-size: 28px;
          }

          section {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          h2 {
            color: #ffffff;
            font-size: 22px;
            margin-bottom: 15px;
            padding-top: 17px;
          }

          ul {
            list-style-type: disc;
            margin-left: 20px;
            margin-bottom: 20px;
            color: #000;
          }

          ul li {
            margin-bottom: 10px;
            font-size: 16px;
          }

          .emergency {
            color: #d9534f;
            font-weight: bold;
          }

          .tips-section {
            background-color: #f4f4f4;
            padding: 15px;
            border-left: 5px solid #1e1e2d;
            margin-bottom: 20px;
          }

          footer {
            text-align: center;
            font-size: 14px;
            color: #555;
            margin-top: 30px;
          }

          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #1e1e2d;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            margin-top: 10px;
          }

          .btn:hover {
            background-color: #007bff;
          }

          @media (max-width: 768px) {
            body {
              padding: 10px;
            }

            header h1 {
              font-size: 24px;
            }

            h2 {
              font-size: 20px;
            }
          }
        `}
      </style>

      <div className="header">
        <span className="back-arrow">&lt;</span>
        <h2>GLOF Tracker - Disaster Survival Guide</h2>
      </div>

      <section>
        <h2>Before a GLOF Event</h2>
        <ul>
          <li>Stay informed about local weather conditions and glacier lake activity through GLOF Tracker.</li>
          <li>Identify safe evacuation routes in your area.</li>
          <li>Prepare an emergency kit with essentials like water, food, medications, and first-aid supplies.</li>
          <li>Ensure your home or workplace has a clear disaster response plan.</li>
          <li>Keep important documents in a waterproof container.</li>
        </ul>
      </section>

      <section>
        <h2>During a GLOF Event</h2>
        <ul>
          <li>Immediately follow evacuation instructions from local authorities.</li>
          <li>Avoid low-lying areas and riverbanks, as flash floods are likely to occur.</li>
          <li>If you're on high ground, stay there until you're given the all-clear.</li>
          <li>Do not attempt to cross floodwaters, even if they appear shallow.</li>
          <li>Be prepared for landslides, which can occur during GLOFs.</li>
        </ul>
      </section>

      <section className="tips-section">
        <h2>Essential Tips for Survival</h2>
        <ul>
          <li>Maintain communication with family and emergency services if possible.</li>
          <li>Stay calm and focus on keeping yourself and others safe.</li>
          <li>Follow updates from reliable sources like GLOF Tracker or local disaster authorities.</li>
        </ul>
        <p className="emergency">In case of an emergency, dial your local disaster response hotline or 911 (if applicable).</p>
      </section>

      <section>
        <h2>After a GLOF Event</h2>
        <ul>
          <li>Wait for official communication before returning to affected areas.</li>
          <li>Inspect your property for damage, but avoid entering structures that are at risk of collapse.</li>
          <li>Boil water before drinking, as water sources may be contaminated.</li>
          <li>Help neighbors and others in need, but avoid putting yourself in danger.</li>
          <li>Follow instructions from local authorities for cleanup and recovery efforts.</li>
        </ul>
      </section>

      <footer>
        <p>&copy; 2024 GLOF Tracker. Stay safe and stay informed!</p>
        <a className="btn" href="#">Return to Home</a>
      </footer>
    </div>
  );
};

export default SurvivalGuide;
