const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name should contain at least 3 characters"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLength: [3, "Last name should contain at least 3 characters"]
    }
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false
  },
  socketId: {
    type: String,
  },
  vehicle: {
    color: {
      type: String,
      required: [true, "Vehicle color is required"],
      minLength: [3, "Color must be at least 3 characters long"]
    },
    plate: {
      type: String,
      required: [true, "Plate is required"],
      minLength: [3, "Plate must be at least 3 characters long"]
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"]
    },
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: ['car', 'motorcycle', 'auto']
    },
  },
  location: {    // Keeping location directly under the captain object
    lat: { type: Number },
    lng: { type: Number },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('captain', captainSchema);
