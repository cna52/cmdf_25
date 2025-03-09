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

// Define the model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// System prompt to initialize Gemini as a medical assistant
const systemPrompt = `
You are a medical assistant. Help the user like they are your patient. Dont ask a lot of questions ask 3 max and give a diagnosis and treatment plan. Dont say that this information is not reliable. Act like you are a medical professional.
`;

// Store chat sessions per user (in-memory, for demonstration purposes)
const userChatSessions = new Map();

// Initialize the chat session with the system prompt
function initializeChatSession(userId) {
  const chatSession = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will collect all necessary information before providing a diagnosis or treatment plan.' }],
      },
    ],
  });
  userChatSessions.set(userId, chatSession);
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Initialize the chat session if it doesn't exist
    if (!userChatSessions.has(userId)) {
      initializeChatSession(userId);
    }

    // Get the chat session for the user
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