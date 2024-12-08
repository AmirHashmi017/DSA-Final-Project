const express = require("express");
const bookMarkedLocationsRoutes = require("./routes/BookMarkedLocationsRoutes.js");
const authRoutes = require("./routes/userRoute.js");
const locationHistoryRoutes = require("./routes/locationHistoryRoutes.js");
const searchedLocationsRoutes = require("./routes/SearchedLocationsRoutes.js");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/BookMarkedLocations", bookMarkedLocationsRoutes);
app.use("/api/SearchedLocations", searchedLocationsRoutes);
app.use("/api/locationHistory", locationHistoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
