const axios = require('axios');

async function testQueries() {
  const queries = [
    'compare rice production in maharashtra and karnataka',
    'show me rainfall trends in pune',
    'suggest policy for drought-resistant crops',
    'what is the production of wheat in maharashtra'
  ];
  
  for (const query of queries) {
    try {
      console.log(`Testing: "${query}"`);
      const response = await axios.post('http://localhost:5000/api/query', {
        query: query
      });
      console.log(`Intent: ${response.data.intent}`);
      console.log(`Response: ${response.data.answer.substring(0, 100)}...\n`);
    } catch (error) {
      console.error(`Error with "${query}":`, error.message);
    }
  }
}

testQueries();