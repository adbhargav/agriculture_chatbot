const axios = require('axios');

async function testGreetings() {
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'namaste'];
  
  for (const greeting of greetings) {
    try {
      console.log(`Testing: "${greeting}"`);
      const response = await axios.post('http://localhost:5000/api/query', {
        query: greeting
      });
      console.log(`Response: ${response.data.answer.substring(0, 50)}...\n`);
    } catch (error) {
      console.error(`Error with "${greeting}":`, error.message);
    }
  }
}

testGreetings();