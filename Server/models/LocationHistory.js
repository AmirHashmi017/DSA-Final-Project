const fs = require("fs").promises;
const path = require("path");
const LocationHistory = require("../Classes/LocationHistory.js");

const filePath = path.join(__dirname, "../data/locationHistory.json");

const LocationHistorySchema = {
  userId: "number",
  longitude: "number",
  latitude: "number",
  timestamp: "string",
  deviceName: "string",
};

const validateLocation = (location) => {
  return Object.keys(LocationHistorySchema).every(
    (key) => typeof location[key] === LocationHistorySchema[key]
  );
};

const GetLocationHistory = async () => {
  const data = await fs.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.map(
    (item) =>
      new LocationHistory(
        item.userId,
        item.longitude,
        item.latitude,
        item.timestamp,
        item.deviceName
      )
  );
};

const saveLocationHistory = async (locations) => {
  const dataToSave = locations.map((loc) => ({
    userId: loc.userId,
    longitude: loc.longitude,
    latitude: loc.latitude,
    timestamp: loc.timestamp,
    deviceName: loc.deviceName,
  }));
  await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2));
};

module.exports = { GetLocationHistory, saveLocationHistory, validateLocation };
