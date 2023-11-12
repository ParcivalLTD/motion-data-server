const express = require('express');
const app = express();

// Serve HTML file
app.use(express.static('public'));

// Endpoint to get motion data
app.get('/motion-data', (req, res) => {
    // Mock motion data for demonstration purposes
    const motionData = {
        accelerometer: { x: 0.1, y: 0.2, z: 9.8 },
        gyroscope: { alpha: 0.01, beta: 0.02, gamma: 0.03 },
    };

    res.json(motionData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
