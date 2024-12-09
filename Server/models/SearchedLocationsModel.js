const fs = require("fs").promises;
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

const LoadSearchedLocationsFromFile = async () => {
  if (!await fs.stat(filePath).then(() => true).catch(() => false)) {
    await fs.writeFile(filePath, JSON.stringify([]));
  }
  const data = await fs.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  parsedData.forEach((item) => {
    SearchedLocationStack.Push(new LocationClass(item.UserID, item.SourceLocation, item.DestinationLocation));
  });
};

const SaveSearchedLocationsToFile = async () => {
  const dataToSave = [];
  let current = SearchedLocationStack.head;
  while (current) {
    const location = current.value
    dataToSave.push({
      UserID: location.UserID,
      SourceLocation: location.SourceLocation,
      DestinationLocation: location.DestinationLocation,
    });
    current = current.next;
  }
  await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2));
};


module.exports = {
  SearchedLocationStack,
  validateSearchedLocation,
  LoadSearchedLocationsFromFile,
  SaveSearchedLocationsToFile,
};
