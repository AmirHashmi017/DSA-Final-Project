const fs = require("fs").promises;
const path = require("path");
const Queue = require("../DataStructuresAndAlgorithms/Queue.js");
const LocationClass = require("../Classes/LocationClass.js");

const filePath = path.join(__dirname, "../data/BookMarkedLocations.json");

const locationsQueue = new Queue();

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

const LoadLocationsFromFile = async() => {
  if (!await fs.stat(filePath).then(() => true).catch(() => false)) {
    await fs.writeFile(filePath, JSON.stringify([]));
  }
  const data = await fs.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  parsedData.forEach((item) => {
    locationsQueue.Enqueue(new LocationClass(item.UserID, item.SourceLocation, item.DestinationLocation));
  });
};

const SaveLocationsToFile = async() => {
  const dataToSave = [];
  let current = locationsQueue.head;
  while (current) {
    const location = current.value
    dataToSave.push({
      UserID: location.UserID,
      SourceLocation: location.SourceLocation,
      DestinationLocation: location.DestinationLocation,
    });
    current=current.next;
  }
  await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2));
};

const IsLocationExist = (UserID, source, destination) => {
  let current = locationsQueue.head;
  while (current) {
    const location = current.value;
    if (location.UserID === UserID && location.SourceLocation === source && location.DestinationLocation === destination) {
      return true;
    }
    current = current.next;
  }
  return false;
};

module.exports = {
  locationsQueue,
  validateLocation,
  LoadLocationsFromFile,
  SaveLocationsToFile,
  IsLocationExist,
};
