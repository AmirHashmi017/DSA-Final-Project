const LocationHistory = require("../Classes/LocationHistory.js");
const {
  GetLocationHistory,
  saveLocationHistory,
  validateLocation,
} = require("../models/LocationHistory.js");

const DoublyLinkedList = require("../DataStructuresAndAlgorithms/LinkedList.js");
const locationHistoryList = new DoublyLinkedList();

const addLocationHistory = async (req, res) => {
  const { userId, longitude, latitude, timestamp, deviceName } = req.body;

  if (!userId || !longitude || !latitude || !timestamp || !deviceName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newLocation = new LocationHistory(
    userId,
    longitude,
    latitude,
    timestamp,
    deviceName
  );

  if (!validateLocation(newLocation)) {
    return res.status(400).json({ message: "Invalid location format" });
  }

  locationHistoryList.append(newLocation);
  const locations = await GetLocationHistory();
  locations.push(newLocation);
  await saveLocationHistory(locations);

  res
    .status(201)
    .json({ message: "Location added successfully", location: newLocation });
};

const getLocationHistory = async (req, res) => {
  const { userId } = req.params;
  const locations = await GetLocationHistory();
  console.log(locations, userId);
  if (userId) {
    const userLocations = locations.filter(
      (location) => location.userId === parseInt(userId)
    );
    if (userLocations.length === 0) {
      return res
        .status(404)
        .json({ message: "No locations found for the given userId" });
    }
    return res.status(200).json(userLocations);
  } else {
    return res.status(400).json({ message: "userId is required in the path." });
  }
};

const deleteLocationHistory = async (req, res) => {
  const { userId, longitude, latitude, timestamp, deviceName } = req.body;
  console.log(userId, longitude, latitude, timestamp, deviceName);
  if (!userId || !longitude || !latitude || !timestamp || !deviceName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const locations = await GetLocationHistory();
  const locationIndex = locations.findIndex(
    (location) =>
      location.userId === userId &&
      location.longitude === longitude &&
      location.latitude === latitude &&
      location.timestamp === timestamp &&
      location.deviceName === deviceName
  );

  if (locationIndex === -1) {
    return res.status(404).json({ message: "Location not found" });
  }

  locationHistoryList.remove(locations[locationIndex]);
  locations.splice(locationIndex, 1);
  await saveLocationHistory(locations);

  res.status(200).json({ message: "Location deleted successfully" });
};

const deleteAllLocationHistory = async (req, res) => {
  const { userId } = req.params;
  const locations = await GetLocationHistory();
  const updatedLocations = locations.filter(
    (location) => location.userId !== parseInt(userId)
  );
  if (locations.length === updatedLocations.length) {
    return res.status(404).json({ message: "Location not found" });
  }
  locationHistoryList.head = null;
  await saveLocationHistory(updatedLocations);
  res.status(200).json({ message: "Location deleted successfully" });
};

module.exports = {
  addLocationHistory,
  getLocationHistory,
  deleteLocationHistory,
  deleteAllLocationHistory,
};
