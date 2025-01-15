// Import required modules and controllers
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Register route
router.post(
  "/register",
  [
    // Validate email
    body("email").isEmail().withMessage("Invalid Email"),
    // Validate first name
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    // Validate password
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

// Login route
router.post(
  "/login",
  [
    // Validate email
    body("email").isEmail().withMessage("Invalid Email"),
    // Validate password
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

// Get user profile route
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

// Logout route
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
