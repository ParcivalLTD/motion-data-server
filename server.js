const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let motionData = null;

app.post('/api/motion', (req, res) => {
    motionData = req.body;
    console.log('Received motion data:', motionData);
    res.status(200).send('Motion data received successfully.');
});

app.get('/api/motion', (req, res) => {
    if (motionData) {
        res.status(200).json(motionData);
    } else {
        res.status(404).send('Motion data not available.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
