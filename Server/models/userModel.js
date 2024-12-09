const fs = require("fs");
const path = require("path");
const User = require("../Classes/UserClass");

const filePath = path.join(__dirname, "../data/users.json");

// Define the user schema
const userSchema = {
  userId: "number",
  userName: "string",
  email: "string",
  password: "string",
};

// Validate user data
const validateUser = (user) => {
  return Object.keys(userSchema).every(
    (key) => typeof user[key] === userSchema[key]
  );
};

// Get all users from the file
const getUsers = () => {
  const data = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
};

// Save users to the file
const saveUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

const addUser = (user) => {
  if (!validateUser(user)) {
    throw new Error("Invalid user data");
  }
  const users = getUsers();
  users[user.email] = user;
  saveUsers(users);
};

// Find a user by email
const findUserByEmail = (email) => {
  const users = getUsers();
  return users[email] || null;
};

module.exports = {
  getUsers,
  saveUsers,
  validateUser,
  findUserByEmail,
  addUser,
};
