import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'; // Your Home component
import Profile from './components/Profile'; // Your Profile component
import ChatBot from './components/ChatBot'; // Your ChatBot component
import LogIn from './components/LogIn';
import './App.css'; // Your CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ChatBot">ChatBot</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/LogIn">LogIn</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ChatBot" element={<ChatBot />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
