import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/tailwind.css';
import 'leaflet-routing-machine';

// Fix for missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // Earth's radius in meters
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

const MapPoints = ({ pointsData, threshold, setGraph }) => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    if (pointsData.length === 0) return;

    const graph = {};
    const polylines = [];

    pointsData.forEach((point) => {
      L.marker([point.latitude, point.longitude])
        .addTo(map)
        .bindPopup(`<b>${point.name}</b><br>Lat: ${point.latitude}, Lng: ${point.longitude}`);
    });

    for (let i = 0; i < pointsData.length; i++) {
      for (let j = i + 1; j < pointsData.length; j++) {
        const distance = calculateDistance(
          pointsData[i].latitude,
          pointsData[i].longitude,
          pointsData[j].latitude,
          pointsData[j].longitude
        );

        if (distance <= threshold) {
          if (!graph[pointsData[i].name]) graph[pointsData[i].name] = [];
          if (!graph[pointsData[j].name]) graph[pointsData[j].name] = [];
          graph[pointsData[i].name].push({ name: pointsData[j].name, distance });
          graph[pointsData[j].name].push({ name: pointsData[i].name, distance });

          const waypoints = [
            L.latLng(pointsData[i].latitude, pointsData[i].longitude),
            L.latLng(pointsData[j].latitude, pointsData[j].longitude),
          ];

          L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: false,
            createMarker: () => null, // Suppress default markers
            lineOptions: {
              styles: [{ color: 'blue', weight: 3, opacity: 0.8 }],
            },
          })
            .on('routesfound', (e) => {
              const route = e.routes[0];
              const polyline = L.polyline(route.coordinates, {
                color: 'blue',
                weight: 3,
                opacity: 0.8,
              }).addTo(map);

              polylines.push({ points: [pointsData[i].name, pointsData[j].name], polyline });
            })
            .addTo(map);
        }
      }
    }

    console.log('Graph of connections:', graph);
    setGraph(graph); // Update the graph state
  }, [pointsData, map, threshold, setGraph]);

  return null; // This component doesn't render anything itself
};

const MapView = () => {
  const [pointsData, setPointsData] = useState([]);
  const [graph, setGraph] = useState({});
  const [threshold, setThreshold] = useState(100);
  const [polylines, setPolylines] = useState();

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

  return (
    <div>
      <MapContainer id="map" style={{ height: '80vh', width: '100%' }} center={[31.590, 74.375]} zoom={18}>
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        {polylines?.map((polygon, index) => (
          <Polygon key={index} positions={polygon.latLngs} color="blue">
            <Popup>{polygon.polygonId}</Popup>
          </Polygon>
        ))}
        <MapPoints pointsData={pointsData} threshold={threshold} setGraph={setGraph} />
      </MapContainer>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => loadCsvData(e.target.files[0])}
      />
      <input
        type="file"
        accept=".csv"
        onChange={(e) => loadPointsCsv(e.target.files[0])}
      />
      <div>
        <label>Threshold (meters): </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default MapView;
