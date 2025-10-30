# Samarth Backend Architecture

## Overview
The Samarth backend is designed to fetch and process agricultural and climate data from multiple sources to answer complex natural language queries.

## Architecture Components

### 1. Main Server (server.js)
- Express.js server
- API routes for handling queries
- CORS configuration

### 2. Data Sources
- **Agricultural Data**: 
  - Ministry of Agriculture & Farmers Welfare datasets
  - Crop production, area, yield statistics
- **Climate Data**: 
  - India Meteorological Department (IMD) weather data
  - Rainfall, temperature statistics

### 3. Data Processing Modules
- **Data Fetcher**: Retrieves data from various APIs and sources
- **Data Parser**: Processes raw data into structured format
- **Data Cache**: Caches frequently accessed data for performance

### 4. Query Processing
- **NLP Engine**: Understands natural language queries
- **Query Parser**: Extracts key information from queries
- **Intent Classifier**: Determines the type of analysis required

### 5. Analysis Engine
- **Data Synthesizer**: Combines data from multiple sources
- **Statistical Analyzer**: Performs trend analysis and comparisons
- **Answer Generator**: Creates coherent responses with data sources

### 6. API Routes
- `/api/query`: Main endpoint for processing user queries
- `/api/data`: Endpoint for accessing raw data
- `/api/status`: Health check endpoint

## Data Flow
1. User submits query through frontend
2. Query is processed by NLP engine
3. Relevant data sources are identified
4. Data is fetched and processed
5. Analysis is performed
6. Answer is generated with source citations
7. Response is sent to frontend

## Technologies Used
- Node.js with Express.js
- Axios for HTTP requests
- TensorFlow.js for NLP processing
- CSV parser for data processing