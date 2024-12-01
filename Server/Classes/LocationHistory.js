class LocationHistory {
  constructor(userId, longitude, latitude, timestamp) {
    this.userId = userId;
    this.longitude = longitude;
    this.latitude = latitude;
    this.timestamp = timestamp;
  }
}

module.exports = LocationHistory;
