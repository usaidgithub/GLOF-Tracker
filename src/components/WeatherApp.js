// src/components/WeatherApp.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Import images
import errorImage from '../assests/404.png';
import cloudImage from '../assests/cloud.png';
import clearImage from '../assests/clear.png';
import rainImage from '../assests/rain.png';
import mistImage from '../assests/mist.png';
import snowImage from '../assests/snow.png';

const WeatherApp = () => {
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [locationNotFound, setLocationNotFound] = useState(false);

    const api_key = "5248ddfd23cde1879e861385e2d58b3d";

    const checkWeather = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === '404') {
                setLocationNotFound(true);
                setWeatherData(null);
                return;
            }

            setLocationNotFound(false);
            setWeatherData({
                temperature: Math.round(data.main.temp - 273.15),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                weatherCondition: data.weather[0].main,
            });
        } catch (error) {
            console.error("Error fetching the weather data:", error);
        }
    };

    const handleSearch = () => {
        checkWeather(inputValue);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        style={styles.inputBox}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button style={styles.searchButton} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>

            {locationNotFound && (
                <div style={styles.locationNotFound}>
                    <h1>Sorry, Location not found!!!</h1>
                    <img src={errorImage} alt="404 Error" style={styles.errorImage} />
                </div>
            )}

            {weatherData && (
                <div style={styles.weatherBody}>
                    <img
                        src={
                            weatherData.weatherCondition === 'Clouds' ? cloudImage :
                            weatherData.weatherCondition === 'Clear' ? clearImage :
                            weatherData.weatherCondition === 'Rain' ? rainImage :
                            weatherData.weatherCondition === 'Mist' ? mistImage :
                            weatherData.weatherCondition === 'Snow' ? snowImage :
                            weatherData.weatherCondition === 'Haze' ? cloudImage :
                            ""
                        }
                        alt="Weather Image"
                        style={styles.weatherImage}
                    />

                    <div style={styles.weatherBox}>
                        <p style={styles.temperature}>{weatherData.temperature} <sup>°C</sup></p>
                        <p style={styles.description}>{weatherData.description}</p>
                    </div>

                    <div style={styles.weatherDetails}>
                        <div style={styles.humidity}>
                            <i className="fa-sharp fa-solid fa-droplet" style={styles.icon}></i>
                            <div style={styles.text}>
                                <span>{weatherData.humidity}%</span>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div style={styles.wind}>
                            <i className="fa-solid fa-wind" style={styles.icon}></i>
                            <div style={styles.text}>
                                <span>{weatherData.windSpeed}Km/H</span>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '400px',
        height: 'min-content',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        width: '100%',
    },
    searchBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputBox: {
        width: '84%',
        fontSize: '20px',
        textTransform: 'capitalize',
        color: '#000',
        backgroundColor: '#e6f5fb',
        padding: '12px 16px',
        borderRadius: '14px',
    },
    searchButton: {
        width: '46px',
        height: '46px',
        backgroundColor: '#e6f5fb',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '20px',
    },
    weatherBody: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBlock: '20px',
    },
    weatherImage: {
        width: '60%',
    },
    weatherBox: {
        marginBlock: '20px',
        textAlign: 'center',
    },
    temperature: {
        fontSize: '40px',
        fontWeight: '800',
        position: 'relative',
    },
    description: {
        fontSize: '20px',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    weatherDetails: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
    },
    humidity: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
    },
    wind: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
    },
    icon: {
        fontSize: '36px',
    },
    text: {
        marginLeft: '10px',
        fontSize: '16px',
    },
    locationNotFound: {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    errorImage: {
        width: '80%',
    },
};

export default WeatherApp;
