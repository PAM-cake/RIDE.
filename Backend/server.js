const http = require("http")
const app = require("./app")
const { initializeSocket } = require("./socket");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Import and initialize socket
initializeSocket(server);

server.listen(port,()=>{
    console.log(`Running on port ${port}`);
    
})