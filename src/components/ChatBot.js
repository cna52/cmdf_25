import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId] = useState(Date.now().toString());
  const [user, setUser] = useState(null); // State to store user data
  const chatWindowRef = useRef(null);

  // Fetch user data from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    try {
      // Call backend server
      const response = await axios.post(
        'http://localhost:3001/api/chat',
        { message: input, userId }
      );

      // Add formatted bot response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.response, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Failed to get a response from the bot.', sender: 'bot' },
      ]);
    }

    setInput('');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div ref={chatWindowRef} style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage),
              }}
            >
              <strong>{msg.sender === 'user' ? (user ? user.name : 'You') : 'Bot'}:</strong>
              {msg.sender === 'bot' ? (
                <div dangerouslySetInnerHTML={{ __html: formatBotMessage(msg.text) }} />
              ) : (
                <span> {msg.text}</span>
              )}
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to format bot responses properly
const formatBotMessage = (text) => {
  if (!text) return '';

  // Convert **text** to <strong>text</strong> for bold formatting
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert new lines into <br> for proper formatting
  formattedText = formattedText.replace(/\n/g, '<br>');

  // Convert single * to bullet points
  formattedText = formattedText.replace(/\* (.+)/g, '<li>$1</li>');

  // Wrap bullet points in <ul> if there are any <li> tags
  if (formattedText.includes('<li>')) {
    formattedText = `<ul>${formattedText}</ul>`;
  }

  return formattedText;
};

export default Chat;

// Styles
const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '600px', // Increased height
    width: '500px', // Increased width
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    overflowY: 'scroll',
    backgroundColor: '#fff',
  },
  message: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  userMessage: {
    backgroundColor: '#007bff',
    color: '#fff',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  botMessage: {
    backgroundColor: '#e9ecef',
    color: '#000',
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
};