const fs = require("fs");
const path = require("path");
const Stack = require("../DataStructuresAndAlgorithms/Stack.js");
const LocationClass = require("../Classes/LocationClass.js");

const filePath = path.join(__dirname, "../data/SearchedLocations.json");

const SearchedLocationStack = new Stack();

const SearchedLocationsSchema = {
  UserID: "number",
  SourceLocation: "string",
  DestinationLocation: "string",
};

const validateSearchedLocation = (location) => {
  return Object.keys(SearchedLocationsSchema).every(
    (key) => typeof location[key] === SearchedLocationsSchema[key]
  );
};

const LoadSearchedLocationsFromFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);
  parsedData.forEach((item) => {
    SearchedLocationStack.Push(new LocationClass(item.UserID, item.SourceLocation, item.DestinationLocation));
  });
};

const SaveSearchedLocationsToFile = () => {
  const dataToSave = [];
  let current = SearchedLocationStack.head;
  while (current) {
    const location = current.value
    dataToSave.push({
      UserID: location.UserID,
      SourceLocation: location.SourceLocation,
      DestinationLocation: location.DestinationLocation,
    });
    current=current.next;
  }
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
};


module.exports = {
  SearchedLocationStack,
  validateSearchedLocation,
  LoadSearchedLocationsFromFile,
  SaveSearchedLocationsToFile,
};
