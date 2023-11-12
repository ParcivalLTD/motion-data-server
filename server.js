const https = require('https');
const express = require('express');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = https.createServer({
  cert: fs.readFileSync('path/to/cert.pem'), // Replace with your SSL certificate path
  key: fs.readFileSync('path/to/key.pem'),   // Replace with your SSL private key path
}, app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('Client connected');
    clients.add(ws);

    // Handle incoming motion data from the client
    ws.on('message', (data) => {
        const motionData = JSON.parse(data);
        console.log('Received motion data:', motionData);

        // Broadcast the motion data to all connected clients
        broadcastMotionData(motionData);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

// Broadcast motion data to all connected clients
function broadcastMotionData(data) {
    const serializedData = JSON.stringify(data);
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(serializedData);
        }
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
