const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

const mobileSockets = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (code) => {
    socket.join(code);
    mobileSockets[code] = socket;
    console.log(`Socket joined room: ${code}`);
  });

  socket.on('motionData', (motionData) => {
    const { code } = motionData;
    io.to(code).emit('motionDataFromMobile', motionData);
  });

  socket.on('checkCode', (enteredCode) => {
    if (mobileSockets[enteredCode]) {
      console.log(`Valid code entered: ${enteredCode}`);
      // You can perform any action here when a valid code is entered
    } else {
      console.log(`Invalid code entered: ${enteredCode}`);
      // You can perform any action here when an invalid code is entered
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
