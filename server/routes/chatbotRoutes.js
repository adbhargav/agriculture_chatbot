const express = require('express');
const { handleQuery } = require('../controllers/chatbotController');

const router = express.Router();

// Process natural language query
router.post('/query', handleQuery);

module.exports = router;