const jwt = require("jsonwebtoken");
const {
  getUsers,
  saveUsers,
  validateUser,
  findUserByEmail,
  addUser,
} = require("../models/userModel.js");
const User = require("../Classes/UserClass.js");

const signup = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const userId = Date.now();
  const newUser = new User(userId, userName, email, password);

  addUser(newUser);
  res.status(201).json({
    message: "User registered successfully",
    user: { userId, userName, email },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const { password: userPassword, ...userWithoutPassword } = user;
  return res.status(200).json({
    message: "Login successful",
    user: userWithoutPassword,
  });
};

const getAllUsers = async (req, res) => {
  const users = await getUsers();
  const allUsers = Object.values(users).map(
    (user) => new User(user.userId, user.userName, user.email, user.password)
  );
  return res.status(200).json(allUsers);
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const users = await getUsers();
  delete users[email];
  saveUsers(users);
  return res.status(200).json({ message: "User deleted successfully" });
};

module.exports = { signup, login, getAllUsers, deleteUser };
