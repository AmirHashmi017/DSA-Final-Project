const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  GetBookMarkedLocations,
  SaveBookMarkedLocations,
  validateLocation,
  IsLocationExist,
} = require("../models/BookMarkedLocationsModel");

const LocationClass = require("../Classes/LocationClass.js");
const Queue = require("../DataStructuresAndAlgorithms/Queue.js");

const SECRET_KEY = "987654321";
const locationQueue = new Queue(); 

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

  locationQueue.Enqueue(newLocation);
  const currentLocations = GetBookMarkedLocations();
  currentLocations.push(newLocation);
  SaveBookMarkedLocations(currentLocations);

  res.status(201).json({ message: "Location added successfully", location: newLocation });
};

const GetLocationBYID = async (req, res) => {
    const { UserID } = req.params; 

    const locations = GetBookMarkedLocations();

    if (UserID) {
      const userLocations = locations.filter(location => location.UserID === parseInt(UserID));
      if (userLocations.length === 0) {
        return res.status(404).json({ message: "No locations found for the given UserID" });
      }
      return res.status(200).json(userLocations);
    }
    else{
    return res.status(400).json({ message: "UserID is required in the path." });
    }
  };
  

const DeleteLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const locations = GetBookMarkedLocations();
  const updatedLocations = locations.filter(
    (location) =>
      !(location.UserID === UserID && location.SourceLocation === SourceLocation && location.DestinationLocation === DestinationLocation)
  );

  if (locations.length === updatedLocations.length) {
    return res.status(404).json({ message: "Location not found" });
  }

  SaveBookMarkedLocations(updatedLocations);

  res.status(200).json({ message: "Location deleted successfully" });
};

module.exports = { AddLocation, GetLocationBYID, DeleteLocation };
