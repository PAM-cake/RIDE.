// Import required modules and models
const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

// Register Captain
module.exports.registerCaptain = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new captain
    const captain = new captainModel({
      fullname: {
        firstName: fullname.firstName,
        lastName: fullname.lastName
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      }
    });

    // Save the captain to the database
    await captain.save();

    // Generate a token
    const token = captain.generateAuthToken();

    // Respond with the token and captain data
    return res.status(201).json({ token, captain });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Login Captain
module.exports.loginCaptain = async (req, res, next) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find captain by email and include password
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = captain.generateAuthToken();

    // Set token in cookie and respond with token and captain data
    res.cookie('token', token);
    res.status(200).json({ token, captain });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Get Captain Profile
module.exports.getCaptainProfile = async (req, res, next) => {
  if (!req.captain) {
    return res.status(400).json({ message: "No captain found" });
  }
  // Respond with captain data from request
  res.status(200).json({ captain: req.captain });
};

// Logout Captain
module.exports.logoutCaptain = async (req, res, next) => {
  // Get the token from cookies or Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  // Blacklist the token
  await blacklistTokenModel.create({ token });

  // Clear the cookie and respond with success message
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout Successfully' });
};