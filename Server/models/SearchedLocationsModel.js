const fs = require("fs");
const path = require("path");
const LocationClass = require("../Classes/LocationClass.js");

const filePath = path.join(__dirname, "../data/SearchedLocations.json");

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

const GetSearchedLocations = () => {
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.map(
    (item) =>
      new LocationClass(item.UserID, item.SourceLocation, item.DestinationLocation)
  );
};

const SaveSearchedLocations = (locations) => {
  const dataToSave = locations.map((loc) => ({
    UserID: loc.UserID,
    SourceLocation: loc.SourceLocation,
    DestinationLocation: loc.DestinationLocation,
  }));
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
};



module.exports = { GetSearchedLocations, SaveSearchedLocations, validateSearchedLocation };
