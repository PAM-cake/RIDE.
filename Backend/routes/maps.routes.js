// Import required modules and controllers
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require("../controllers/map.controller");
const { query } = require("express-validator");

// Get coordinates route
router.get(
    "/get-coordinates",
    // Validate address
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

// Get distance and time route
router.get(
  "/get-distance-time",
  // Validate origin
  query('origin').isString().isLength({ min: 3 }),
  // Validate destination
  query('destination').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

// Get autocomplete suggestions route
router.get("/get-suggestions", 
    // Validate input
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCorrectSuggestions
);

module.exports = router;
