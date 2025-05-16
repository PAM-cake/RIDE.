//RIDE CONTROLLER BASICALLY HANDLE ALL THE RIDE RELATED STUFF FROM CREATING TO ENDING THE RIDE.

// Import required modules and models
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

// Create a new ride
module.exports.createRide = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        // Create a new ride
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        const rideWithUser = await rideModel.findById(ride._id).populate('user'); // Populate user information
        res.status(201).json(rideWithUser);  // Send the ride object with user info and fare

        // Get pickup coordinates
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        console.log('Pickup coordinates:', pickupCoordinates);

        // Find captains in the radius
        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 50); // Assuming radius is 5 km

        // Notify captains about the new ride
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, { event: 'new-ride', data: rideWithUser });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get fare for a ride
module.exports.getFare = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination} = req.query;
    try {
        // Calculate fare
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Confirm a ride
module.exports.confirmRide = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Confirm the ride
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        // Notify user about the confirmed ride
        sendMessageToSocketId(ride.user.socketId, { event: 'ride-confirmed', data: ride });

        res.status(200).json(ride);
    } catch (error) {
        console.error("Error confirming ride:", error);
        res.status(500).json({ message: error.message });
    }
};

// Start a ride
module.exports.startRide = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        // Start the ride
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        // Notify user about the started ride
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// End a ride
module.exports.endRide = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;

    try {
        // End the ride
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        // Notify user about the ended ride
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

