import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/tailwind.css";
import "leaflet-routing-machine";

// Fix for missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
  return R * c;
};

const MapPoints = ({ pointsData, threshold, setGraph }) => {
  const map = useMap();
  useEffect(() => {
    if (pointsData.length === 0) return;

    // Clear only existing markers and point-to-point polylines
    // map.eachLayer((layer) => {
    //   if (
    //     layer instanceof L.Marker ||
    //     (layer instanceof L.Polyline && !layer.polygonId) // Avoid removing polygon layers
    //   ) {
    //     map.removeLayer(layer);
    //   }
    // });

    // Add markers for points
    pointsData.forEach((point) => {
      L.marker([point.latitude, point.longitude])
        .addTo(map)
        .bindPopup(
          `<b>${point.name}</b><br>Lat: ${point.latitude}, Lng: ${point.longitude}`
        );
    });

    // Connect nodes for points
    connectNodes(pointsData, threshold);
  }, [pointsData, map, threshold]);

  function connectNodes(points, threshold) {
    const graph = {}; // Reset the graph on each call
    const polylines = []; // Reset polylines

    for (let i = 0; i < points.length; i++) {
      if (!graph[points[i].name]) {
        graph[points[i].name] = [];
      }

      for (let j = i + 1; j < points.length; j++) {
        const distance = calculateDistance(
          points[i].latitude,
          points[i].longitude,
          points[j].latitude,
          points[j].longitude
        );

        if (distance <= threshold) {
          if (!graph[points[j].name]) {
            graph[points[j].name] = [];
          }

          graph[points[i].name].push({ name: points[j].name, distance });
          graph[points[j].name].push({ name: points[i].name, distance });

          // Create and store the polyline
          const polyline = L.polyline(
            [
              [points[i].latitude, points[i].longitude],
              [points[j].latitude, points[j].longitude],
            ],
            { color: "blue", weight: 1 }
          )
            .addTo(map)
            .bindPopup(`Distance: ${distance.toFixed(2)} meters`);

          polylines.push({
            points: [points[i].name, points[j].name],
            polyline,
          });
        }
      }
    }

    console.log("Graph of connections (node points):", graph);
  }

  return null;
};

const MapView = () => {
  const [pointsData, setPointsData] = useState([]);
  const [graph, setGraph] = useState({});
  const [threshold, setThreshold] = useState(200);
  const [polylines, setPolylines] = useState();

  const loadCsvData = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n").slice(1); // Skip header row
      const polygons = rows
        .map((row) => {
          const columns = row.split(";");
          if (columns.length === 2) {
            const polygonId = columns[0].trim();
            const coordinates = columns[1].split("@");
            const latLngs = coordinates
              .map((coord) => {
                const [lng, lat] = coord
                  .split(",")
                  .map((val) => parseFloat(val.trim()));
                return isNaN(lng) || isNaN(lat) ? null : [lat, lng];
              })
              .filter(Boolean);
            return latLngs.length ? { polygonId, latLngs } : null;
          }
          return null;
        })
        .filter(Boolean);
      setPolylines(polygons);
    };
    reader.readAsText(file);
  };

  const loadPointsCsv = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n").slice(1); // Skip header row
      const points = rows
        .map((row) => {
          const columns = row.split(";");
          if (columns.length === 2) {
            const name = columns[0].trim();
            const [latitude, longitude] = columns[1]
              .split(",")
              .map((coord) => parseFloat(coord.trim()));
            return !isNaN(latitude) && !isNaN(longitude)
              ? { name, latitude, longitude }
              : null;
          }
          return null;
        })
        .filter(Boolean);
      setPointsData(points);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <MapContainer
        id="map"
        style={{ height: "80vh", width: "100%" }}
        center={[31.59, 74.375]}
        zoom={18}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {polylines?.map((polygon, index) => (
          <Polygon key={index} positions={polygon.latLngs} color="blue">
            <Popup>{polygon.polygonId}</Popup>
          </Polygon>
        ))}

        {/* Pass data to child components */}
        <MapPoints
          pointsData={pointsData}
          threshold={threshold}
          setGraph={setGraph}
        />
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
