const jwt = require("jsonwebtoken");
const {
  getUsers,
  saveUsers,
  validateUser,
  findUserByEmail,
} = require("../models/userModel.js");
const SECRET_KEY = "987654321";
// Signup handler
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  // Create the new user
  const newUser = { name, email, password };

  // Save the user data
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  // Create a JWT token
  const token = jwt.sign({ email: newUser.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  // Send response with the token
  res.status(201).json({
    message: "User registered successfully",
    token,
  });
};

// Login handler
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user exists
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Validate the password
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  // Send response with the token
  res.status(200).json({
    message: "User logged in successfully",
    token,
  });
};

module.exports = { signup, login };
