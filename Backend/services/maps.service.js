// Import required modules and models
const axios = require('axios');
const captainModel = require('../models/captain.model');

// Get coordinates for an address
module.exports.getAddressCoordinates = async (address) => {
    // Get Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    // Construct the URL for the Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        // Make a request to the Google Maps Geocoding API
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            // Extract the location coordinates from the response
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching coordinates');
    }
};

// Get distance and time between two locations
module.exports.getDistanceTime = async (origin, destination) => {
    // Check if origin and destination are provided
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    // Get Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    // Construct the URL for the Google Maps Distance Matrix API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        // Make a request to the Google Maps Distance Matrix API
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'NOT_FOUND') {
                throw new Error('Origin or destination not found');
            }

            // Extract the distance and duration from the response
            const distance = element.distance.value;  // distance in meters
            const duration = element.duration.value;  // duration in seconds

            return {
                distance,
                duration
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        throw new Error('Error fetching distance and time');
    }
}

// Get autocomplete suggestions for an address input
module.exports.getAutoCorrectSuggestions = async (input) => {
    // Check if input is provided
    if (!input) {
        throw new Error('Input is required');
    }

    // Get Google Maps API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    // Construct the URL for the Google Maps Places Autocomplete API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        // Make a request to the Google Maps Places Autocomplete API
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            // Return the autocomplete suggestions
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching suggestions');
    }
}

// Get captains within a specified radius
module.exports.getCaptainInTheRadius = async (lat, lng, radius) => {
    // Check if latitude, longitude, and radius are provided
    if (!lat || !lng || !radius) {
        throw new Error('Latitude, longitude and radius are required');
    }

    // Find captains within the specified radius using geospatial query
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371] // 6371 is the radius of the Earth in kilometers
            }
        }
    });

    // Return the list of captains
    return captains;
};