const express = require("express");
const bookMarkedLocationsRoutes = require("./routes/BookMarkedLocationsRoutes.js");
const authRoutes = require("./routes/userRoute.js");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/BookMarkedLocations", bookMarkedLocationsRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
