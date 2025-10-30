const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatbotRoutes = require('./routes/chatbotRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatbotRoutes);

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});