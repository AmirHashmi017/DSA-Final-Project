import React, { useEffect, useState,useContext } from "react";
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
import { AuthContext } from '../utils/AuthContext';
import {pointsData} from './pointsData.js'
import { PriorityQueue } from "../DataStructures/PriorityQueue.js";
let mstPolylines = [];

let points = pointsData;
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

<<<<<<< HEAD
const MapPoints = ({ pointsData, threshold, setGraph }) => {
  const map = useMap();
=======
export const MapPoints = ({ pointsData, threshold ,setGraph}) => {
  
  let polylines = [];
  const { login,user,source,destination,setSource,setDestination,locationsMST,setMST,searchMST,distances,setDistances } = useContext(AuthContext);
  console.log(source,destination)
  const map = useMap();
   useEffect(() => {
     dijkstra(source, destination); 


   }, [source,destination]);
   useEffect(() => {
     if (searchMST) {
       primMST(locationsMST);
       console.log("agya")
      setMST(false);
    }
  }, [locationsMST, searchMST]);
  

   useEffect(() => {
    setView(destination); 


  }, [destination]);



>>>>>>> 28ed2dd84ed0c05541411f3245b50b1943ab88f2
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

//   function dijkstra(startNode, endNode) {

//     if (!startNode) {
//       throw new Error(`Start node "${startNode}" does not exist in the graph`);
//   }
  
//   if (!endNode) {
//       throw new Error(`End node "${endNode}" does not exist in the graph`);
//   }
//   if(startNode!=""  && endNode!="")
//   {
//     const distances = {}; // Track the shortest known distances to each node
//     const predecessors = {}; // Track the shortest path
//     const priorityQueue = new PriorityQueue(); // Initialize the priority queue

//     // Initialize distances
//     for (const node in graph) {
//         distances[node] = Infinity;
//     }
//     distances[startNode] = 0;

//     // Enqueue the start node
//     priorityQueue.Enqueue(startNode, 0);

//     while (!priorityQueue.IsEmpty()) {
//         const dequeued = priorityQueue.Dequeue();

//         // Handle case where dequeued is null
//         if (!dequeued || !dequeued.data) {
//             console.warn("Dequeued item is null or invalid:", dequeued);
//             continue;
//         }

//         const { data: currentNode } = dequeued;

//         // Process neighbors
//         for (const neighbor of graph[currentNode] || []) {
//             const { name: neighborNode, distance: edgeWeight } = neighbor;

//             // Calculate new distance
//             const newDistance = distances[currentNode] + edgeWeight;

//             if (newDistance < distances[neighborNode]) {
//                 distances[neighborNode] = newDistance;
//                 predecessors[neighborNode] = currentNode;
//                 priorityQueue.Enqueue(neighborNode, newDistance); // Use newDistance as priority
//             }
//         }

//         // Exit early if we've reached the target node
//         if (currentNode === endNode) {
//             break;
//         }
//     }

//     // Reconstruct the shortest path
//     const path = [];
//     let currentNode = endNode;

//     while (currentNode !== undefined) {
//         path.unshift(currentNode);
//         currentNode = predecessors[currentNode];
//     }

//     // If the startNode isn't in the path, it means no path exists
//     if (path[0] !== startNode) {
//         return {
//             path: [],
//             distance: Infinity, // No path exists
//         };
//     }

//     return {
//         path, // The reconstructed path
//         distance: distances[endNode], // Total distance to endNode
//     };
// }
//   }
  

    function dijkstra(startNode, endNode){
 
    // const map = useMap(); 
   // Initialize distances and predecessors
   console.log("Global Graph:", graph);
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
   polylines = [];
   
   // Draw the shortest path on the map
   if (path.length > 1) {
    polylines.forEach((polyline) => {
      polyline.remove();
    });
     for (let i = 0; i < path.length - 1; i++) {
   
       const startPoint = points.find((p) => p.name === path[i]);
       const endPoint = points.find((p) => p.name === path[i + 1]);
       console.log("Path",path,startPoint,endPoint,)
       if (startPoint && endPoint) {
         // Draw the polyline for the shortest path
         const polyline =  L.polyline(
           [
             [startPoint.latitude, startPoint.longitude],
             [endPoint.latitude, endPoint.longitude],
           ],
           { color: "red", weight: 5 } // Define the line's appearance
         )
           .addTo(map)
           .bindPopup(`Shortest Path: ${path[i]} → ${path[i + 1]}`); // Bind a popup for the line segment
           console.log(`Shortest Path: ${path[i]} → ${path[i + 1]}`)
           polylines.push(polyline);
       }
     }
   }
  
   // Ensure the function also computes and returns the path and its total distance
   console.log('distances',distances[endNode])
   setDistances(distances[endNode])
   return {
     path,
     distance: distances[endNode],
   };
  }

<<<<<<< HEAD
  return null;
};
=======
  function primMST(nodesToVisit) {
    const subGraph = {};
    const mstEdges = [];
    const visited = new Set();
    const priorityQueue = [];
  
    // Step 1: Build the subGraph
    for (const node of nodesToVisit) {
      if (graph[node]) {
        subGraph[node] = graph[node].filter(neighbor =>
          nodesToVisit.includes(neighbor.name)
        );
      } else {
        console.warn(`Node ${node} not found in the graph.`);
      }
    }
    console.log("Constructed subGraph:", subGraph);
  
    // Step 2: Initialize MST with the first node
    const startNode = nodesToVisit[0];
    visited.add(startNode);
  
    // Add edges of the start node to the priority queue
    if (subGraph[startNode]) {
      for (const neighbor of subGraph[startNode]) {
        priorityQueue.push({ from: startNode, to: neighbor.name, weight: neighbor.distance });
      }
    }
    priorityQueue.sort((a, b) => a.weight - b.weight);
    console.log("Initial Priority Queue:", priorityQueue);
  
    // Step 3: Build the MST
    while (mstEdges.length < nodesToVisit.length - 1 && priorityQueue.length > 0) {
      const { from, to, weight } = priorityQueue.shift();
  
      if (visited.has(to)) continue;
  
      mstEdges.push({ from, to, weight });
      visited.add(to);
  
      console.log("MST Edges So Far:", mstEdges);
      console.log("Visited Nodes:", visited);
  
      if (subGraph[to]) {
        for (const neighbor of subGraph[to]) {
          if (!visited.has(neighbor.name)) {
            priorityQueue.push({ from: to, to: neighbor.name, weight: neighbor.distance });
          }
        }
      }
      priorityQueue.sort((a, b) => a.weight - b.weight);
    }
  
    // Step 4: Calculate the total weight of the MST
    const totalWeight = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
    console.log("Final MST Edges:", mstEdges);
    console.log("Total Weight:", totalWeight);
  
    mstEdges.forEach(edge => {
      const startPoint = points.find(p => p.name === edge.from);
      const endPoint = points.find(p => p.name === edge.to);
  
      if (startPoint && endPoint) {
        L.polyline(
          [
            [startPoint.latitude, startPoint.longitude],
            [endPoint.latitude, endPoint.longitude],
          ],
          { color: "green", weight: 5 } // Define the MST line color and thickness
        )
          .addTo(map)
          .bindPopup(`MST Edge: ${edge.from} → ${edge.to} (Weight: ${edge.weight})`);
      }
    });
>>>>>>> 28ed2dd84ed0c05541411f3245b50b1943ab88f2

    return { mstEdges, totalWeight };
  }
  
  

  
  function setView(){
    const selectedLocation = pointsData.find(
      (location) => location.name.toLowerCase().trim() === destination.toLowerCase()
    );
    console.log(selectedLocation)
    if (selectedLocation) {
      const latitude=selectedLocation.latitude;
      const longitude=selectedLocation.longitude;


      if (latitude && longitude ) {
        map.setView([latitude, longitude], 20); // Set the map view based on the coordinates
      }
    } else {
      console.log("Location not found");
    }
  }
  // function connectNodes(points, threshold) {
  //   const polylines = []; // Reset polylines
  //   const graph = {}; // Reset the graph
  
  //   const maxRequests = 5; // Max simultaneous requests at a time
  //   let requestCount = 0;  // Track active requests
  //   const delayTime = 500; // Delay between requests (in milliseconds)
  
  //   // Function to process routes with a delay
  //   function processRoutes(startIndex, endIndex) {
  //     if (startIndex >= points.length) return; // Exit if all points are processed
  
  //     const startPoint = points[startIndex];
  //     if (!graph[startPoint.name]) {
  //       graph[startPoint.name] = [];
  //     }
  
  //     const endPoint = points[endIndex];
  //     const distance = calculateDistance(startPoint, endPoint);
  //     if (distance > threshold) return; // Skip if distance exceeds threshold
  
  //     // Use Leaflet Routing Machine to calculate the distance between points
  //     const routeControl = L.Routing.control({
  //       waypoints: [
  //         L.latLng(startPoint.latitude, startPoint.longitude),
  //         L.latLng(endPoint.latitude, endPoint.longitude),
  //       ],
  //       routeWhileDragging: false,
  //       createMarker: function() { return null; }, // Disable markers
  //     }).on('routesfound', function(e) {
  //       const route = e.routes[0];
  //       const routeDistance = route.summary.totalDistance; // Distance in meters
  
  //       // If the distance is less than or equal to the threshold, add to the graph
  //       if (routeDistance <= threshold) {
  //         graph[startPoint.name].push({ name: endPoint.name, distance: routeDistance });
  //         graph[endPoint.name].push({ name: startPoint.name, distance: routeDistance });
  
  //         // Create and store the polyline on the map
  //         const polyline = L.Routing.line(route).addTo(map);
  //         polylines.push({
  //           points: [startPoint.name, endPoint.name],
  //           polyline,
  //         });
  //       }
  
  //       requestCount--; // Decrease active request count
  //     }).addTo(map); // Add routing control to the map for calculating routes
  
  //     requestCount++; // Increase active request count
  
  //     // If too many requests are running, add a delay before processing the next one
  //     if (requestCount >= maxRequests) {
  //       setTimeout(() => {
  //         processRoutes(startIndex, endIndex + 1);
  //       }, delayTime);
  //     } else {
  //       processRoutes(startIndex, endIndex + 1);
  //     }
  //   }
  
  //   // Loop through each pair of points
  //   for (let i = 0; i < points.length; i++) {
  //     for (let j = i + 1; j < points.length; j++) {
  //       // Delay next call if there are too many ongoing requests
  //       if (requestCount < maxRequests) {
  //         processRoutes(i, j);
  //       } else {
  //         setTimeout(() => {
  //           processRoutes(i, j);
  //         }, delayTime); // Delay next request if max request limit reached
  //       }
  //     }
  //   }
  // }
  
  // // Dummy function to calculate distance between two points (could be replaced with a more efficient method)
  // function calculateDistance(point1, point2) {
  //   const lat1 = point1.latitude;
  //   const lon1 = point1.longitude;
  //   const lat2 = point2.latitude;
  //   const lon2 = point2.longitude;
  
  //   const R = 6371; // Earth's radius in km
  //   const dLat = (lat2 - lat1) * Math.PI / 180;
  //   const dLon = (lon2 - lon1) * Math.PI / 180;
  //   const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //             Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  //             Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  //   const distance = R * c * 1000; // Distance in meters
  //   return distance;
  // }
  
  
  
   function connectNodes(points, threshold) {
//     // Reset the graph on each call
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
          // const polyline = L.polyline(
          //   [
          //     [points[i].latitude, points[i].longitude],
          //     [points[j].latitude, points[j].longitude],
          //   ],
           //   { color: "blue", weight: 1 }
        // )
         //    .addTo(map)
        //   // .bindPopup(`Distance: ${distance.toFixed(2)} meters`);

          // polylines.push({
            //   points: [points[i].name, points[j].name],
            //   polyline,
            // });
          }
       }
  
  
      }
  
    //  console.log("Graph of connections (node points):", graph);
    //  const nodesToVisit = ["Tariq Hall","Department of Chemistry UET Lahore" ,"Annexe Ground","Khalid Hall","Secret Wall UET Lahore"];
    //  const result = primMST(nodesToVisit);
     
    //  console.log("MST Edges:", result.mstEdges);
    //  console.log("Total Weight:", result.totalWeight);
  
     return null; // This component doesn't render anything itself
   };


}


export const MapView = () => {
  // const map=useMap()
  const [pointsData, setPointsData] = useState([]);
  const [graph, setGraph] = useState({});
  const [threshold, setThreshold] = useState(500);
  const [polylines, setPolylines] = useState();
  let file=[]
  const loadCsvData = async () => {
    // Fetch the CSV file
    const fileData = await fetch('/coordinatesMain.csv')
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
  const loadPointsCsv = (file) => {
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   const csvData = event.target.result;
    //   const rows = csvData.split("\n").slice(1); // Skip header row
    //   const points = rows
    //     .map((row) => {
    //       const columns = row.split(";");
    //       if (columns.length === 2) {
    //         const name = columns[0].trim();
    //         const [latitude, longitude] = columns[1]
    //           .split(",")
    //           .map((coord) => parseFloat(coord.trim()));
    //         return !isNaN(latitude) && !isNaN(longitude)
    //           ? { name, latitude, longitude }
    //           : null;
    //       }
    //       return null;
    //     })
    //     .filter(Boolean);
    //   setPointsData(points);
    // };
    // reader.readAsText(file);
    const points = [
      {name:"Civil Engineering Department, UET Lahore",latitude:31.579069019634254,longitude: 74.35703661351242},
      {name:"Al-Khawarizmi Institute of Computer Science",latitude:31.57807108217065,longitude: 74.35786330238952},
      {name:"Environmental engineering department uet Lahore",latitude:31.577497148974047,longitude: 74.3569819290696},
      {name:"Research Centre",latitude:31.577201274011752, longitude:74.35702738186762},
      {name:"Students Parking",latitude:31.578004715752957, longitude:74.35701556261752},
      {name:"CS Lecture Theatres",latitude:31.578528125883047, longitude:74.35701030091131},
      {name:"Department of Computer Science-UET Lahore",latitude:31.578574544681672,longitude: 74.35741383558134},
      {name:"Department Of Mathematics",latitude:31.578532371812532, longitude:74.35789338487183},
      {name:"National Library of Engineering Sciences",latitude:31.578624808254872, longitude:74.35618216789373},
      {name:"Department of Electrical Engineering",latitude:31.577305025677024,longitude: 74.35622873477634},
      {name:"IET On Campus UET Lahore",latitude:31.577242752100556,longitude: 74.3560510501543},
      {name:"PSSR Lab, UET",latitude:31.577068162469686, longitude:74.35594944729972},
      {name:"Solar Park",latitude:31.576979303956406, longitude:74.35476076736806},
      {name:"Admininstration Block, UET",latitude:31.577051283763375,longitude: 74.35486805571905},
      {name:"VC Office, UET",latitude:31.577145010740505, longitude:74.35541699845326},
      {name:"UET Science Society",latitude:31.57751543794044, longitude:74.35468262774447},
      {name:"Laser and Optonics Center(LOC)",latitude:31.577583989744554, longitude:74.35481003266126},
      {name:"Department of Product & Industrial Design",latitude:31.577609662354618,longitude: 74.355105629242},
      {name:"Islamic Studies Department",latitude:31.577977038869825, longitude:74.35523556533089},
      {name:"University Mosque",latitude:31.578409770863242, longitude:74.35472710331986},
      {name:"Jamia Masjid UET",latitude:31.578561174388906, longitude:74.35460207343438},
      {name:"HBL Bank ATM",latitude:31.57877707990301, longitude:74.35613738881368},
      {name:"School of Architecture and Design UET Lahore",latitude:31.57911850070515, longitude:74.35592454337933},
      {name:"City & Regional Planning Department UET Lahore",latitude:31.579183305429375, longitude:74.3555046451654},
      {name:"UET Lhr Bus Stand",latitude:31.579145178425833, longitude:74.35415242077053},
      {name:"Transport Office",latitude:31.5791763294434, longitude:74.35456337360775},
      {name:"UET Football Ground",latitude:31.580040413433995, longitude:74.35450745466368},
      {name:"Junaid Jamshed Cricket Stadium",latitude:31.582080772559223, longitude:74.35529119269741},
      {name:"UET Sports Auditorium",latitude:31.581220911715093, longitude:74.35315421497486},
      {name:"Data Center",latitude:31.58151450630629, longitude:74.35309155386318},
      {name:"Sports Cafeteria UET Lahore",latitude:31.580671362180244,longitude: 74.35409150679136},
      {name:"University Gym",latitude:31.581313669522835, longitude:74.35368938887083},
      {name:"UET Swimming Pool",latitude:31.581237197909378, longitude:74.35406254101632},
      {name:"Sports Complex, UET Lahore",latitude:31.581430969085318,longitude: 74.3537257440146},
      {name:"Tennis Court",latitude:31.581606565902717, longitude:74.35370762316009},
      {name:"UET Basketball Court",latitude:31.581672068760913, longitude:74.35418629607034},
      {name:"Department of Humanities, Social Sciences and Languages",latitude:31.580528517287217, longitude:74.35551423155347},
      {name:"Seminar Hall - Chemical Engineering Department",latitude:31.580275891346165,longitude: 74.35609679983634},
      {name:"Chemical Engineering Department",latitude:31.580653721552498, longitude:74.35625610249917},
      {name:"Seminar Hall - Chemical Engineering Department",latitude:31.58027458120419, longitude:74.35610775259359},
      {name:"Department of Metallurgical and Materials Engineering, UET Lahore",latitude:31.57995862973149,longitude: 74.35580281113258},
      {name:"UET Gate number 3",latitude:31.576862126774163, longitude:74.35672486821832},
      {name:"Habib Bank Limited (HBL)",latitude:31.57660740739352, longitude:74.35481400642674},
      {name:"UBL - UET Branch",latitude:31.576777558824244, longitude:74.35531039328008},
      {name:"IBM UET",latitude:31.57827293259108, longitude:74.35370150949024},
      {name:"IQBAL Hall-UET Lahore",latitude:31.58220597892841,longitude: 74.3520640209083},
      {name:"Sir Syed Hall",latitude:31.582083734238005, longitude:74.35091737657743},
      {name:"Iqbal Hall Canteen",latitude:31.581564420524895, longitude:74.35166829444029},
      {name:"Iqbal Hall Saloon",latitude:31.581555280677573, longitude:74.35161465026107},
      {name:"Iqbal Hall Juice Bar",latitude:31.581457027261532, longitude:74.35166561223673},
      {name:"Liaquat Hall",latitude:31.581195398476492, longitude:74.35240053749209},
      {name:"Iqbal Hall Laundary Service",latitude:31.58147736754145, longitude:74.35132858159967},
      {name:"Iqbal Hall Badminton Court",latitude:31.581258010752244, longitude:74.35134601595436},
      {name:"Quaid-e-Azam Hall UET Lahore",latitude:31.581031798521764, longitude:74.35118307175686},
      {name:"Quaid-e-Azam Hall/Q Hall Canteen",latitude:31.580950396260256, longitude:74.35068149867588},
      {name:"Q Hall Milk & Juice Shop",latitude:31.580912694135943, longitude:74.35067948701918},
      {name:"Hostel Management Cell (HMC), UET",latitude:31.580720952193946,longitude: 74.3514569567453},
      {name:"Mumtaz Hall",latitude:31.580558718302818, longitude:74.35195450650758},
      {name:"Zubair Hall Canteen",latitude:31.58004802244065, longitude:74.35156960952192},
      {name:"Faculty Hostel",latitude:31.5801422785943, longitude:74.35311322080042},
      {name:"Zubair Hall",latitude:31.579685278157875, longitude:74.35227637160455},
      {name:"Shopping Center",latitude:31.579785818429574, longitude:74.35315613614777},
      {name:"Imamia Masjid Zubair Hall",latitude:31.579597305300886,longitude: 74.35190890896946},
      {name:"Cutting Shop",latitude:31.579460204603627, longitude:74.35188745129777},
      {name:"Sultan Mehmood Ghaznavi Hall",latitude:31.57932310369841, longitude:74.35289864407581},
      {name:"Muhammad Bin Qasim Hall",latitude:31.579245413099486, longitude:74.35213689673085},
      {name:"Abdul Sattar Edhi Hostel Play Ground",latitude:31.579016910962665,longitude: 74.3517747985211},
      {name:"High Five adventure Club",latitude:31.57879983341314, longitude:74.3531963692708},
      {name:"Student Service Center - SSC",latitude:31.57883639387783,longitude: 74.3530515299869},
      {name:"Tariq Hall",latitude:31.578621600942462, longitude:74.35255800353806},
      {name:"Khalid Hall",latitude:31.578543909758846, longitude:74.35189281571569},
      {name:"Old UET Mosque",latitude:31.578598750596985,longitude: 74.3514556156522},
      {name:"Ali Mardan Hall",latitude:31.57817601826349, longitude:74.35143684019079},
      {name:"BasketBall Court",latitude:31.578045770619823, longitude:74.35187135804249},
      {name:"Annexe Ground",latitude:31.578057195859014, longitude:74.35233001577484},
      {name:"Producer director office Building",latitude:31.578064051000727,longitude: 74.3541646467245},
      {name:"Works Department UET",latitude:31.57783326091467, longitude:74.35416196451553},
      {name:"Star Photocopy Shop",latitude:31.577650456468895, longitude:74.35421292647948},
      {name:"Graveyard",latitude:31.577504212663488, longitude:74.35376499758299},
      {name:"Automotive Engineering Center",latitude:31.577447086114688,longitude: 74.35304080116347},
      {name:"Darbar-e-Mujaddadi",latitude:31.5773099822509, longitude:74.35419951543531},
      {name:"Customize Wrestling Belts",latitude:31.576987787381363, longitude:74.35433899030504},
      {name:"National Museum of Science & Technology",latitude:31.576505635538787, longitude:74.35345922576002},
      {name:"Center of Excellence in Water Resources",latitude:31.57657647316951,longitude: 74.35209666360777},
      {name:"Department of Chemistry UET Lahore",latitude:31.577335117972794,longitude: 74.35233538019858},
      {name:"Secret Wall UET Lahore",latitude:31.57721629449639, longitude:74.35204033721286},
      {name:"Annexe Panga Shake Shop Ice Cream",latitude:31.577239145176694, longitude:74.35151462425647},
      {name:"Software Engineering Centre",latitude:31.578532989784815, longitude:74.35845342205458},
      {name:"Auditorium Complex",latitude:31.578213365866436, longitude:74.35916234885688},
      {name:"Department of Mechanical Engineering",latitude:31.57793988705786, longitude:74.35845662491299},
      {name:"Department of Mechatronics and Control Engineering",latitude:31.57751943680011,longitude: 74.35856927769514},
      {name:"Ground",latitude:31.577784503485454, longitude:74.35943294898925},
      {name:"Ayesha Hall Girls Hostel.",latitude:31.578860372788938,longitude: 74.36020156021868},
      {name:"Main Block - Physics Department",latitude:31.578126544583647, longitude:74.35993844932673},
      {name:"Old Mechanical Dept. UET",latitude:31.577995551012148, longitude:74.35998238115661},
      {name:"UET Power House",latitude:31.577835767390912,longitude: 74.36061601332679},
      {name:"Cricket Ground UET",latitude:31.57828899350485,longitude: 74.36149182116054},
      {name:"Visiting Faculty Hostel",latitude:31.579275864854143,longitude: 74.35930550338462},
      {name:"Khadija Hall (Jannat)",latitude:31.579418232561707,longitude: 74.35988683425488},
      {name:"Bachelors Faculty Hostel",latitude:31.57930824933636,longitude: 74.36094713492295},
      {name:"Yasir Food and Tuck Shop",latitude:31.579202474529463,longitude: 74.35795636698715},
      {name:"Girls Student Services Center, UET Lahore",latitude:31.57914077897932,longitude: 74.35835065169292},
      {name:"GSSC",latitude:31.579373850843425,longitude: 74.35828359647086},
      {name:"Mining Engineering Departmental Library",latitude:31.580331267407303,longitude: 74.35739042087107},
      {name:"University of Engineering and Technology (UET), Lahore",latitude:31.580182742812415,longitude: 74.3569505386143},
      {name:"Petroleum and Gas Engineering Department",latitude:31.579972522981215,longitude: 74.35731263681348},
      {name:"Zohra Hall (Girl's Hostel)",latitude:31.582246540776758,longitude: 74.35716945872485},
      {name:"Staff Colony Masjid",latitude:31.582641835432796,longitude: 74.35697365747416},
      ];
  
    setPointsData(points);
  };
  
  return (
    <div>
      <MapContainer
        id="map"
        style={{ height: "80vh", width: "100%" }}
        center={[31.59, 74.375]}
        zoom={18}
      >
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

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

      {/* <input
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
      </div> */}
    </div>
  );

};

export default MapView;
