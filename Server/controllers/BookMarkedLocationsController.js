const {
  locationsQueue,
  validateLocation,
  LoadLocationsFromFile,
  SaveLocationsToFile,
  IsLocationExist,
} = require("../models/BookMarkedLocationsModel");
const LocationClass = require("../Classes/LocationClass.js");

const AddLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newLocation = new LocationClass(UserID, SourceLocation, DestinationLocation);
  if (!validateLocation(newLocation)) {
    return res.status(400).json({ message: "Invalid location format" });
  }

  if (IsLocationExist(UserID, SourceLocation, DestinationLocation)) {
    return res.status(400).json({ message: "Location already bookmarked" });
  }

  locationsQueue.Enqueue(newLocation);
  SaveLocationsToFile();

  res.status(201).json({ message: "Location added successfully", location: newLocation });
};

const GetLocationBYID = async (req, res) => {
  const { UserID } = req.params;

  if (!UserID) {
    return res.status(400).json({ message: "UserID is required in the path." });
  }
  if(locationsQueue.head==null)
  {
  LoadLocationsFromFile();
  }
  const userLocations = [];
  let current = locationsQueue.head;
  while (current) {
    const location = current.value;
    if (location.UserID === parseInt(UserID)) {
      userLocations.push(location);
    }
    current = current.next;
  }

  if (userLocations.length === 0) {
    return res.status(404).json({ message: "No locations found for the given UserID" });
  }

  res.status(200).json(userLocations);
};

const DeleteLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
      return res.status(400).json({ message: "All fields are required" });
  }

  const locationToDelete = new LocationClass(UserID, SourceLocation, DestinationLocation);
  const deletedLocation = locationsQueue.DeleteSpecific(locationToDelete);

  if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
  }

  SaveLocationsToFile(locationsQueue);

  res.status(200).json({ message: "Location deleted successfully", location: deletedLocation });
};


module.exports = { AddLocation, GetLocationBYID, DeleteLocation };
