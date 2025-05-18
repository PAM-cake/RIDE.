// Import required modules and controllers
const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create ride route
router.post('/create',
    authMiddleware.authUser,
    // Validate pickup location
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    // Validate destination location
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination Location"),
    // Validate vehicle type
    body("vehicleType").isIn(['auto', 'car', 'moto']).withMessage("Invalid Vehicle Type"),
    rideController.createRide
);

// Get fare route
router.get('/get-fare',
    authMiddleware.authUser,
    // Validate pickup location
    query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup Location"),
    // Validate destination location
    query("destination").isString().isLength({ min: 3 }).withMessage("Invalid Destination Location"),
    rideController.getFare
);

// Confirm ride route
router.post('/confirm',
    authMiddleware.authCaptain,
    // Validate ride ID
    body("rideId").isMongoId().withMessage("Invalid Ride Id"),
    rideController.confirmRide
);

// Start ride route
router.get('/start-ride',
    authMiddleware.authCaptain,
    // Validate ride ID
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    // Validate OTP
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

// End ride route
router.post('/end-ride',
    authMiddleware.authCaptain,
    // Validate ride ID
    body("rideId").isMongoId().withMessage("Invalid Ride Id"),
    rideController.endRide
);

// Get all completed rides for the current captain
router.get('/captain/completed',
    authMiddleware.authCaptain,
    async (req, res) => {
        try {
            const rides = await require('../models/ride.model').find({
                captain: req.captain._id,
                status: 'completed'
            });
            res.json(rides);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;