const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  GetSearchedLocations,
  SaveSearchedLocations,
  validateSearchedLocation,
} = require("../models/SearchedLocationsModel");

const LocationClass = require("../Classes/LocationClass.js");
const Stack = require("../DataStructuresAndAlgorithms/Stack.js");

const SECRET_KEY = "987654321";
const locationStack = new Stack(); 

const AddSearchedLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newLocation = new LocationClass(UserID, SourceLocation, DestinationLocation);
  if (!validateSearchedLocation(newLocation)) {
    return res.status(400).json({ message: "Invalid Search History format" });
  }


  locationStack.Push(newLocation);
  const currentLocations = GetSearchedLocations();
  currentLocations.push(newLocation);
  SaveSearchedLocations(currentLocations);

  res.status(201).json({ message: "Search History added successfully", location: newLocation });
};

const GetSearchedLocationBYID = async (req, res) => {
    const { UserID } = req.params; 

    const locations = GetSearchedLocations();

    if (UserID) {
      const userLocations = locations.filter(location => location.UserID === parseInt(UserID));
      if (userLocations.length === 0) {
        return res.status(404).json({ message: "No search history found for the given UserID" });
      }
      return res.status(200).json(userLocations);
    }
    else{
    return res.status(400).json({ message: "UserID is required in the path." });
    }
  };
  

const DeleteSearchedLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const locations = GetSearchedLocations();
  const updatedLocations = locations.filter(
    (location) =>
      !(location.UserID === UserID && location.SourceLocation === SourceLocation && location.DestinationLocation === DestinationLocation)
  );

  if (locations.length === updatedLocations.length) {
    return res.status(404).json({ message: "Search History not found" });
  }

  SaveSearchedLocations(updatedLocations);

  res.status(200).json({ message: "Search History deleted successfully" });
};

module.exports = { AddSearchedLocation, GetSearchedLocationBYID, DeleteSearchedLocation };
