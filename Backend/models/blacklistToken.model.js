//collection of black list who logged out and check the token exist or not //
//ttl - time to leave //
const mongoose = require("mongoose");

// Define the schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate blacklisted tokens
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24hr in seconds //
  },
})

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema)
