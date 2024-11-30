const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
  if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  }

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

  await captain.save(); // Ensure you're saving the captain object
  return captain;
};