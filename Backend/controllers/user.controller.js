const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// Register User
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    // Check if user already exists
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create a new user
    const user = new userModel({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a token
    const token = user.generateAuthToken();

    // console.log(user); // Remove or comment out this line if it exists

    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Login User
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    // console.log(user); // Remove or comment out this line if it exists
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get User Profile
module.exports.getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Logout User
module.exports.logoutUser = async (req, res, next) => {
  try {
    // Clear the cookie
    res.clearCookie("token");

    // Get the token from cookies or Authorization header
    const token =
      req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Blacklist the token
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};