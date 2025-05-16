//SOCKET JS FILE BASICALLY HANDLE ALL THE SOCKET CONNECTION BETWEEN THE USER AND CAPTAIN FOR END TO END COMMUNITION AND DATA TRANSFER.

// Import required modules and models
const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

// Initialize Socket.IO
function initializeSocket(server) {
  // Create a new Socket.IO instance
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Handle new client connections
  io.on("connection", (socket) => {
    console.log(`New client connected, ${socket.id}`);

    // Handle 'join' event from clients
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);
      try {
        // Update socket ID for the user or captain in the database
        if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error(`Error updating socketId for ${userType} ${userId}:`, error);
      }
    });

    // Handle 'update-location-captain' event from captains
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      // Validate location data
      if (!location || location.lat === undefined || location.lng === undefined) {
        return socket.emit("error", "Invalid location data");
      }

      try {
        // Update captain's location in the database
        await captainModel.findByIdAndUpdate(
          userId,
          {
            $set: {
              location: {
                type: 'Point',
                coordinates: [location.lng, location.lat],
              },
            },
          },
          { new: true } // Return the updated document for confirmation
        );
        console.log(`Location updated for captain ${userId}:`, location);
      } catch (error) {
        console.error(`Error updating location for captain ${userId}:`, error);
      }
    });

    // Handle client disconnections
    socket.on("disconnect", () => {
      console.log(`Client disconnected, ${socket.id}`);
    });
  });
}

// Send a message to a specific socket ID
function sendMessageToSocketId(socketId, messageObject) {
  console.log(`Sending message to ${socketId}:`, messageObject);
  if (io) {
    // Emit the message to the specified socket ID
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};
