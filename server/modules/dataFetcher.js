/**
 * Data Fetcher Module
 * Handles fetching data from various agricultural and climate data sources
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// In a real implementation, these would be actual API endpoints
// For this prototype, we'll simulate data fetching
const DATA_SOURCES = {
  agricultural: {
    name: "Ministry of Agriculture & Farmers Welfare",
    description: "Crop production, area, and yield statistics",
    url: "https://data.gov.in/api/agricultural-stats"
  },
  climate: {
    name: "India Meteorological Department",
    description: "Rainfall and temperature data",
    url: "https://mausam.imd.gov.in/api/climate-data"
  }
};

/**
 * Fetch agricultural data
 * In a real implementation, this would connect to actual APIs
 */
async function fetchAgriculturalData(queryParams) {
  try {
    // Load sample data
    const sampleData = await loadLocalDataset('sample_agricultural_data.json');
    
    // Filter data based on query parameters
    let filteredData = sampleData;
    
    if (queryParams.states) {
      filteredData = filteredData.filter(item => 
        queryParams.states.some(state => 
          item.state.toLowerCase().includes(state.toLowerCase())
        )
      );
    }
    
    if (queryParams.crops) {
      filteredData = filteredData.filter(item => 
        queryParams.crops.some(crop => 
          item.crop.toLowerCase().includes(crop.toLowerCase())
        )
      );
    }
    
    if (queryParams.years) {
      filteredData = filteredData.filter(item => 
        queryParams.years.includes(item.year)
      );
    }
    
    return {
      source: DATA_SOURCES.agricultural,
      data: filteredData
    };
  } catch (error) {
    // Fallback to simulated data if loading fails
    return {
      source: DATA_SOURCES.agricultural,
      data: [
        {
          state: "Maharashtra",
          district: "Pune",
          crop: "Rice",
          year: 2023,
          season: "Kharif",
          area: 15000,
          production: 30000,
          yield: 2.0
        }
      ]
    };
  }
}

/**
 * Fetch climate data
 * In a real implementation, this would connect to actual APIs
 */
async function fetchClimateData(queryParams) {
  try {
    // Load sample data
    const sampleData = await loadLocalDataset('sample_climate_data.json');
    
    // Filter data based on query parameters
    let filteredData = sampleData;
    
    if (queryParams.states) {
      filteredData = filteredData.filter(item => 
        queryParams.states.some(state => 
          item.state.toLowerCase().includes(state.toLowerCase())
        )
      );
    }
    
    if (queryParams.years) {
      filteredData = filteredData.filter(item => 
        queryParams.years.includes(item.year)
      );
    }
    
    return {
      source: DATA_SOURCES.climate,
      data: filteredData
    };
  } catch (error) {
    // Fallback to simulated data if loading fails
    return {
      source: DATA_SOURCES.climate,
      data: [
        {
          state: "Maharashtra",
          district: "Pune",
          year: 2023,
          rainfall: 1200,
          avg_temp: 26.5,
          max_temp: 38.2,
          min_temp: 18.3
        }
      ]
    };
  }
}

/**
 * Load local dataset files
 */
async function loadLocalDataset(filename) {
  try {
    const filePath = path.join(__dirname, '../data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to load local dataset ${filename}: ${error.message}`);
  }
}

module.exports = {
  fetchAgriculturalData,
  fetchClimateData,
  loadLocalDataset,
  DATA_SOURCES
};