import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const GlacierMap = () => {
    const [currentLocation, setCurrentLocation] = useState([33.0, 77.0]); // Default center over India
    const [glacierData, setGlacierData] = useState([]);

    const glaciers = [
        { name: "Milam Glacier", coords: [30.3112, 80.1926], location: "Uttarakhand" },
        { name: "Bhagirathi Kharak Glacier", coords: [30.7892, 79.0466], location: "Uttarakhand" },
        { name: "Zanskar Glacier", coords: [33.3176, 77.4700], location: "Ladakh" },
        { name: "Chadar Glacier", coords: [34.3132, 77.5597], location: "Ladakh" },
        { name: "Ramkunda Glacier", coords: [30.7733, 79.2622], location: "Uttarakhand" },
        { name: "Kashmir Valley Glaciers (e.g., Kolahoi Glacier)", coords: [34.0661, 75.2060], location: "Jammu and Kashmir" },
        { name: "Suru Glacier", coords: [34.2938, 75.5093], location: "Ladakh" },
        { name: "Biafo Glacier", coords: [35.7756, 75.5588], location: "Baltoro, Gilgit-Baltistan" },
        { name: "Baltoro Glacier", coords: [35.7533, 75.5457], location: "Baltoro, Gilgit-Baltistan" },
        { name: "Khardung La Glacier", coords: [34.3533, 77.5056], location: "Ladakh" }
    ];

    useEffect(() => {
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Set the current location to the user's approximate city location (rounded to the nearest city)
                setCurrentLocation([Math.round(lat), Math.round(lng)]);
            }, () => {
                alert("Unable to retrieve your location. Please allow location access.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        // Fetch glacier data from the Node.js server
        fetch('http://localhost:3777/glacier-data')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Only take every 100th data point from the glacier dataset
                const filteredData = data.filter((_, index) => index % 100 === 0);
                setGlacierData(filteredData);
            })
            .catch(error => console.error('Error loading glacier data:', error));
    }, []);

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <MapContainer center={currentLocation} zoom={10} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a> | &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Adding static glaciers to the map */}
                {glaciers.map((glacier, index) => (
                    <CircleMarker key={index} center={glacier.coords} color='orange' radius={8}>
                        <Popup>
                            <b style={{ color: 'white' }}>{glacier.name}</b><br />
                            Location: {glacier.location}<br />
                            Coordinates: {glacier.coords[0]}, {glacier.coords[1]}
                        </Popup>
                    </CircleMarker>
                ))}

                {/* Display glacier data from the Node.js server (every 100th record) */}
                {glacierData.map((glacier, index) => {
                    const lat = parseFloat(glacier.Latitude);
                    const lng = parseFloat(glacier.Longitude);
                    const meltRate = parseFloat(glacier.Glacier_Melt_Rate_m_per_year);

                    return (
                        <CircleMarker key={index} center={[lat, lng]} color={meltRate > 5 ? 'red' : 'blue'} radius={10}>
                            <Popup>
                                <b style={{ color: 'black' }}>Glacier Details</b><br />
                                Thickness: {glacier.Glacier_Thickness_m} m<br />
                                Melt Rate: {glacier.Glacier_Melt_Rate_m_per_year} m/year<br />
                                Snow Cover: {glacier.Snow_Cover_sq_km} sq km
                            </Popup>
                        </CircleMarker>
                    );
                })}

                {/* Marker for current location */}
                <Marker position={currentLocation} icon={L.divIcon({
                    className: 'current-location-marker',
                    html: '<div style="background-color: red; border-radius: 50%; width: 20px; height: 20px;"></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                })}>
                    <Popup>
                        <b style={{ color: 'black' }}>You are currently here</b>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    ); 
};

export default GlacierMap;
