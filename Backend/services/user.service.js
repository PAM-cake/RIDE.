// Import the user model
const userModel = require("../models/user.model");

// Create a new user
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
  // Check if all required fields are provided
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Create a new user object
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  // Return the created user
  return user;
};
