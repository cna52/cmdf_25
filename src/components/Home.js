import React, {useState, useEffect} from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
    const [user, setUser] = useState({}); // Default to an empty object

    useEffect(() => {
        // Check if the user data is in localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // If user exists, set isLoggedIn to true
        if (user) {
            setIsLoggedIn(true);
            setUser(user);
        } else {
            setIsLoggedIn(false); // If user does not exist, set isLoggedIn to false
        }
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        setIsLoggedIn(false);
        setUser(null);
        navigate('/'); // Redirect to Home
    };

    return (
        <div>
            <div class="container">
                <div class="sideBar">
                    <div class="sideBarContent">
                        <h1>Profile</h1>
                        <p>Welcome to the user profile page.</p>
                        {/* Conditionally render based on login status */}
                        {!isLoggedIn ? (
                            // If not logged in, show the login button
                            <button onClick={() => window.location.href='/LogIn'}>LogIn</button>
                        ) : (
                            // If logged in, show the logged-in options (this can be customized)
                            <>
                                <button onClick={() => window.location.href='/profile'}>Profile</button>
                                <button onClick={() => window.location.href='/ChatBot'}>ChatBot</button>
                                <button onClick={handleLogout}>Log Out</button>
                            </>
                        )}
                    </div>
                </div>
                <div class="content">
                {!isLoggedIn ? (
                        // If not logged in, show the message for a user who hasn't logged in
                        <h1>Welcome to the Home Page</h1>
                    ) : (
                        // If logged in, show a different homepage for logged-in users
                        <h1>Welcome back, {user.name}</h1>
                    )}
                    <p>{!isLoggedIn ? 'This is the home page of our application.' : 'Here you can access your profile and settings.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;