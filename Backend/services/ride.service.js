// Import required modules and models
const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service');
const crypto = require('crypto');

// Conversion rate from INR to USD
const conversionRate = 75;

// Calculate fare for a ride
async function getFare(pickup, destination) {
    // Check if pickup and destination are provided
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    // Get distance and time from map service
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Check if valid distance and duration are received
    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Invalid distance or duration received');
    }

    // Define base fare for each vehicle type in INR
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    // Define per kilometer rate for each vehicle type in INR
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    // Define per minute rate for each vehicle type in INR
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    // Calculate fare for each vehicle type in INR
    const fareInINR = {
        auto: Math.round(baseFare.auto + (distanceTime.distance / 1000 * perKmRate.auto) + (distanceTime.duration / 60 * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceTime.distance / 1000 * perKmRate.car) + (distanceTime.duration / 60 * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + (distanceTime.distance / 1000 * perKmRate.moto) + (distanceTime.duration / 60 * perMinuteRate.moto))
    };

    // Convert fare to USD
    const fareInUSD = {
        auto: (fareInINR.auto / conversionRate).toFixed(2),
        car: (fareInINR.car / conversionRate).toFixed(2),
        moto: (fareInINR.moto / conversionRate).toFixed(2)
    };

    // Return the calculated fare in USD, and also distance and duration
    return {
        ...fareInUSD,
        distance: distanceTime.distance,
        duration: distanceTime.duration
    };
}

module.exports.getFare = getFare;

// Generate OTP for ride using crypto
function getOtp(num) {
    function generateOtp(num) {
        // Generate a random OTP of specified length
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
        return otp;
    }
    return generateOtp(num);
}

// Create a new ride
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    // Check if all required fields are provided
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination and vehicleType are required');
    }

    // Calculate fare for the ride (now includes distance/duration)
    const fareData = await getFare(pickup, destination);

    // Create a new ride object
    const ride = new rideModel({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fareData[vehicleType],
        distance: fareData.distance,
        duration: fareData.duration
    });

    // Save the ride to the database
    await ride.save();

    // Populate the user information and return the ride
    return ride.populate('user');
}

// Confirm a ride
module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride Id is required');
    }
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'accepted', captain: captain._id });
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select("+otp");
    if (!ride) {
        throw new Error('Ride not found');
    }
    return ride;
};

// Start a ride
module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });
    return ride;
};

// End a ride
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user').populate('captain');
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not ongoing');
    }
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' });
    return ride;
};