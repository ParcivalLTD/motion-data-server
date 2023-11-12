const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let motionData = {};

// Endpoint to generate a code and store it on the server
app.get('/generate-code', (req, res) => {
    const code = req.query.code;
    motionData[code] = {}; // Initialize motion data for the code
    res.sendStatus(200);
});

// Endpoint to get motion data based on the entered code
app.get('/get-motion-data', (req, res) => {
    const code = req.query.code;
    const data = motionData[code] || {};
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
