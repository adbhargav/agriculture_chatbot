const axios = require('axios');

async function testEnhancedNLP() {
  const testQueries = [
    // Greetings
    'hello',
    'hi there',
    'good morning',
    'namaste',
    
    // Help requests
    'help',
    'what can you do',
    'how does this work',
    
    // Goodbye
    'bye',
    'thanks',
    'thank you',
    
    // Comparisons
    'compare rice production in maharashtra and karnataka',
    'show me the difference in rainfall between punjab and haryana',
    
    // Trend analysis
    'analyze the trend for wheat production in madhya pradesh',
    'show me rainfall patterns in rajasthan',
    
    // Policy analysis
    'suggest policies for drought-resistant crops',
    'what should we do about declining yields in uttar pradesh',
    
    // Factual queries
    'what is the rice production in west bengal',
    'show me temperature data for tamil nadu',
    'tell me about wheat cultivation in punjab'
  ];
  
  console.log('Testing Enhanced NLP Model\n');
  
  for (const query of testQueries) {
    try {
      console.log(`Query: "${query}"`);
      const response = await axios.post('http://localhost:5000/api/query', {
        query: query
      });
      
      console.log(`Intent: ${response.data.intent}`);
      console.log(`Answer Preview: ${response.data.answer.substring(0, 100)}...\n`);
    } catch (error) {
      console.error(`Error with "${query}":`, error.message);
    }
  }
}

testEnhancedNLP();