import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/tailwind.css';

// Fix for missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = () => {
  const [pointsData, setPointsData] = useState([]);
  const [graph, setGraph] = useState({});
  const [polylines, setPolylines] = useState([]);

  // Function to parse CSV and load data
  const loadCsvData = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split('\n').slice(1); // Skip header row
      const polygons = rows.map((row) => {
        const columns = row.split(';');
        if (columns.length === 2) {
          const polygonId = columns[0].trim();
          const coordinates = columns[1].split('@');
          const latLngs = coordinates.map((coord) => {
            const [lng, lat] = coord.split(',').map((val) => parseFloat(val.trim()));
            return isNaN(lng) || isNaN(lat) ? null : [lat, lng];
          }).filter(Boolean);
          return latLngs.length ? { polygonId, latLngs } : null;
        }
        return null;
      }).filter(Boolean);
      setPolylines(polygons);
    };
    reader.readAsText(file);
  };

  // Function to load points from CSV
  const loadPointsCsv = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split('\n').slice(1); // Skip header row
      const points = rows.map((row) => {
        const columns = row.split(';');
        if (columns.length === 2) {
          const name = columns[0].trim();
          const [latitude, longitude] = columns[1].split(',').map((coord) => parseFloat(coord.trim()));
          return !isNaN(latitude) && !isNaN(longitude) ? { name, latitude, longitude } : null;
        }
        return null;
      }).filter(Boolean);
      setPointsData(points);
    };
    reader.readAsText(file);
  };

// Initialize the map variable outside of the function so that it persists
let map;

const displayPointsOnMap = () => {
  if (pointsData.length === 0) {
    alert('No points data loaded! Please upload a valid CSV file.');
    return;
  }
  if (!map) {
    map = L.map('map').setView([31.590, 74.375], 18); // Initialize map only once
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  } else {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer); 
      }
    });
  }
  pointsData.forEach((point) => {
    L.marker([point.latitude, point.longitude])
      .addTo(map)
      .bindPopup(`<b>${point.name}</b><br>Lat: ${point.latitude}, Lng: ${point.longitude}`);
  });
  connectNodes(pointsData, 200);
};

  // Function to calculate the distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth’s radius in meters
    const toRadians = (degrees) => degrees * Math.PI / 180;
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  // Function to connect nodes
  const connectNodes = (points, threshold) => {
    const newGraph = {};
    points.forEach((point) => {
      newGraph[point.name] = [];
      points.forEach((otherPoint) => {
        if (point !== otherPoint) {
          const distance = calculateDistance(point.latitude, point.longitude, otherPoint.latitude, otherPoint.longitude);
          if (distance <= threshold) {
            newGraph[point.name].push({ name: otherPoint.name, distance });
          }
        }
      });
    });
    setGraph(newGraph);
  };

  return (
    <div>
      <MapContainer id="map" style={{ height: '700px', width: '100%' }} center={[31.590, 74.375]} zoom={18}>
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {polylines.map((polygon, index) => (
          <Polygon key={index} positions={polygon.latLngs} color="blue">
            <Popup>{polygon.polygonId}</Popup>
          </Polygon>
        ))}
      </MapContainer>
      <input
        type="file"
        id="csvFile"
        accept=".csv"
        onChange={(e) => loadCsvData(e.target.files[0])}
      />
      <input
        type="file"
        id="pointsCsvFile"
        accept=".csv"
        onChange={(e) => loadPointsCsv(e.target.files[0])}
      />
      <button onClick={displayPointsOnMap}>Show Points on Map</button>
    </div>
  );
};

export default MapView;
