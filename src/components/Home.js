import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of our application.</p>
            <div class="sideBar">
                <div class="sideBarContent">
                    <h1>Profile</h1>
                    <p>Welcome to the user profile page.</p>
                    <button variant="primary" onClick={() => window.location.href='/LogIn'}>LogIn</button>
                    {/* <button variant="secondary" onClick={() => window.location.href='/profile'}>Profile</button>
                    <button variant="success" onClick={() => window.location.href='/settings'}>Settings</button> */}
                </div>
            </div>
        </div>
    );
};

export default Home;