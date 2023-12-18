// src/components/TollCalculator.js
import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

const TollCalculator = () => {
  const [source, setSource] = useState([0, 0]);
  const [destination, setDestination] = useState([0, 0]);
  const [tollCost, setTollCost] = useState(null);

  const handleCalculateToll = async () => {
    const tollGuruApiUrl = 'https://apis.tollguru.com/toll/v2/origin-destination-waypoints';

    const apiKey = 'dFHBhJDmhD26thMGR9DBM9HR7d8tB6f2';

    const requestData = {
      from: { address: 'Philadelphia , Pennsylvania,', lat: 39.95209, lng: -75.16219 },
      to: { address: 'New York ,NY,', lat: 40.71455, lng: -74.00715 },
      waypoints: [{ address: 'Bridgewater Township , New Jersey' }],
      serviceProvider: 'here',
      vehicle: {
        type: '2AxlesTaxi',
        weight: { value: 20000, unit: 'pound' },
        height: { value: 7.5, unit: 'meter' },
        length: { value: 7.5, unit: 'meter' },
        axles: 4,
        emissionClass: 'euro_5',
      },
    };

    try {
      const response = await axios.post(tollGuruApiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,

        },
        withCredentials: true,
      });

      console.log(response.data);
      // Assuming the toll cost is available in the response, update the state or perform other actions.
      setTollCost(response.data);
    } catch (error) {
      console.error('Error calculating toll:', error);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSource([lat, lng]);
  };

  return (
    <div>
      {/* <MapContainer center={[0, 0]} zoom={13} style={{ height: '400px' }} onClick={handleMapClick}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={source}>
                    <Popup>Source</Popup>
                </Marker>
            </MapContainer> */}

      <div>
        <label>Destination: </label>
        <input
          type="text"
          placeholder="Enter destination coordinates (lat, lng)"
          onChange={(e) => setDestination(e.target.value.split(',').map(Number))}
        />
      </div>

      <button onClick={handleCalculateToll}>Calculate Toll</button>

      {tollCost !== null && <p>Toll Cost: ${tollCost}</p>}
    </div>
  );
};

export default TollCalculator;
