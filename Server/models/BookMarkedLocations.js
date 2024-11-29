const fs = require("fs");
const path = require("path");

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
  return JSON.parse(data);
};

const SaveBookMarkedLocations = (locations) => {
  fs.writeFileSync(filePath, JSON.stringify(locations, null, 2));
};

const IsLocationExist=(UserID,source,destination)=>
{
    const locations = GetBookMarkedLocations();
    return locations.find((location) => (location.UserID === UserID && location.SourceLocation===source && location.DestinationLocation===destination));
}

module.exports = { GetBookMarkedLocations, SaveBookMarkedLocations, validateLocation,IsLocationExist};
