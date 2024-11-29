const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require('../models/blacklistToken.model')

//register controller//
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);

  const { fullname, email, password } = req.body;

  // Create a new user instance
  const user = new userModel({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
  });

  // Now call the hashPassword method on the user instance
  const hashedPassword = await user.hashPassword(password);

  // Save the hashed password
  user.password = hashedPassword;

  // Create the user in the database
  const newUser = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = newUser.generateAuthToken();

  res.status(201).json({ token, user: newUser });
};

//login controller//
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password"); //to check the email entered exist or not //
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password); //to check that password matched or not //
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token)  //cookie method to read //
  res.status(200).json({ token, user });
};

//get user profile (basically for each user)//
module.exports.getUserProfile = async (req, res, next) => {
  //using middleware check which user is log in and using , and if there is no one than say unauthorised. //// created in user route and controller
  res.status(200).json(req.user);
};


module.exports.logoutUser = async (req, res, next) => {
  // Clear the cookie
  res.clearCookie('token');

  // Get the token from the cookies or the Authorization header
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  // Blacklist the token
  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: 'Logged out successfully' });
};