const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected, ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);
      try {
        if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error(`Error updating socketId for ${userType} ${userId}:`, error);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
    
      if (!location || location.lat === undefined || location.lng === undefined) {
        return socket.emit("error", "Invalid location data");
      }
    
      try {
        // Update captain's location directly
        await captainModel.findByIdAndUpdate(
          userId,
          {
            $set: {
              location: {
                lat: location.lat,
                lng: location.lng,
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

    socket.on("disconnect", () => {
      console.log(`Client disconnected, ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.error("Socket.io is not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId
};
