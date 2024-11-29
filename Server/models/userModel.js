const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

// Define the user schema
const userSchema = {
  id: "number",
  name: "string",
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
  return JSON.parse(data);
};

// Save users to the file
const saveUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// Find a user by email
const findUserByEmail = (email) => {
  const users = getUsers(); // Future Improvement: Use a hashmaps to store users
  return users.find((user) => user.email === email);
};

module.exports = { getUsers, saveUsers, validateUser, findUserByEmail };
