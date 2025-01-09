const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
   

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Invalid distance or duration received');
    }

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    
    // Calculate fare for each vehicle type
    const fare = {
        auto: baseFare.auto + (distanceTime.distance / 1000 * perKmRate.auto) + (distanceTime.duration / 60 * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance / 1000 * perKmRate.car) + (distanceTime.duration / 60 * perMinuteRate.car),
        moto: baseFare.moto + (distanceTime.distance / 1000 * perKmRate.moto) + (distanceTime.duration / 60 * perMinuteRate.moto)
    };

    return fare;
}
module.exports.getFare = getFare;

//generating otp for ride with bycryption
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
        return otp;
    }
    return generateOtp(num);
}



module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination and vehicleType are required');
    }
    const fare = await getFare(pickup, destination);


    const ride = new rideModel({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });
 

    return ride;
}
