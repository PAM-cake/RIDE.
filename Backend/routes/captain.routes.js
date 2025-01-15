// Import required modules and controllers
const captainController = require("../controllers/captain.controller");
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require('../middlewares/auth.middleware');

// Register captain route
router.post(
  "/register",
  [
    // Validate email
    body("email").isEmail().withMessage("Invalid Email"),
    // Validate first name
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    // Validate last name
    body("fullname.lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    // Validate password
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    // Validate vehicle color
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color name must be at least 3 characters long"),
    // Validate vehicle plate
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate name must be at least 3 characters long"),
    // Validate vehicle capacity
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    // Validate vehicle type
    body("vehicle.vehicleType")
      .isIn(['car', 'motorcycle', 'auto'])
      .withMessage("Invalid vehicle type")
  ],
  captainController.registerCaptain
);

// Login captain route
router.post('/login',[
  // Validate email
  body('email').isEmail().withMessage("Invalid Email"),
  // Validate password
  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
],
  captainController.loginCaptain
);

// Get captain profile route
router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);

// Logout captain route
router.get("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;