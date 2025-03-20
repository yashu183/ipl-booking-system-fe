import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-wrapper">
                <Logo />
                <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/history" className="nav-link">Booking History</Link>
                    <a href="#" className="user-avatar">CY</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;