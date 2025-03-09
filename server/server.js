require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model and generation config
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Store chat sessions per user (in-memory, for demonstration purposes)
const userChatSessions = new Map();

// Initialize the chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Get or create chat session for the user
    if (!userChatSessions.has(userId)) {
      userChatSessions.set(userId, model.startChat({
        generationConfig,
        history: [],
      }));
    }
    const chatSession = userChatSessions.get(userId);

    // Send the user's message to Gemini
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || 'No additional details available',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});