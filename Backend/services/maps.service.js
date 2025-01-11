const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
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

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'NOT_FOUND') {
                throw new Error('Origin or destination not found');
            }

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

module.exports.getAutoCorrectSuggestions = async (input) => {
    if(!input) {
        throw new Error('Input is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching suggestions');
    }
}

module.exports.getCaptainInTheRadius = async (lat, lng, radius) => {
    if (!lat || !lng || !radius) {
        throw new Error('Latitude, longitude and radius are required');
    }

    const captains = await captainModel.find({
        //query made by mongodb 
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 3963.2] // 3963.2 is the radius of the Earth in miles
            }
        }
    });

    return captains;
}