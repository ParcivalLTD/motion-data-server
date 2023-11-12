// netlify/functions/motion.js

const motionData = {};

exports.handler = async function (event, context) {
  if (event.httpMethod === "POST") {
    const { acceleration, rotationRate } = JSON.parse(event.body);
    motionData.acceleration = acceleration;
    motionData.rotationRate = rotationRate;
    console.log("Received motion data:", motionData);
    return {
      statusCode: 200,
      body: "Motion data received successfully.",
    };
  } else if (event.httpMethod === "GET") {
    if (Object.keys(motionData).length !== 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(motionData),
      };
    } else {
      return {
        statusCode: 404,
        body: "Motion data not available.",
      };
    }
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};
