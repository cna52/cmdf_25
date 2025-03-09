import React, {useState, useEffect} from 'react';
import './LogIn.css';
import { GoogleLogin } from '@react-oauth/google';



const LogIn = () => {
    // State to manage user information and login 
    const [user, setUser] = useState(null);

    // Success callback when user logs in
  const responseMessage = (response) => {
    const token = response.credential;
    if (token) {
      const userProfile = parseJwt(token);
      setUser(userProfile); // Store user data in state
    }
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
                        <button onClick={() => setUser(null)}>Log Out</button>
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