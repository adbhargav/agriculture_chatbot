const { parseQuery } = require('../model/nlpModel');
const { fetchAgriculturalData, fetchClimateData } = require('../modules/dataFetcher');

/**
 * Handle incoming chat queries
 */
async function handleQuery(req, res) {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    // Process the natural language query
    const parsedQuery = parseQuery(query);
    
    // Handle specific intents separately
    if (parsedQuery.intent === 'GREETING') {
      return res.json({
        answer: generateGreetingResponse(),
        intent: 'GREETING',
        entities: {},
        sources: []
      });
    }
    
    if (parsedQuery.intent === 'HELP') {
      return res.json({
        answer: generateHelpResponse(),
        intent: 'HELP',
        entities: {},
        sources: []
      });
    }
    
    if (parsedQuery.intent === 'GOODBYE') {
      return res.json({
        answer: generateGoodbyeResponse(),
        intent: 'GOODBYE',
        entities: {},
        sources: []
      });
    }
    
    // Fetch required data based on query analysis
    const dataSources = [];
    let agriculturalData = null;
    let climateData = null;
    
    if (parsedQuery.requiresAgriculturalData) {
      agriculturalData = await fetchAgriculturalData(parsedQuery.entities);
      dataSources.push(agriculturalData.source);
    }
    
    if (parsedQuery.requiresClimateData) {
      climateData = await fetchClimateData(parsedQuery.entities);
      dataSources.push(climateData.source);
    }
    
    // Generate answer based on intent and data
    const answer = generateAnswer(parsedQuery, agriculturalData, climateData, dataSources);
    
    res.json({
      answer: answer,
      intent: parsedQuery.intent,
      entities: parsedQuery.entities,
      sources: dataSources.map(source => ({
        name: source.name,
        description: source.description
      }))
    });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ 
      error: 'Failed to process query',
      details: error.message 
    });
  }
}

/**
 * Generate greeting response
 */
function generateGreetingResponse() {
  const greetings = [
    "Hello! 👋 I'm Samarth, your agricultural insights assistant. How can I help you today?",
    "Hi there! 🌾 I'm here to help you with agricultural and climate data. What would you like to know?",
    "Greetings! 🌱 I can help you analyze crop production, rainfall patterns, and agricultural policies. Ask me anything!",
    "Namaste! 🙏 I'm Samarth, ready to provide insights on India's agricultural economy. What can I assist you with?",
    "Good day! 🌞 I'm your agricultural data assistant. I can help you with crop production, rainfall data, and policy analysis."
  ];
  
  return greetings[Math.floor(Math.random() * greetings.length)];
}

/**
 * Generate help response
 */
function generateHelpResponse() {
  return `I'm Samarth, your agricultural insights assistant! 🌾 I can help you with:

📊 **Data Analysis:**
• Compare crop production between states
• Analyze rainfall and temperature trends
• Examine crop yield patterns over time

📋 **Policy Insights:**
• Recommend agricultural policies
• Suggest climate adaptation strategies
• Provide evidence-based recommendations

🔍 **Factual Information:**
• Crop production statistics
• State-wise agricultural data
• Climate information

**Try asking questions like:**
• "Compare rice production in Maharashtra and Karnataka"
• "Show me rainfall trends in Punjab"
• "Suggest policies for drought-resistant crops"
• "What is the wheat production in Madhya Pradesh?"

I'll always cite my data sources so you know where the information comes from! 📚`;
}

/**
 * Generate goodbye response
 */
function generateGoodbyeResponse() {
  const goodbyes = [
    "Goodbye! 👋 Thanks for using Samarth. Feel free to come back anytime for more agricultural insights!",
    "See you later! 🌾 Hope I was able to help with your agricultural data needs!",
    "Farewell! 🌱 Remember, I'm here whenever you need agricultural and climate data insights!",
    "Thanks for visiting! 🙏 Come back soon for more data-driven agricultural insights!",
    "Take care! 🌞 Hope you found the information you were looking for!"
  ];
  
  return goodbyes[Math.floor(Math.random() * goodbyes.length)];
}

/**
 * Generate answer based on query intent and data
 */
function generateAnswer(parsedQuery, agriculturalData, climateData, dataSources) {
  const { intent, entities } = parsedQuery;
  
  switch (intent) {
    case 'COMPARISON':
      return generateComparisonAnswer(entities, agriculturalData, climateData, dataSources);
      
    case 'TREND_ANALYSIS':
      return generateTrendAnswer(entities, agriculturalData, climateData, dataSources);
      
    case 'POLICY_ANALYSIS':
      return generatePolicyAnswer(entities, agriculturalData, climateData, dataSources);
      
    case 'FACTUAL_QUERY':
    default:
      return generateFactualAnswer(entities, agriculturalData, climateData, dataSources);
  }
}

/**
 * Generate comparison answer
 */
function generateComparisonAnswer(entities, agriculturalData, climateData, dataSources) {
  let answer = "📊 **Comparison Analysis**\n\n";
  
  if (entities.states && entities.states.length >= 2) {
    answer += `Comparing agricultural and climate data between **${entities.states.slice(0, 2).join('** and **')}**:\n\n`;
    
    if (agriculturalData && agriculturalData.data.length > 0) {
      answer += "🌾 **Agricultural Data:**\n";
      const stateData = agriculturalData.data.filter(d => entities.states.some(state => d.state.toLowerCase().includes(state)));
      
      if (stateData.length > 0) {
        // Group by state
        const stateGroups = {};
        stateData.forEach(item => {
          if (!stateGroups[item.state]) stateGroups[item.state] = [];
          stateGroups[item.state].push(item);
        });
        
        Object.keys(stateGroups).forEach(state => {
          answer += `\n**${state}:**\n`;
          stateGroups[state].slice(0, 3).forEach(item => {
            answer += `  • ${item.crop}: ${item.production.toLocaleString()} tonnes from ${item.area.toLocaleString()} hectares (Yield: ${item.yield} T/Ha)\n`;
          });
        });
      } else {
        answer += "  • No specific agricultural data found for these states.\n";
      }
      answer += "\n";
    }
    
    if (climateData && climateData.data.length > 0) {
      answer += "🌧️ **Climate Data:**\n";
      const stateClimate = climateData.data.filter(d => entities.states.some(state => d.state.toLowerCase().includes(state)));
      
      if (stateClimate.length > 0) {
        // Group by state
        const stateGroups = {};
        stateClimate.forEach(item => {
          if (!stateGroups[item.state]) stateGroups[item.state] = [];
          stateGroups[item.state].push(item);
        });
        
        Object.keys(stateGroups).forEach(state => {
          answer += `\n**${state}:**\n`;
          stateGroups[state].slice(0, 3).forEach(item => {
            answer += `  • Avg. Rainfall: ${item.rainfall}mm | Avg. Temperature: ${item.avg_temp}°C\n`;
          });
        });
      } else {
        answer += "  • No specific climate data found for these states.\n";
      }
      answer += "\n";
    }
  } else if (entities.crops && entities.crops.length >= 2) {
    answer += `Comparing data for **${entities.crops.slice(0, 2).join('** and **')}**:\n\n`;
    
    if (agriculturalData && agriculturalData.data.length > 0) {
      answer += "🌾 **Production Data:**\n";
      const cropData = agriculturalData.data.filter(d => 
        entities.crops.some(crop => d.crop.toLowerCase().includes(crop))
      );
      
      if (cropData.length > 0) {
        // Group by crop
        const cropGroups = {};
        cropData.forEach(item => {
          if (!cropGroups[item.crop]) cropGroups[item.crop] = [];
          cropGroups[item.crop].push(item);
        });
        
        Object.keys(cropGroups).forEach(crop => {
          answer += `\n**${crop}:**\n`;
          cropGroups[crop].slice(0, 3).forEach(item => {
            answer += `  • ${item.state}: ${item.production.toLocaleString()} tonnes from ${item.area.toLocaleString()} hectares\n`;
          });
        });
      } else {
        answer += "  • No specific production data found for these crops.\n";
      }
      answer += "\n";
    }
  } else {
    answer += "I can help you compare data. Please specify what you'd like to compare (e.g., states or crops).\n\n";
    answer += "**Examples:**\n";
    answer += "• Compare rice production in Maharashtra and Karnataka\n";
    answer += "• Show me the difference in rainfall between Punjab and Haryana\n";
  }
  
  if (dataSources.length > 0) {
    answer += "📚 **Data Sources:**\n";
    dataSources.forEach((source, index) => {
      answer += `${index + 1}. **${source.name}** - ${source.description}\n`;
    });
  }
  
  return answer;
}

/**
 * Generate trend analysis answer
 */
function generateTrendAnswer(entities, agriculturalData, climateData, dataSources) {
  let answer = "📈 **Trend Analysis**\n\n";
  
  if (entities.crops && entities.crops.length > 0) {
    answer += `Analyzing trends for **${entities.crops[0]}** cultivation:\n\n`;
    
    if (agriculturalData && agriculturalData.data.length > 0) {
      answer += "🌾 **Production Trends:**\n";
      const cropData = agriculturalData.data.filter(d => d.crop.toLowerCase() === entities.crops[0]);
      
      if (cropData.length > 0) {
        // Group by state/district
        const locationGroups = {};
        cropData.forEach(item => {
          const location = `${item.state} (${item.district})`;
          if (!locationGroups[location]) locationGroups[location] = [];
          locationGroups[location].push(item);
        });
        
        Object.keys(locationGroups).forEach(location => {
          answer += `\n**${location}:**\n`;
          locationGroups[location].slice(0, 5).forEach(item => {
            answer += `  • ${item.year}: ${item.production.toLocaleString()} tonnes from ${item.area.toLocaleString()} hectares\n`;
          });
        });
      } else {
        answer += "No specific data found for this crop.\n";
      }
      answer += "\n";
    }
  } else if (entities.states && entities.states.length > 0) {
    answer += `Analyzing trends for **${entities.states[0]}**:\n\n`;
    
    if (agriculturalData && agriculturalData.data.length > 0) {
      answer += "🌾 **Agricultural Trends:**\n";
      const stateData = agriculturalData.data.filter(d => d.state.toLowerCase().includes(entities.states[0]));
      
      if (stateData.length > 0) {
        // Group by crop
        const cropGroups = {};
        stateData.forEach(item => {
          if (!cropGroups[item.crop]) cropGroups[item.crop] = [];
          cropGroups[item.crop].push(item);
        });
        
        Object.keys(cropGroups).forEach(crop => {
          answer += `\n**${crop}:**\n`;
          cropGroups[crop].slice(0, 3).forEach(item => {
            answer += `  • ${item.year}: ${item.production.toLocaleString()} tonnes\n`;
          });
        });
      } else {
        answer += "No specific agricultural data found for this state.\n";
      }
      answer += "\n";
    }
    
    if (climateData && climateData.data.length > 0) {
      answer += "🌡️ **Climate Trends:**\n";
      const stateClimate = climateData.data.filter(d => d.state.toLowerCase().includes(entities.states[0]));
      
      if (stateClimate.length > 0) {
        stateClimate.slice(0, 5).forEach(item => {
          answer += `  • ${item.year}: ${item.rainfall}mm rainfall, ${item.avg_temp}°C average temperature\n`;
        });
      } else {
        answer += "No specific climate data found for this state.\n";
      }
      answer += "\n";
    }
  } else if (entities.climateFactors && entities.climateFactors.length > 0) {
    answer += `Analyzing trends for **${entities.climateFactors[0]}**:\n\n`;
    
    if (climateData && climateData.data.length > 0) {
      answer += "📊 **Climate Data Trends:**\n";
      const factorData = climateData.data.filter(d => 
        entities.climateFactors.some(factor => 
          d.state.toLowerCase().includes(factor) || 
          JSON.stringify(d).toLowerCase().includes(factor)
        )
      );
      
      if (factorData.length > 0) {
        // Group by state
        const stateGroups = {};
        factorData.forEach(item => {
          if (!stateGroups[item.state]) stateGroups[item.state] = [];
          stateGroups[item.state].push(item);
        });
        
        Object.keys(stateGroups).forEach(state => {
          answer += `\n**${state}:**\n`;
          stateGroups[state].slice(0, 3).forEach(item => {
            answer += `  • ${item.year}: ${item.rainfall}mm rainfall, ${item.avg_temp}°C average temperature\n`;
          });
        });
      } else {
        answer += "No specific climate data found.\n";
      }
      answer += "\n";
    }
  } else {
    answer += "I can help analyze trends. Please specify what you'd like to analyze (e.g., a specific crop, state, or climate factor).\n\n";
    answer += "**Examples:**\n";
    answer += "• Show me the trend for wheat production in Punjab\n";
    answer += "• Analyze rainfall patterns in Maharashtra\n";
    answer += "• What is the temperature trend in Karnataka?\n";
  }
  
  if (dataSources.length > 0) {
    answer += "📚 **Data Sources:**\n";
    dataSources.forEach((source, index) => {
      answer += `${index + 1}. **${source.name}** - ${source.description}\n`;
    });
  }
  
  return answer;
}

/**
 * Generate policy analysis answer
 */
function generatePolicyAnswer(entities, agriculturalData, climateData, dataSources) {
  let answer = "📋 **Policy Analysis**\n\n";
  
  answer += "Based on the available data, here are compelling arguments for agricultural policy decisions:\n\n";
  
  if (agriculturalData && climateData && agriculturalData.data.length > 0 && climateData.data.length > 0) {
    answer += "1. 🌾 **Crop Selection Strategy:** Data shows significant variation in crop yields across regions, suggesting region-specific crop policies tailored to local conditions.\n\n";
    answer += "2. 🌧️ **Climate Adaptation Planning:** Climate data reveals temperature and rainfall patterns that can inform drought-resistant crop promotion and water management strategies.\n\n";
    answer += "3. 📊 **Evidence-Based Resource Allocation:** Combining agricultural production data with climate information enables data-driven policy making and efficient resource distribution.\n\n";
  } else if (agriculturalData && agriculturalData.data.length > 0) {
    answer += "1. 🌾 **Production Optimization:** Agricultural data shows variations in crop yields that can inform resource allocation and best practices sharing between regions.\n\n";
    answer += "2. 📈 **Growth Opportunities:** Regional production data highlights areas for agricultural expansion and investment opportunities.\n\n";
    answer += "3. 🌍 **Regional Planning:** State-wise crop data can guide targeted agricultural policies and support programs.\n\n";
  } else if (climateData && climateData.data.length > 0) {
    answer += "1. 🌡️ **Climate Resilience:** Temperature data suggests regions that may need climate-adaptive agricultural practices and infrastructure development.\n\n";
    answer += "2. 💧 **Water Management:** Rainfall patterns can inform irrigation planning and water conservation policies.\n\n";
    answer += "3. 🌪️ **Risk Mitigation:** Climate data helps identify regions vulnerable to extreme weather events and plan appropriate safeguards.\n\n";
  } else {
    answer += "1. 📚 **Data Integration Approach:** Combining agricultural and climate data provides comprehensive insights for policy making and long-term planning.\n\n";
    answer += "2. 🎯 **Targeted Interventions:** Region-specific data enables more effective and efficient policy implementation.\n\n";
    answer += "3. 🔄 **Continuous Monitoring:** Regular data analysis helps track policy effectiveness and adapt strategies over time.\n\n";
  }
  
  if (entities.states && entities.states.length > 0) {
    answer += `**Recommendations for ${entities.states[0]}:**\n\n`;
    answer += "• Develop state-specific agricultural policies based on local climate and soil conditions\n";
    answer += "• Invest in climate-resilient infrastructure and crop varieties\n";
    answer += "• Establish data-driven monitoring systems for continuous improvement\n\n";
  }
  
  if (entities.crops && entities.crops.length > 0) {
    answer += `**Recommendations for ${entities.crops[0]} cultivation:**\n\n`;
    answer += "• Promote best practices based on high-yield regions\n";
    answer += "• Develop support programs for low-performing areas\n";
    answer += "• Create market linkages to ensure farmer profitability\n\n";
  }
  
  if (dataSources.length > 0) {
    answer += "📚 **Data Sources:**\n";
    dataSources.forEach((source, index) => {
      answer += `${index + 1}. **${source.name}** - ${source.description}\n`;
    });
  }
  
  return answer;
}

/**
 * Generate factual answer
 */
function generateFactualAnswer(entities, agriculturalData, climateData, dataSources) {
  let answer = "ℹ️ **Information Request**\n\n";
  
  if (entities.crops && entities.crops.length > 0) {
    answer += `**Information about ${entities.crops[0]}:**\n\n`;
    
    if (agriculturalData && agriculturalData.data.length > 0) {
      const cropData = agriculturalData.data.find(d => d.crop.toLowerCase() === entities.crops[0]);
      
      if (cropData) {
        answer += `• **Production:** ${cropData.production.toLocaleString()} tonnes\n`;
        answer += `• **Area:** ${cropData.area.toLocaleString()} hectares\n`;
        answer += `• **Yield:** ${cropData.yield} tonnes/hectare\n`;
        answer += `• **Location:** ${cropData.district}, ${cropData.state}\n`;
        answer += `• **Year:** ${cropData.year}\n\n`;
      } else {
        answer += `I found some data about **${entities.crops[0]}**:\n`;
        const allCropData = agriculturalData.data.filter(d => d.crop.toLowerCase() === entities.crops[0]);
        
        if (allCropData.length > 0) {
          allCropData.slice(0, 5).forEach(data => {
            answer += `• ${data.state} (${data.district}): ${data.production.toLocaleString()} tonnes from ${data.area.toLocaleString()} hectares (Yield: ${data.yield} T/Ha)\n`;
          });
          answer += "\n";
        } else {
          answer += "No specific data available for this crop.\n\n";
        }
      }
    }
  }
  
  if (entities.states && entities.states.length > 0) {
    answer += `**Information about ${entities.states[0]}:**\n\n`;
    
    if (agriculturalData && agriculturalData.data.length > 0) {
      const stateData = agriculturalData.data.filter(d => d.state.toLowerCase().includes(entities.states[0]));
      
      if (stateData.length > 0) {
        answer += "🌾 **Agricultural Highlights:**\n";
        // Group by crop
        const cropGroups = {};
        stateData.slice(0, 10).forEach(data => {
          if (!cropGroups[data.crop]) cropGroups[data.crop] = [];
          cropGroups[data.crop].push(data);
        });
        
        Object.keys(cropGroups).forEach(crop => {
          const cropData = cropGroups[crop][0]; // Take the first entry for each crop
          answer += `• ${crop}: ${cropData.production.toLocaleString()} tonnes from ${cropData.area.toLocaleString()} hectares\n`;
        });
        answer += "\n";
      }
    }
    
    if (climateData && climateData.data.length > 0) {
      const stateClimate = climateData.data.filter(d => d.state.toLowerCase().includes(entities.states[0]));
      
      if (stateClimate.length > 0) {
        answer += "🌡️ **Climate Information:**\n";
        stateClimate.slice(0, 5).forEach(data => {
          answer += `• ${data.year}: ${data.rainfall}mm rainfall, ${data.avg_temp}°C average temperature\n`;
        });
        answer += "\n";
      }
    }
    
    if (!agriculturalData && !climateData) {
      answer += "I can provide information about this state's agricultural and climate data. Please be more specific about what you're looking for.\n\n";
    }
  }
  
  if (entities.climateFactors && entities.climateFactors.length > 0) {
    answer += `**Information about ${entities.climateFactors[0]}:**\n\n`;
    
    if (climateData && climateData.data.length > 0) {
      answer += "📊 **Climate Data:**\n";
      climateData.data.slice(0, 5).forEach(data => {
        answer += `• ${data.state} (${data.district}): ${data.year} - ${data.rainfall}mm rainfall, ${data.avg_temp}°C average temperature\n`;
      });
      answer += "\n";
    }
  }
  
  if (dataSources.length > 0) {
    answer += "📚 **Data Sources:**\n";
    dataSources.forEach((source, index) => {
      answer += `${index + 1}. **${source.name}** - ${source.description}\n`;
    });
  } else if (!entities.crops && !entities.states && !entities.climateFactors) {
    answer += "I can help you with information about crops, states, and climate data. Try asking about specific crops or regions.\n\n";
    answer += "**Examples:**\n";
    answer += "• What is the rice production in West Bengal?\n";
    answer += "• Show me rainfall data for Rajasthan\n";
    answer += "• Tell me about wheat cultivation in Punjab\n";
  }
  
  return answer;
}

module.exports = {
  handleQuery
};