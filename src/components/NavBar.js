import React, {useState, useEffect} from 'react';
import './NavBar.css';

const NavBar = () => {
    
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
                setIsLoggedIn(false);
                setUser(null); // If user does not exist, set isLoggedIn to false
            }
        }, []);

        const navLinks = [
            { name: 'Home', path: '/' },
             ...(isLoggedIn ? [{ name: 'Profile', path: '/profile' }] : []),
            { name: 'ChatBot', path: '/ChatBot' }
        ];

         const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };


    return (
        <nav className="navbar">
        <ul className="nav-links">
            {navLinks.map((link, index) => (
                <li key={index}>
                    <a href={link.path}>{link.name}</a>
                </li>
            ))}
        </ul>
    </nav>
    );
};

export default NavBar;