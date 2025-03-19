import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-wrapper">
                <Logo />

                <nav className="nav">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/history" className="nav-link">Booking history</a>

                    <a href="#" className="user-avatar">CY</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;