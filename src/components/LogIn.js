import React, {useState, useEffect} from 'react';
import './LogIn.css';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate



const LogIn = () => {
    // State to manage user information and login 
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user data is in localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
    
        if (storedUser) {
          setUser(storedUser); // Set the user state with stored data
        }
      }, []);
    

    // Success callback when user logs in
  const responseMessage = (response) => {
    const token = response.credential;
    if (token) {
      const userProfile = parseJwt(token);
      setUser(userProfile); // Store user data in state
      localStorage.setItem('user', JSON.stringify(userProfile)); 
    }
    navigate('/'); 
  
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error parsing JWT token", e);
      return null;
    }
  };

    const errorMessage = (error) => {
        console.log(error);
        
    };
    const handleLogout = () => {
        setUser(null); // Clear user state
        localStorage.removeItem('user'); // Remove user data from localStorage
        // Navigate to Home after logout
    };
    return (
        <div class="log">
            <div class="card">
                <div class="cardContent">
                    <h1>Log In</h1>
                    <p>Welcome to the user profile page.</p>
                    {user ? (
                        <div>
                        <h2>Welcome, {user.name}</h2>
                        <p>Email: {user.email}</p>
                        <button onClick={handleLogout}>Log Out</button>
                        </div>
                    ) : (
                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                    )}
                </div>    
            </div>
        </div>
    );
};

export default LogIn;