import React from 'react';

const Do = () => {
  return (
    <div className="container">
      {/* Embedded CSS */}
      <style>
        {`
          /* Container for the entire component */
          .container {
            font-family: Arial, sans-serif;
            color: black;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: 0 auto;
            border: 1px solid #ddd;
          }

          /* Header styling with back arrow and title */
          .header {
            display: flex;
            align-items: center;
            background-color: #001f4d;
            padding: 10px;
            padding-right: 25px;
            color: white;
            justify-content: center;
            position: relative;
          }

          .back-arrow {
            cursor: pointer;
            fill: #333;
            margin-right: 10px;
          }

          .header h2 {
            font-size: 20px;
            margin: 0;
            font-weight: bold;
          }

          /* Do's and Don'ts section styling */
          .content h3 {
            color: #333;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: bold;
          }

          ul {
            list-style-type: none;
            padding-left: 0;
            margin: 0;
          }

          li {
            font-size: 16px;
            margin-bottom: 15px;
            line-height: 1.5;
          }

          /* Checkmark and Crossmark styles */
          .checkmark {
            color: green;
            margin-left: 5px;
            font-size: 20px;
          }

          .crossmark {
            color: red;
            margin-left: 5px;
            font-size: 20px;
          }

          /* Button at the bottom */
          .learn-more-btn {
            background-color: #007bff;
            color: white;
            padding: 10px;
            width: 100%;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
          }

          .learn-more-btn:hover {
            background-color: #0056b3;
          }

          .back-arrow {
            padding-right: 40px;
          }
        `}
      </style>

      <div className="header">
        <span className="back-arrow">&lt;</span>
        <h2>GLOF Tracker Disaster Guide</h2>
      </div>
      <div className="content">
        <h3>Do's:</h3>
        <ul>
          <li>
            Turn off power supply and gas connection if not necessary. <span className="checkmark">✓</span>
          </li>
          <li>
            Drain out excess water. <span className="checkmark">✓</span>
          </li>
          <li>
            Move to higher ground. <span className="checkmark">✓</span>
          </li>
          <li>
            Stay informed about weather conditions and glacier stability. <span className="checkmark">✓</span>
          </li>
        </ul>
        <h3>Don'ts:</h3>
        <ul>
          <li>
            Never ignore warnings from authorities or experts about potential outburst floods. <span className="crossmark">✗</span>
          </li>
          <li>
            GLOFs can carry immense amounts of debris and water, so don't underestimate their power. <span className="crossmark">✗</span>
          </li>
          <li>
            Don't hesitate to ask for help from local authorities or emergency services. <span className="crossmark">✗</span>
          </li>
          <li>
            Don't wait to see the flood or think you have time. GLOFs can happen suddenly with little warning. <span className="crossmark">✗</span>
          </li>
        </ul>
      </div>
      <button className="learn-more-btn">Close</button>
    </div>
  );
};

export default Do;
