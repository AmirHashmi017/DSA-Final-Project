const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors package
const app = express();
const port = 3000;

// Enable CORS for all routes and origins (you can restrict origins if needed)
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive location data
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Log the received location
    console.log(`Received location - Latitude: ${latitude}, Longitude: ${longitude}`);

    // Send a response back to the client
    res.json({ message: 'Location received successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
