import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Options.css'; // Import the CSS file

const Options = () => {
  const options = [
    { title: 'Disaster Survival Guide', icon: '📖', path: '/survival' }, // Add path for the Survival Guide
    { title: 'Subscribe Location', icon: '📍' },
    { title: 'Weather Forecast', icon: '🌧️',path:'/weather' },
  ];

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <Link key={index} to={option.path} className="option-box"> {/* Use Link for navigation */}
          <span className="icon" style={{ cursor: 'pointer' }}>{option.icon}</span>
          <span className="option-title">{option.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Options;
