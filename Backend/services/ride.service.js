const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

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
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    console.log(distanceTime.distance);
    
    // Calculate fare for each vehicle type
    const fare = {
        auto: baseFare.auto + (distanceTime.distance / 1000 * perKmRate.auto) + (distanceTime.duration / 60 * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance / 1000 * perKmRate.car) + (distanceTime.duration / 60 * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance / 1000 * perKmRate.motorcycle) + (distanceTime.duration / 60 * perMinuteRate.motorcycle)
    };

    return fare;
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    const fare = await getFare(pickup, destination);


    const ride = new rideModel({
        user,
        pickup,
        destination,
        fare: fare[vehicleType]
    });
 

    return ride;
}
