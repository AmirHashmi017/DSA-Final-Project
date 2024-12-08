const express = require("express");
const {
    getTopVisitedLocationsAPI,
  } =  require("../models/TopVisitedLocations.js");

const router = express.Router();


router.get("/Get/:UserID", getTopVisitedLocationsAPI);


module.exports = router;