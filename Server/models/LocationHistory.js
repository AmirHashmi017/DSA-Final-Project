const fs = require("fs");
const path = require("path");
const LocationHistory = require("../Classes/LocationHistory.js");

const filePath = path.join(__dirname, "../data/locationHistory.json");

const LocationHistorySchema = {
  userId: "number",
  longitude: "number",
  latitude: "number",
  timestamp: "string",
};

const validateLocation = (location) => {
  return Object.keys(LocationHistorySchema).every(
    (key) => typeof location[key] === LocationHistorySchema[key]
  );
};

const GetLocationHistory = () => {
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.map(
    (item) =>
      new LocationHistory(
        item.userId,
        item.longitude,
        item.latitude,
        item.timestamp
      )
  );
};

const saveLocationHistory = (locations) => {
  const dataToSave = locations.map((loc) => ({
    userId: loc.userId,
    longitude: loc.longitude,
    latitude: loc.latitude,
    timestamp: loc.timestamp,
  }));
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
};

module.exports = { GetLocationHistory, saveLocationHistory, validateLocation };
