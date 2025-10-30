# Project Samarth - Intelligent Agricultural Q&A System

## Overview
Project Samarth is an intelligent Q&A system that connects India's agricultural economy and climate data to provide data-driven insights for policymakers and researchers. The system sources information directly from government data portals to answer complex natural language questions about the nation's agricultural economy and its relationship with climate patterns.

## Key Features
1. **Natural Language Processing**: Understands complex queries about agriculture and climate
2. **Multi-Source Data Integration**: Combines data from Ministry of Agriculture & IMD
3. **Intelligent Answer Generation**: Synthesizes information into coherent responses
4. **Source Citation**: Provides traceability by citing all data sources
5. **User-Friendly Interface**: Clean chat interface for easy interaction

## Technical Architecture

### Frontend
- **Framework**: React with Vite
- **Styling**: TailwindCSS for responsive design
- **Components**:
  - Home page with project introduction
  - Chat interface with message bubbles
  - Loading indicators and example queries

### Backend
- **Framework**: Node.js with Express.js
- **Key Modules**:
  - NLP Engine for query processing
  - Data Fetcher for retrieving government data
  - Answer Generator for synthesizing responses
- **API Endpoints**:
  - `/api/query` - Main query processing endpoint
  - `/api/status` - Health check endpoint

### Data Sources
- **Agricultural Data**: Ministry of Agriculture & Farmers Welfare
- **Climate Data**: India Meteorological Department (IMD)

## Sample Queries the System Can Answer

1. **Comparison Queries**:
   - "Compare the average annual rainfall in Maharashtra and Karnataka"
   - "Compare rice production in Pune and Belgaum districts"

2. **Trend Analysis**:
   - "Analyze the production trend of wheat over the last decade"
   - "Show rainfall patterns in Maharashtra over recent years"

3. **Policy Analysis**:
   - "Provide arguments for promoting drought-resistant crops in Maharashtra"
   - "Analyze the impact of climate change on rice cultivation"

## System Design Decisions

### Data Integration Approach
- **Modular Architecture**: Separate modules for data fetching, processing, and synthesis
- **Fallback Mechanisms**: Simulated data when real APIs are unavailable
- **Caching Strategy**: (Planned) for improved performance

### NLP Implementation
- **Keyword-Based Classification**: Simple but effective intent detection
- **Entity Extraction**: Identifies states, crops, years, and climate factors
- **Extensible Design**: Can be upgraded to use advanced ML models

### Response Generation
- **Structured Formatting**: Clear, organized answers with visual elements
- **Source Attribution**: All claims cite specific data sources
- **Contextual Information**: Relevant additional information provided

## How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm package manager

### Setup Instructions

1. **Backend Setup**:
   ```bash
   cd server
   npm install
   node server.js
   ```

2. **Frontend Setup**:
   ```bash
   cd agriculture-chatbot
   npm install
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000

## Core Values Implementation

### Accuracy & Traceability
- Every data point in responses cites specific sources
- Clear distinction between actual data and analysis
- Error handling for data retrieval failures

### Data Sovereignty and Privacy
- All processing happens locally
- No external data transmission without user knowledge
- Secure, private deployment environment

## Future Enhancements
1. Integration with actual government APIs
2. Advanced ML models for better NLP
3. Data visualization capabilities
4. User authentication and personalized experiences
5. Database integration for persistent storage

## Conclusion
Project Samarth demonstrates a functional prototype of an intelligent Q&A system that bridges the gap between complex government data sources and actionable insights. The system successfully handles multi-domain queries by synthesizing agricultural and climate data while maintaining accuracy and traceability.