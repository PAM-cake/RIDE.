// Import the captain model
const captainModel = require('../models/captain.model');

// Create a new captain
module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
  // Check if all required fields are provided
  if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Create a new captain object
  const captain = new captainModel({
    fullname: {
      firstName: firstname,
      lastName: lastname
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType
    }
  });

  // Save the captain to the database
  await captain.save();

  // Return the created captain
  return captain;
};