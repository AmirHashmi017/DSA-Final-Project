const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookMarkedLocationsRoutes = require("./routes/BookMarkedLocationsRoutes.js");
const authRoutes = require("./routes/userRoute.js");
const locationHistoryRoutes = require("./routes/locationHistoryRoutes.js");
const searchedLocationsRoutes = require("./routes/SearchedLocationsRoutes.js");
const TopVisitedLocationsRoutes = require("./routes/TopVisitedLocationsRoutes.js");

const app = express();
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/BookMarkedLocations", bookMarkedLocationsRoutes);
app.use("/api/SearchedLocations", searchedLocationsRoutes);
app.use("/api/locationHistory", locationHistoryRoutes);
app.use("/api/TopVisitedLocations", TopVisitedLocationsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
