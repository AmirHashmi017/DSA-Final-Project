const {
  getUsers,
  saveUsers,
  validateUser,
  findUserByEmail,
} = require("../models/userModel.js");

// Signup handler
const signup = (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  if (findUserByEmail(email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  if (!validateUser(newUser)) {
    return res.status(400).json({ error: "Invalid user structure" });
  }

  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "Signup successful", user: newUser });
};

// Login handler
const login = (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful", user });
};

module.exports = { signup, login };
