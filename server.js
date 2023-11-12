const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for motion data from the PC
    socket.on("sendMotionData", (data) => {
        // Broadcast the motion data to all connected clients
        io.emit("motionData", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
