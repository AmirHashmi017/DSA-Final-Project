const express = require("express");
const {
  addLocationHistory,
  getLocationHistory,
  deleteLocationHistory,
  deleteAllLocationHistory,
} = require("../controllers/locationHistoryController.js");

const router = express.Router();

router.post("/add", addLocationHistory);
router.get("/get/:userId", getLocationHistory);
router.delete("/delete", deleteLocationHistory);
router.delete("/deleteAll/:userId", deleteAllLocationHistory);

module.exports = router;
