const axios = require('axios');

async function testGreeting() {
  try {
    const response = await axios.post('http://localhost:5000/api/query', {
      query: 'hello'
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGreeting();