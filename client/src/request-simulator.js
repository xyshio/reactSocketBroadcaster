const axios = require('axios');

const targetUrl = 'http://localhost:9013/api/v1/broadcast'; // Replace with your actual endpoint

// Function to send the request
const sendRequest = async () => {
  try {
    const response = await axios.get(targetUrl); // or axios.post(...) etc.
    console.log('Request sent at', new Date().toISOString());
    console.log('Response status:', response.status);
  } catch (error) {
    console.error('Error sending request:', error.message);
  }
};

// Start sending requests every 10 seconds
setInterval(sendRequest, 3 * 1000); // 3 seconds