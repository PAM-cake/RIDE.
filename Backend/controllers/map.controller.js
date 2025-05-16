
//MAP CONTROLLER BASICALLY HANDLE ALL THE DISTANCE AND TIME CALCULATION RELATED STUFF.

// Import required modules and services
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// Get coordinates for an address
module.exports.getCoordinates = async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { address } = req.query;

    try {
        // Get coordinates from map service
        const coordinates = await mapService.getAddressCoordinates(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        return res.status(404).json({ message: 'Coordinates not found', error: error.message });
    }
}

// Get distance and time between two locations
module.exports.getDistanceTime = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        const { origin, destination } = req.query;
        // Get distance and time from map service
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Get autocomplete suggestions for an address input
module.exports.getAutoCorrectSuggestions = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        const { input } = req.query;
        // Get suggestions from map service
        const suggestions = await mapService.getAutoCorrectSuggestions(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}