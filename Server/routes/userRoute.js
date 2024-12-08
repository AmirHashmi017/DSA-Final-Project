const express = require("express");
const {
  signup,
  login,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.post("/deleteUser", deleteUser);

module.exports = router;
