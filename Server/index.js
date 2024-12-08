const express = require("express");
const bodyParser = require("body-parser");
const bookMarkedLocationsRoutes = require("./routes/BookMarkedLocationsRoutes.js");
const authRoutes = require("./routes/userRoute.js");
const locationHistoryRoutes = require("./routes/locationHistoryRoutes.js");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/BookMarkedLocations", bookMarkedLocationsRoutes);
app.use("/api/locationHistory", locationHistoryRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
