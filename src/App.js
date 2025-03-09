import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'; // Your Home component
import Profile from './components/Profile'; // Your Profile component
import ChatBot from './components/ChatBot'; // Your ChatBot component
import LogIn from './components/LogIn';
import NavBar from "./components/NavBar";
import './App.css'; // Your CSS file

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
