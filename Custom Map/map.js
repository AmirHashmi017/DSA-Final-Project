// Original geographical coordinates (latitude, longitude in degrees)
const locations = {
    "KICS": { lat: 31.578098, long: 74.357845 },
    "Lecture Theater": { lat: 31.57852412330019, long: 74.35699900904916 },
    "Computer Dept": { lat: 31.57855623079668, long: 74.35741598660987 },
    "Library": { lat: 31.5786034062698, long: 74.35604694551823 }
};
// Distances between nodes in meters (realistic)
const graph = {
    "KICS": [
        { neighbor: "Lecture Theater", distance: 321.98 },
        { neighbor: "Library", distance: 267.36}
    ],
    "Lecture Theater": [
        { neighbor: "KICS", distance: 321.98 },
        { neighbor: "Library", distance: 130.91 },
        { neighbor: "Computer Dept", distance: 82.14}
    ],
    "Computer Dept": [
        { neighbor: "Lecture Theater", distance: 82.14}
    ],
    "Library": [
        { neighbor: "Lecture Theater", distance: 130.91 },
        { neighbor: "KICS", distance: 267.36 }
    ]
};

// Canvas dimensions
const canvasWidth = 800;
const canvasHeight = 600;

// Scaling factors for display
let scaleFactors;

// Compute scaling factors dynamically to fit the map within the canvas
function computeScalingFactors() {
    const latitudes = Object.values(locations).map(loc => loc.lat);
    const longitudes = Object.values(locations).map(loc => loc.long);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLong = Math.min(...longitudes);
    const maxLong = Math.max(...longitudes);

    const latRange = maxLat - minLat;
    const longRange = maxLong - minLong;

    // Reserve some padding
    const padding = 50;

    const xScale = (canvasWidth - padding * 2) / longRange;
    const yScale = (canvasHeight - padding * 2) / latRange;

    return { minLat, minLong, xScale, yScale, padding };
}

// Convert geographical coordinates to scaled canvas coordinates
function toCanvasCoords(lat, long) {
    const { minLat, minLong, xScale, yScale, padding } = scaleFactors;
    const x = padding + (long - minLong) * xScale;
    const y = canvasHeight - padding - (lat - minLat) * yScale; // Flip y-axis
    return { x, y };
}

// Draw the map on the canvas
function drawMap() {
    const canvas = document.getElementById("map");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Convert locations to canvas coordinates
    const canvasLocations = {};
    Object.entries(locations).forEach(([name, coords]) => {
        canvasLocations[name] = toCanvasCoords(coords.lat, coords.long);
    });

    // Draw edges with turns
    Object.keys(graph).forEach(node => {
        const { x: x1, y: y1 } = canvasLocations[node];
        graph[node].forEach(edge => {
            const { neighbor, distance, turns } = edge;
            const { x: x2, y: y2 } = canvasLocations[neighbor];

            ctx.beginPath();
            ctx.moveTo(x1, y1);

            // If there are turns, add them to the path
            if (turns) {
                turns.forEach(turn => {
                    const { x, y } = toCanvasCoords(turn.lat, turn.long);
                    ctx.lineTo(x, y);
                });
            }

            // Final segment to the destination
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Draw distance on the edge
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            ctx.fillText(`${distance}m`, midX, midY);
        });
    });

    // Draw nodes
    Object.entries(canvasLocations).forEach(([name, coords]) => {
        const { x, y } = coords;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.fillText(name, x + 12, y);
    });
}

// Initialize and draw map
function initialize() {
    // Set up canvas element
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = '<canvas id="map" width="800" height="600"></canvas>';

    // Compute scale factors
    scaleFactors = computeScalingFactors();

    // Draw the map
    drawMap();
}

window.onload = initialize;
