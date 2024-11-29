const express = require("express");
const {
    AddLocation,
    GetLocationBYID,
    DeleteLocation,
  } =  require("../controllers/BookMarkedLocationsController.js");

const router = express.Router();

router.post("/Add", AddLocation);

router.get("/Get/:UserID", GetLocationBYID);

router.delete("/Delete", DeleteLocation);

module.exports = router;