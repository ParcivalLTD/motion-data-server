// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors()); // Enable CORS for all routes

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('motionData', (data) => {
    console.log('Motion data received:', data);
    // Process and handle motion data as needed
    io.emit('motionData', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
