const {
  SearchedLocationStack,
  validateSearchedLocation,
  LoadSearchedLocationsFromFile,
  SaveSearchedLocationsToFile,
} = require("../models/SearchedLocationsModel");
const LocationClass = require("../Classes/LocationClass.js");

const AddSearchedLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newLocation = new LocationClass(UserID, SourceLocation, DestinationLocation);
  if (!validateSearchedLocation(newLocation)) {
    return res.status(400).json({ message: "Invalid location format" });
  }


  SearchedLocationStack.Push(newLocation);
  SaveSearchedLocationsToFile();

  res.status(201).json({ message: "Location added successfully", location: newLocation });
};

const GetSearchedLocationBYID = async (req, res) => {
  const { UserID } = req.params;

  if (!UserID) {
    return res.status(400).json({ message: "UserID is required in the path." });
  }
  if(SearchedLocationStack.head==null)
  {
  LoadSearchedLocationsFromFile();
  }
  const userLocations = [];
  let current = SearchedLocationStack.head;
  console.log(SearchedLocationStack.Peek());
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

const DeleteSearchedLocation = async (req, res) => {
  const { UserID, SourceLocation, DestinationLocation } = req.body;

  if (!UserID || !SourceLocation || !DestinationLocation) {
      return res.status(400).json({ message: "All fields are required" });
  }

  const locationToDelete = new LocationClass(UserID, SourceLocation, DestinationLocation);
  const deletedLocation = SearchedLocationStack.DeleteSpecific(locationToDelete);

  if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
  }

  SaveSearchedLocationsToFile(SearchedLocationStack);

  res.status(200).json({ message: "Location History deleted successfully", location: deletedLocation });
};


module.exports = { AddSearchedLocation, GetSearchedLocationBYID, DeleteSearchedLocation };
