import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMap, faComments, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css';

const Footer = ({ initialPage }) => {
  const [activePage, setActivePage] = useState(initialPage || 'Home');

  const footerItems = [
    { name: 'Home', icon: faHome, path: '/' },
    { name: 'Map', icon: faMap, path: '/map' },
    { name: 'Chatbot', icon: faComments, path: '/chatbot' }, // Added path for Chatbot
    { name: 'Organizations', icon: faUsers, path: '/organizations' },
  ];

  return (
    <div className="footer">
      {footerItems.map((item) => (
        <Link
          key={item.name}
          to={item.path} // Use Link to navigate
          className={`footerItem ${activePage === item.name ? 'activeItem' : ''}`}
          onClick={() => setActivePage(item.name)}
        >
          <FontAwesomeIcon
            icon={item.icon}
            size={activePage === item.name ? 'lg' : 'sm'} // Adjust icon size for active item
            color={activePage === item.name ? '#00AFFF' : '#B0B0B0'}
          />
          <span className={`footerText ${activePage === item.name ? 'activeText' : 'inactiveText'}`}>
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
