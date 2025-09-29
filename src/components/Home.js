import React, { useState,useEffect} from 'react';
import Footer from './Footer'; // Import the Footer component
import axios from 'axios'
import Options from './Options';
import {Link} from "react-router-dom";
import {
  FaSignOutAlt, FaBars, FaMapMarkerAlt, FaBell, FaSearch, FaHome, FaMapMarker,
  FaUser, FaCog, FaEnvelope, FaShareSquare, FaGlobe, FaInfoCircle,
  FaThumbsUp, FaThumbsDown
} from 'react-icons/fa';
import './Home.css';  // External CSS file for styling

const newsData = [
  {
    id: '1',
    title: 'Climate change: What we know so far',
    imageUrl: 'https://picsum.photos/id/240/200/300',
    description: 'We know that climate change is a global emergency, but what we know so far is that it is happening in India.',
  },
  {
    id: '2',
    title: 'Global warming: What comes next?',
    imageUrl: 'https://picsum.photos/id/238/200/300',
    description: 'Global warming effects are becoming more apparent with each passing year.',
  },
];

const drawerOptions = [
  { id: '1', title: 'Home', icon: <FaHome /> },
  { id: '2', title: 'Change Location', icon: <FaMapMarker /> },
  { id: '3', title: 'Your Profile', icon: <FaUser /> },
  { id: '4', title: 'Settings', icon: <FaCog /> },
  { id: '5', title: 'Logout', icon: <FaSignOutAlt /> },
  { id: '6', title: 'Contact Us', icon: <FaEnvelope /> },
];

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [zone, setZone] = useState('YELLOW ZONE');
  const[lat,setLat]=useState(null)
  const[lon,setLon]=useState(null)
  const[weather,setWeather]=useState({})
  const [filteredSearches, setFilteredSearches] = useState([]);
  const [locationAllowed, setLocationAllowed] = useState(false); 

  const recentSearches = ['Lachen', 'Lhonak lake', 'Leh', 'Srinagar', 'Mumbai'];

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setLocationAllowed(true);  // Location permission allowed
        },
        () => {
          setLocationAllowed(false);  // Location permission denied
          console.log("Location permission denied.");
        }
      );
    }
  }, []);
  useEffect(() => {
    if (lat && lon && locationAllowed) {  // Only fetch data if location is allowed
      fetchWeatherData(lat, lon);
    }
  }, [lat, lon, locationAllowed]);
  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = 'b3abbffb39a747724a9a16e9397cabcd';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;  // Add &units=metric to get temperature in Celsius
  
    try {
      const response = await axios.get(url);
      const weatherData = response.data;
  
      setWeather({
        temperature: weatherData.main.temp,          // Temperature in Celsius
        humidity: weatherData.main.humidity,         // Humidity percentage
        pressure: weatherData.main.pressure,         // Atmospheric pressure in hPa
        windSpeed: weatherData.wind.speed,           // Wind speed in meter/sec
        precipitation: weatherData.rain ? weatherData.rain["1h"] || 0 : 0,  // Rain volume for last 1 hour (in mm)
      });
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };
  
  const getGLOFPrediction = async () => {
    const predictionData = {
      lat,
      lon,
      ...weather,
    };

    try { 
      const response = await axios.post('http://127.0.0.1:5000/api/glof-prediction', predictionData);
      const prediction = response.data.prediction; // 0 or 1
      setZone(prediction === 1 ? 'RED ZONE' : 'GREEN ZONE');
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };
  useEffect(() => {
    if (locationAllowed && weather.temperature) {  // Ensure location and weather data exist before prediction
      getGLOFPrediction();
    }
  }, [weather, locationAllowed]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (value) {
      const filtered = recentSearches.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSearches(filtered);
    } else {
      setFilteredSearches([]);
    }
  };

  const getAlertBoxColor = () => {
    if (!locationAllowed) {
      return '#0000FF'; // Yellow when location is not allowed
    }
    switch (zone) {
      case 'RED ZONE':
        return '#8B0000'; // Dark red for red zone
      case 'YELLOW ZONE':
        return '#FFD966'; // Mustard yellow for yellow zone
      case 'GREEN ZONE':
        return '#008000'; // Green for green zone
      default:
        return '#8B0000'; // Default to red zone as fallback
    }
  };

  const getTextColor = () => {
    switch (zone) {
      case 'RED ZONE':
        return '#FF6347';  // Tomato red for red zone text
      case 'YELLOW ZONE':
        return '#C79400';  // Golden yellow for yellow zone text
      case 'GREEN ZONE':
        return '#00FF00';  // Lime green for green zone text
      default:
        return '#FFFFFF';  // Default to white text
    }
  };

  return (
    <div className="home-container">
      <div>
        {/* Header */}
        <div className="header">
          <FaBars className="icon" onClick={openDrawer} style={{cursor:'pointer'}}/>
          <div className="header-options">
            <FaMapMarkerAlt className="icon" style={{cursor:'pointer'}}/>
            <FaBell className="icon" />
          </div>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search here"
            value={searchText}
            onChange={handleSearchChange}
          />
          {filteredSearches.length > 0 && (
            <ul className="suggestions">
              {filteredSearches.map((item) => (
                <li key={item} className="suggestion-item">
                  <FaBell className="search-icon" /> {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Alert Box */}
        <div className="alert-box" style={{ backgroundColor: getAlertBoxColor() }}>
          <p>Hello Aman!</p>
          <p>
          <FaMapMarker /> {locationAllowed ? 'Mumbai, Byculla' : 'Location not available'}
          </p>
          <p>
            Currently You are in{' '}
            <span style={{ color: getTextColor() }}>
              {locationAllowed ? zone : 'No Zone Available'}
            </span>
          </p>
          <p>Know more...</p>

          <div className="line"></div>

          <div className="action-row">
            <div className="action-button">
              <FaShareSquare className="box-icon" style={{cursor:'pointer'}}/>
              <p>Share</p>
            </div>
            <div className="action-button">
              <FaGlobe className="box-icon"  style={{cursor:'pointer'}}/>
              <p>Translate</p>
            </div>
            <div className="action-button">
              <Link to="/do"><FaInfoCircle className="box-icon"  style={{cursor:'pointer'}}/></Link>
              <p>Do's & Don'ts</p>
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <Link to="/donation"><button className="donate-button">Donate Now</button></Link>

        {/* Feedback Section */}
        <div className="feedback-section">
          <p>Is the information helpful?</p>
          <div className="feedback-icons">
            <FaThumbsUp className="icon" />
            <FaThumbsDown className="icon" />
          </div>
        </div>
        <Options />
        {/* News Section */}
        <div className="news-section">
          <h3>News</h3>
          {newsData.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.imageUrl} alt={item.title} className="news-image" />
              <div className="news-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Component */}
        <Footer page="Home" />
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div>
          <div className="overlay" onClick={closeDrawer}></div>
          <div className="drawer">
            <div className="logo-container">
              <FaUser className="profile-icon" />
              <p>Aman Khan</p>
            </div>
            <button onClick={closeDrawer} className="close-button">
              <FaSignOutAlt />
            </button>
            <ul className="drawer-options">
              {drawerOptions.map((item) => (
                <li key={item.id} className="drawerOption">
                  {item.icon} {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
