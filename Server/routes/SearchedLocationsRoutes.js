const express = require("express");
const {
    AddSearchedLocation,
    GetSearchedLocationBYID,
    DeleteSearchedLocation,
  } =  require("../controllers/SearchedLocationsController.js");

const router = express.Router();

router.post("/Add", AddSearchedLocation);

router.get("/Get/:UserID", GetSearchedLocationBYID);

router.delete("/Delete", DeleteSearchedLocation);

module.exports = router;