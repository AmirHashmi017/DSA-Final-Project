class LocationHistory {
  constructor(userId, longitude, latitude, timestamp, deviceName) {
    this.userId = userId;
    this.longitude = longitude;
    this.latitude = latitude;
    this.timestamp = timestamp;
    this.deviceName = deviceName;
  }
}

module.exports = LocationHistory;
