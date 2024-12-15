const fs = require("fs").promises;
const path = require("path");
const User = require("../Classes/UserClass");

const filePath = path.join(__dirname, "../data/users.json");

const userSchema = {
  userId: "number",
  userName: "string",
  email: "string",
  password: "string",
};

const validateUser = (user) => {
  return Object.keys(userSchema).every(
    (key) => typeof user[key] === userSchema[key]
  );
};

const getUsers = async () => {
  const data = await fs.readFile(filePath, "utf8");
  const parsedData = JSON.parse(data);
  console.log(parsedData, "test");
  return parsedData;
};

const saveUsers = async (users) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

const addUser = async (user) => {
  if (!validateUser(user)) {
    throw new Error("Invalid user data");
  }
  const users = await getUsers();
  users[user.email] = user;
  saveUsers(users);
};

const findUserByEmail = async (email) => {
  const users = await getUsers();
  console.log("users in email function", users);
  return users[email] || null;
};

module.exports = {
  getUsers,
  saveUsers,
  validateUser,
  findUserByEmail,
  addUser,
};
