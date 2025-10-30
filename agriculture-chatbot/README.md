# Project Samarth - Intelligent Agricultural Q&A System

An intelligent Q&A system that connects India's agricultural economy and climate data to provide data-driven insights for policymakers and researchers.

## Overview

Project Samarth is a prototype of an intelligent question-answering system designed to help policymakers and researchers derive cross-domain insights from government datasets. The system sources information directly from data.gov.in and related portals to answer complex natural language questions about India's agricultural economy and its relationship with climate patterns.

## Features

- **Natural Language Processing**: Understands complex queries about agriculture and climate
- **Multi-Source Data Integration**: Combines data from Ministry of Agriculture & IMD
- **Intelligent Answer Generation**: Synthesizes information into coherent responses
- **Source Citation**: Provides traceability by citing all data sources
- **User-Friendly Interface**: Clean chat interface with example queries

## Project Structure

```
.
├── agriculture-chatbot/     # Frontend React application
│   ├── src/
│   │   ├── components/     # ChatBox and MessageBubble components
│   │   └── pages/          # Home page
│   └── ...
├── server/                 # Backend Node.js server
│   ├── controllers/        # Request handlers
│   ├── model/              # NLP processing
│   ├── modules/            # Data fetching and processing
│   ├── routes/             # API routes
│   └── data/               # Sample datasets
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm package manager

### Installation

1. **Install backend dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Install frontend dependencies**:
   ```bash
   cd agriculture-chatbot
   npm install
   ```

### Running the Application

1. **Start the backend server**:
   ```bash
   cd server
   node server.js
   ```
   The server will start on http://localhost:5000

2. **Start the frontend development server**:
   ```bash
   cd agriculture-chatbot
   npm run dev
   ```
   The frontend will be available at http://localhost:5174 (or next available port)

### Testing the API

You can test the API directly with a POST request:

```bash
curl -X POST http://localhost:5000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Compare rice production in Maharashtra and Karnataka"}'
```

## Sample Queries

Try these sample queries to see the system in action:

1. **Comparison**: "Compare rice production in Maharashtra and Karnataka"
2. **Trend Analysis**: "Show me rainfall trends in Pune district"
3. **Policy Analysis**: "Analyze policy for promoting drought-resistant crops"

## Architecture

### Frontend
- Built with React and Vite for fast development
- Styled with TailwindCSS for responsive design
- Features a chat interface with message bubbles and loading indicators

### Backend
- Node.js with Express.js framework
- Modular design with separate controllers, models, and modules
- NLP processing for query understanding
- Data fetching from simulated government APIs

## Data Sources

The system is designed to work with data from:
- **Ministry of Agriculture & Farmers Welfare**: Crop production, area, and yield statistics
- **India Meteorological Department (IMD)**: Rainfall and temperature data

For this prototype, sample datasets are included to demonstrate functionality.

## Core Values

### Accuracy & Traceability
- Every claim in responses cites specific data sources
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
4. Database integration for persistent storage
5. User authentication and personalized experiences

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Government of India for providing open data through data.gov.in
- Ministry of Agriculture & Farmers Welfare and India Meteorological Department for the datasets