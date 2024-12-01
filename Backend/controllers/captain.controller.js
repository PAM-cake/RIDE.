const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);  // Check validation errors
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

    // Create the captain
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

    await captain.save();  // Save the captain to the database

    // Generate JWT token for the captain
    const token = captain.generateAuthToken();

    return res.status(201).json({ token, captain });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();  // Generate the JWT token
    res.cookie('token', token);  // Save token as a cookie
    res.status(200).json({ token, captain });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  // Ensure that the captain is attached to the request object
  if (!req.captain) {
    return res.status(400).json({ message: "No captain found" });
  }
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Correct usage of req.cookies

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  await blacklistTokenModel.create({ token });

  res.clearCookie('token'); // Fix clearToken typo to clearCookie
  res.status(200).json({ message: 'Logout Successfully' });
};