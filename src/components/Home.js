import React, {useState} from 'react';
import './Home.css';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

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
                                <button onClick={() => window.location.href='/settings'}>Settings</button>
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
                        <h1>Welcome back to the Home Page!</h1>
                    )}
                    <p>{!isLoggedIn ? 'This is the home page of our application.' : 'Here you can access your profile and settings.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;