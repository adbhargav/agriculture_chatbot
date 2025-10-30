/**
 * NLP Model for Query Processing
 * Analyzes natural language queries to extract intent and entities
 */

// Define query patterns and intents
const QUERY_PATTERNS = {
  GREETING: [
    'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening',
    'hola', 'namaste', 'greetings', 'howdy', 'what\'s up', 'how are you',
    'morning', 'evening', 'afternoon', 'yo', 'hi there', 'hello there'
  ],
  COMPARISON: [
    'compare', 'difference between', 'versus', 'vs', 'contrast',
    'which is better', 'which has more', 'which has higher', 'compare the',
    'comparison between', 'show me the difference', 'compare the production',
    'which state has more', 'which crop produces more', 'compare rainfall',
    'compare production of', 'production comparison', 'yield comparison',
    'show me comparison', 'can you compare', 'please compare'
  ],
  TREND_ANALYSIS: [
    'trend', 'analyze', 'pattern', 'over time', 'historical',
    'change over', 'evolution', 'progression', 'trend analysis',
    'show me the trend', 'analyze the pattern', 'how has it changed',
    'what is the trend', 'has it increased', 'has it decreased',
    'growth pattern', 'decline pattern', 'fluctuation', 'variation',
    'analyze the trend', 'study the pattern', 'examine the trend'
  ],
  POLICY_ANALYSIS: [
    'policy', 'scheme', 'recommend', 'suggest', 'argument',
    'support', 'advocate', 'promote', 'replace', 'should',
    'policy recommendation', 'government scheme', 'what should we do',
    'how to improve', 'best practices', 'solution for', 'way to address',
    'strategy for', 'approach to', 'plan for', 'proposal for',
    'government intervention', 'policy measures', 'initiative for'
  ],
  FACTUAL_QUERY: [
    'what is', 'how much', 'how many', 'tell me', 'find',
    'show me', 'list', 'identify', 'district with', 'where is',
    'which state', 'what are', 'give me', 'provide', 'tell me about',
    'information about', 'details of', 'data for', 'statistics of',
    'production of', 'yield of', 'area of', 'rainfall in', 'temperature in',
    'how to', 'explain', 'describe', 'define', 'what does'
  ],
  HELP: [
    'help', 'what can you do', 'how does this work', 'what are you',
    'who are you', 'what is this', 'how to use', 'guide me',
    'show me examples', 'give me examples', 'sample questions',
    'how to ask', 'what questions can i ask'
  ],
  GOODBYE: [
    'bye', 'goodbye', 'see you', 'thanks', 'thank you', 'that\'s all',
    'that\'s it', 'i\'m done', 'exit', 'quit', 'farewell'
  ]
};

// Entity types we want to extract
const ENTITY_TYPES = [
  'STATE', 'DISTRICT', 'CROP', 'YEAR', 'CLIMATE_FACTOR'
];

/**
 * Simple intent classifier based on keyword matching
 * In a production system, this would use a trained ML model
 */
function classifyIntent(query) {
  const lowerQuery = query.toLowerCase().trim();
  
  // Check for empty or very short queries
  if (!lowerQuery || lowerQuery.length < 2) {
    return { intent: 'UNKNOWN', confidence: 0 };
  }
  
  // Check for specific intents first
  const isGreeting = QUERY_PATTERNS.GREETING.some(pattern => 
    lowerQuery === pattern || lowerQuery.startsWith(pattern + ' ') || lowerQuery.endsWith(' ' + pattern)
  );
  
  if (isGreeting) {
    return { intent: 'GREETING', confidence: 0.9 };
  }
  
  const isHelp = QUERY_PATTERNS.HELP.some(pattern => 
    lowerQuery.includes(pattern)
  );
  
  if (isHelp) {
    return { intent: 'HELP', confidence: 0.9 };
  }
  
  const isGoodbye = QUERY_PATTERNS.GOODBYE.some(pattern => 
    lowerQuery === pattern || lowerQuery.startsWith(pattern + ' ') || lowerQuery.endsWith(' ' + pattern)
  );
  
  if (isGoodbye) {
    return { intent: 'GOODBYE', confidence: 0.9 };
  }
  
  let intentScores = {
    GREETING: 0,
    COMPARISON: 0,
    TREND_ANALYSIS: 0,
    POLICY_ANALYSIS: 0,
    FACTUAL_QUERY: 0,
    HELP: 0,
    GOODBYE: 0
  };
  
  // Score each intent based on keyword matches
  Object.keys(QUERY_PATTERNS).forEach(intent => {
    QUERY_PATTERNS[intent].forEach(pattern => {
      // For greeting, goodbye, and help, we need exact match or match at start/end
      if (intent === 'GREETING' || intent === 'GOODBYE' || intent === 'HELP') {
        if (lowerQuery === pattern || lowerQuery.startsWith(pattern + ' ') || lowerQuery.endsWith(' ' + pattern)) {
          intentScores[intent] += 3; // Higher weight for these intents
        }
      } else {
        // For other intents, partial match is okay
        if (lowerQuery.includes(pattern)) {
          intentScores[intent] += 1;
        }
      }
    });
  });
  
  // Find the intent with the highest score
  const detectedIntent = Object.keys(intentScores).reduce((a, b) => 
    intentScores[a] > intentScores[b] ? a : b
  );
  
  // If no intent was detected, default to FACTUAL_QUERY
  const finalIntent = intentScores[detectedIntent] > 0 ? detectedIntent : 'FACTUAL_QUERY';
  
  return {
    intent: finalIntent,
    confidence: intentScores[detectedIntent] > 0 ? 
      Math.min(intentScores[detectedIntent] / 3, 1.0) : 0.5
  };
}

/**
 * Extract entities from query
 */
function extractEntities(query) {
  const entities = {};
  const lowerQuery = query.toLowerCase();
  
  // Simple entity extraction based on common patterns
  // In a real implementation, this would use NER models
  
  // Extract potential states (simplified)
  const indianStates = [
    'maharashtra', 'karnataka', 'tamil nadu', 'kerala', 'telangana',
    'andhra pradesh', 'gujarat', 'rajasthan', 'madhya pradesh', 'uttar pradesh',
    'punjab', 'haryana', 'bihar', 'west bengal', 'odisha', 'chhattisgarh',
    'jharkhand', 'uttarakhand', 'himachal pradesh', 'assam', 'manipur', 'meghalaya',
    'mizoram', 'nagaland', 'tripura', 'sikkim', 'arunachal pradesh', 'goa',
    'delhi', 'chandigarh', 'puducherry', 'ladakh', 'jammu and kashmir'
  ];
  
  const statesFound = indianStates.filter(state => lowerQuery.includes(state));
  if (statesFound.length > 0) {
    entities.states = statesFound;
  }
  
  // Extract potential crops (simplified)
  const crops = [
    'rice', 'wheat', 'maize', 'sugarcane', 'cotton',
    'groundnut', 'soybean', 'tur', 'gram', 'moong',
    'masoor', 'barley', 'jowar', 'bajra', 'ragi',
    'jute', 'tea', 'coffee', 'rubber', 'banana',
    'mango', 'orange', 'grapes', 'apple', 'potato',
    'onion', 'tomato', 'brinjal', 'cabbage', 'cauliflower'
  ];
  
  const cropsFound = crops.filter(crop => lowerQuery.includes(crop));
  if (cropsFound.length > 0) {
    entities.crops = cropsFound;
  }
  
  // Extract potential years
  const yearMatches = query.match(/\b(19|20)\d{2}\b/g);
  if (yearMatches) {
    entities.years = yearMatches.map(y => parseInt(y));
  }
  
  // Extract climate factors
  const climateFactors = ['rainfall', 'temperature', 'humidity', 'precipitation', 'climate', 'weather'];
  const climateFound = climateFactors.filter(factor => lowerQuery.includes(factor));
  if (climateFound.length > 0) {
    entities.climateFactors = climateFound;
  }
  
  // Extract seasons
  const seasons = ['kharif', 'rabi', 'zaid', 'summer', 'winter', 'monsoon'];
  const seasonsFound = seasons.filter(season => lowerQuery.includes(season));
  if (seasonsFound.length > 0) {
    entities.seasons = seasonsFound;
  }
  
  return entities;
}

/**
 * Parse a natural language query into structured components
 */
function parseQuery(query) {
  const intent = classifyIntent(query);
  const entities = extractEntities(query);
  
  return {
    originalQuery: query,
    intent: intent.intent,
    confidence: intent.confidence,
    entities: entities,
    requiresAgriculturalData: entities.crops || entities.states || intent.intent === 'POLICY_ANALYSIS',
    requiresClimateData: entities.climateFactors || entities.seasons || intent.intent === 'POLICY_ANALYSIS'
  };
}

module.exports = {
  parseQuery
};