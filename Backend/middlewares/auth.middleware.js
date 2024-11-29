const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require('../models/blacklistToken.model');  // Import blacklist token model

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  // Get the token from cookies or Authorization header
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the token is blacklisted
  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  // Decode and verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the JWT token

    const user = await userModel.findById(decoded._id);  // Fetch user from DB using the decoded ID
    req.user = user;  // Attach the user to the request object

    return next();  // Call the next middleware
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};