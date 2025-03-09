import React from 'react';
import './NavBar.css';

const NavBar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Profile', path: '/profile' },
        { name: 'LogIn', path: '/logIn' },
        { name: 'ChatBot', path: '/ChatBot' }
    ];
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