const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const bcrypt = require('bcrypt');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req); // Check validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure we are passing the correct fields to the createCaptain service
    const captain = await captainService.createCaptain({
      firstname: fullname.firstName,    // Ensure consistency (firstName)
      lastname: fullname.lastName,      // Ensure consistency (lastName)
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType, // Ensure vehicleType is passed here
    });

    // Generate JWT token for the captain
    const token = captain.generateAuthToken();

    return res.status(201).json({ token, captain });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};