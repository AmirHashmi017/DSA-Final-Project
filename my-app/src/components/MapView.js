import React, { useEffect, useState, useContext, useRef } from "react";
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
import { AuthContext } from "../utils/AuthContext";
import { PointsData } from "./pointsData.js";
import { DeviceLocationHistoryContext } from "../utils/TrackDevicesContext.js";

let mstPolylines = [];

const {
  Node,
  height,
  balanceFactor,
  rotateLeft,
  rotateRight,
  findMinNode,
  insert,
  deleteNode,
  search,
  preOrder,
  inOrder,
  postOrder
} = require('../DataStructures/AVL Tree.js');

let sscnode=null;
let gsscnode=null;
let bholacafenode=null;

let points = PointsData;
let mapInstance = null;
// Function to set points
export function setPoints(newPoints) {
  points = newPoints;
}

// Function to set map instance
export function setMap(instance) {
  mapInstance = instance;
}
let graph = {};
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; 
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const MapPoints = ({ pointsData, threshold, setGraph }) => {
  let polylines = [];
  const {
    login,
    user,
    source,
    destination,
    setSource,
    setDestination,
    locationsMST,
    distances,
    setDistances,
    setMST,
    searchMST,
  } = useContext(AuthContext);
  const { mobileLocation } = useContext(DeviceLocationHistoryContext);

  const map = useMap();
  useEffect(() => {
    dijkstra(source, destination);
  }, [source, destination]);

  useEffect(() => {
    if (searchMST) {
      primMST(locationsMST);
      setMST(false);
    }
  }, [locationsMST, searchMST]);

  useEffect(() => {
    setView(destination);
  }, [destination]);

  useEffect(() => {
    showPointOnMap(mobileLocation);
  }, [mobileLocation]);

  useEffect(() => {
    if (pointsData.length === 0) return;

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

 

  let existingPolyline = null;

  function dijkstra(startNode, endNode) {
    if(typeof startNode !== 'undefined' && typeof endNode !== 'undefined' && startNode!==null && endNode!==null)
    {
    if(!(startNode in graph))
    {
      let IssourceFound=false;
      const sourcetemp=startNode;
      if(search(sscnode,startNode)!==null)
      {
        startNode="Student Service Center - SSC";
        IssourceFound=true;
      }
      else if(search(gsscnode,startNode)!==null)
      {
        startNode="Girls Student Services Center, UET Lahore";
        IssourceFound=true;
      }
      else if(search(bholacafenode,startNode)!==null)
      {
        startNode="Sports Cafeteria UET Lahore";
        IssourceFound=true;
      }
      if(IssourceFound)
      alert(sourcetemp+" found in "+ startNode);
      else
      alert(sourcetemp+ " Not Found");
    }
    if(!(endNode in graph))
    {
      let IsDestFound=false;
      const tempdest=endNode;
      if(search(sscnode,endNode)!==null)
        {
          endNode="Student Service Center - SSC";
          IsDestFound=true;
        }
        else if(search(gsscnode,endNode)!==null)
        {
          endNode="Girls Student Services Center, UET Lahore";
          IsDestFound=true;
        }
        else if(search(bholacafenode,endNode)!==null)
        {
          endNode="Sports Cafeteria UET Lahore";
          IsDestFound=true;
        }
        if(IsDestFound)
        alert(tempdest+" found in "+ endNode);
        else
        alert(tempdest+ " Not Found");
    }
  }
    const distances = {};
    const predecessors = {};
    const priorityQueue = new Set();

    // Set all distances to infinity and add nodes to the priority queue
    for (const node in graph) {
      distances[node] = Infinity;
      priorityQueue.add(node);
    }
    distances[startNode] = 0;

    while (priorityQueue.size > 0) {
      // Find the node with the smallest distance
      let currentNode = null;
      let smallestDistance = Infinity;

      for (const node of priorityQueue) {
        if (distances[node] < smallestDistance) {
          smallestDistance = distances[node];
          currentNode = node;
        }
      }

      // If the smallest distance is Infinity, we cannot reach further nodes
      if (currentNode === null || distances[currentNode] === Infinity) break;

      // Remove the node with the smallest distance from the queue
      priorityQueue.delete(currentNode);

      // Update distances for neighbors
      for (const neighbor of graph[currentNode]) {
        const altDistance = distances[currentNode] + neighbor.distance;

        if (altDistance < distances[neighbor.name]) {
          distances[neighbor.name] = altDistance;
          predecessors[neighbor.name] = currentNode;
        }
      }

      // Stop if we reach the endNode
      if (currentNode === endNode) break;
    }

    // Reconstruct the shortest path
    const path = [];
    let currentNode = endNode;

    while (currentNode !== undefined) {
      path.unshift(currentNode);
      currentNode = predecessors[currentNode];
    }

    if (existingPolyline) {
      existingPolyline.remove();
    }

    if (path.length > 1) {
      const newPolylines = [];
      for (let i = 0; i < path.length - 1; i++) {
        const startPoint = points.find((p) => p.name === path[i]);
        const endPoint = points.find((p) => p.name === path[i + 1]);
        if (startPoint && endPoint) {
          const polyline = L.polyline(
            [
              [startPoint.latitude, startPoint.longitude],
              [endPoint.latitude, endPoint.longitude],
            ],
            { color: "red", weight: 5 } 
          )
            .addTo(map)
            .bindPopup(`Shortest Path: ${path[i]} → ${path[i + 1]}`); 
          newPolylines.push(polyline);
        }
      }
      existingPolyline = L.layerGroup(newPolylines).addTo(map);
    }

    setDistances(distances[endNode]);
    return {
      path,
      distance: distances[endNode],
    };
  }

  function primMST(nodesToVisit) {
    const subGraph = {};
    const mstEdges = [];
    const visited = new Set();
    const priorityQueue = [];

    // Step 1: Build the subGraph
    for (const node of nodesToVisit) {
      if (graph[node]) {
        subGraph[node] = graph[node].filter((neighbor) =>
          nodesToVisit.includes(neighbor.name)
        );
      } else {
        console.warn(`Node ${node} not found in the graph.`);
      }
    }

    const startNode = nodesToVisit[0];
    visited.add(startNode);

    if (subGraph[startNode]) {
      for (const neighbor of subGraph[startNode]) {
        priorityQueue.push({
          from: startNode,
          to: neighbor.name,
          weight: neighbor.distance,
        });
      }
    }
    priorityQueue.sort((a, b) => a.weight - b.weight);

    // Step 3: Build the MST
    while (
      mstEdges.length < nodesToVisit.length - 1 &&
      priorityQueue.length > 0
    ) {
      const { from, to, weight } = priorityQueue.shift();

      if (visited.has(to)) continue;

      mstEdges.push({ from, to, weight });
      visited.add(to);

      if (subGraph[to]) {
        for (const neighbor of subGraph[to]) {
          if (!visited.has(neighbor.name)) {
            priorityQueue.push({
              from: to,
              to: neighbor.name,
              weight: neighbor.distance,
            });
          }
        }
      }
      priorityQueue.sort((a, b) => a.weight - b.weight);
    }

    // Step 4: Calculate the total weight of the MST
    const totalWeight = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);

    mstEdges.forEach((edge) => {
      const startPoint = points.find((p) => p.name === edge.from);
      const endPoint = points.find((p) => p.name === edge.to);

      if (startPoint && endPoint) {
        L.polyline(
          [
            [startPoint.latitude, startPoint.longitude],
            [endPoint.latitude, endPoint.longitude],
          ],
          { color: "green", weight: 5 } // Define the MST line color and thickness
        )
          .addTo(map)
          .bindPopup(
            `MST Edge: ${edge.from} → ${edge.to} (Weight: ${edge.weight})`
          );
      }
    });

    return { mstEdges, totalWeight };
  }

  function setView() {
    if (!pointsData || !destination) {
      return;
    }

    const selectedLocation = pointsData.find(
      (location) =>
        location.name.toLowerCase().trim() === destination.toLowerCase()
    );

    if (selectedLocation) {
      const latitude = selectedLocation.latitude;
      const longitude = selectedLocation.longitude;

      if (latitude && longitude) {
        map.setView([latitude, longitude], 20); 
      } else {
        console.log("Latitude or longitude is missing");
      }
    } else {
      console.log("Location not found");
    }
  }

  function showPointOnMap(deviceLocation) {
    const latitude = deviceLocation?.latitude;
    const longitude = deviceLocation?.longitude;
    const pointName = deviceLocation?.deviceName;
    if (!latitude || !longitude || !pointName) {
      console.log("Latitude, longitude, or point name is missing");
      return;
    }

    const marker = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`<b>${pointName}</b><br>Lat: ${latitude}, Lng: ${longitude}`);
    map.setView([latitude, longitude], 20);
  }

  function connectNodes(points, threshold) {
    const polylines = []; 

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
        }
      }
    }
    CreateAVLTree();
    return null; 
  }
  function CreateAVLTree()
  {
    sscnode=null;
    gsscnode=null;
    bholacafenode=null;
    sscnode = new Node("Student Service Center - SSC");
    gsscnode = new Node("Girls Student Services Center, UET Lahore");
    bholacafenode = new Node("Sports Cafeteria UET Lahore");

    // Create the initial nodes
sscnode = new Node("Student Service Center - SSC");
gsscnode = new Node("Girls Student Services Center, UET Lahore");
bholacafenode = new Node("Sports Cafeteria UET Lahore");

// Add 5 places under SSC Node
sscnode = insert(sscnode, "Khalid Photocopy");
sscnode = insert(sscnode, "Tanvir Composing");
sscnode = insert(sscnode, "Madina General Store");
sscnode = insert(sscnode, "General Store & Stationary");
sscnode = insert(sscnode, "SSC Juice Corner");
sscnode = insert(sscnode, "Amjad Restaurant");
sscnode = insert(sscnode, "NonStop Fast Food");
sscnode = insert(sscnode, "Shehbaaz Dahibhale");
sscnode = insert(sscnode, "Zahoor Samosa");
sscnode = insert(sscnode, "Delight IceCream");

// Add 5 places under GSSC Node
gsscnode = insert(gsscnode, "Star Photocopy");
gsscnode = insert(gsscnode, "Rajab General Store");
gsscnode = insert(gsscnode, "Ishaq Fruite Juice");
gsscnode = insert(gsscnode, "Bombay Biryani");
gsscnode = insert(gsscnode, "Italian Fast Food");
gsscnode = insert(gsscnode, "Farooq Samosa");
gsscnode = insert(gsscnode, "Taste IceCream");

// Add 5 places under Bhola Cafe Node
bholacafenode = insert(bholacafenode, "Azam Bro Canteen");
bholacafenode = insert(bholacafenode, "Bhola Juice Corner");
bholacafenode = insert(bholacafenode, "Sheikh Samosa");
bholacafenode = insert(bholacafenode, "Cold IceCream");
bholacafenode = insert(bholacafenode, "Bhola Canteen");




  }
};

export const MapView = () => {
  // const map=useMap()
  const [pointsData, setPointsData] = useState([]);
  const [graph, setGraph] = useState({});
  const [threshold, setThreshold] = useState(500);
  const [polylines, setPolylines] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const { setDestination, setSource, destination, source } =
    useContext(AuthContext);
  const { setMobileLocation } = useContext(DeviceLocationHistoryContext);
  // const clearPolylinesRef = useRef(null);
  let file = [];
  const loadCsvData = async () => {
    // Fetch the CSV file
    const fileData = await fetch("/coordinatesMain.csv")
      .then((response) => response.text())
      .catch((error) => console.error("Error fetching CSV:", error));

    // Process the CSV data
    const rows = fileData.split("\n").slice(1); // Skip header row
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

    // Update the state with the parsed data
    setPolylines(polygons);
  };
  useEffect(() => {
    loadPointsCsv();
    loadCsvData();
  }, []);

  useEffect(() => {
    loadPointsCsv();
  }, [renderKey]);

  const loadPointsCsv = (file) => {
    setPointsData(PointsData);
  };

  const handleClearMap = () => {
    setMobileLocation(null);
    setPointsData([]); 
    setRenderKey((prevKey) => prevKey + 1); 
    setSource(null);
    setDestination(null);
    setPoints(PointsData);
  };

  return (
    <div>
      <MapContainer
        key={renderKey}
        id="map"
        style={{ height: "80vh", width: "100%" }}
        center={[31.578532989784815, 74.35845342205458]}
        zoom={18}
      >
        {polylines?.map((polygon, index) => (
          <Polygon key={index} positions={polygon.latLngs} color="blue">
            <Popup>{polygon.polygonId}</Popup>
          </Polygon>
        ))}
        <MapPoints
          pointsData={pointsData}
          threshold={threshold}
          setGraph={setGraph}
        />
      </MapContainer>

      <button
        className="absolute top-2 right-10 bg-blue-500 px-4 py-2 text-white rounded-md"
        onClick={handleClearMap}
      >
        Clear Map Data
      </button>
    </div>
  );
};

export default MapView;
