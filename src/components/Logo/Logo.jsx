import React from 'react';
import './Logo.css';

const Logo = ({ variant = "default" }) => {
  return (
    <div className="logo">
      <div>
        <img className={`logo-icon ${variant}`} src="/logo.png" alt="CricTix Logo" />
      </div>
      <span className={`logo-text ${variant}`}>CricTix</span>
    </div>
  );
};

export default Logo;