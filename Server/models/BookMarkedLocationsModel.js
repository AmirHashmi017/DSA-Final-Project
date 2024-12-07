const fs = require("fs");
const path = require("path");
const LocationClass = require("../Classes/LocationClass.js");

const filePath = path.join(__dirname, "../data/BookMarkedLocations.json");

const BookMarkedLocationsSchema = {
  UserID: "number",
  SourceLocation: "string",
  DestinationLocation: "string",
};

const validateLocation = (location) => {
  return Object.keys(BookMarkedLocationsSchema).every(
    (key) => typeof location[key] === BookMarkedLocationsSchema[key]
  );
};

const GetBookMarkedLocations = () => {
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData.map(
    (item) =>
      new LocationClass(item.UserID, item.SourceLocation, item.DestinationLocation)
  );
};

const SaveBookMarkedLocations = (locations) => {
  const dataToSave = locations.map((loc) => ({
    UserID: loc.UserID,
    SourceLocation: loc.SourceLocation,
    DestinationLocation: loc.DestinationLocation,
  }));
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
};

const IsLocationExist = (UserID, source, destination) => {
  const locations = GetBookMarkedLocations();
  return locations.find(
    (location) =>
      location.UserID === UserID &&
      location.SourceLocation === source &&
      location.DestinationLocation === destination
  );
};

module.exports = { GetBookMarkedLocations, SaveBookMarkedLocations, validateLocation, IsLocationExist };
