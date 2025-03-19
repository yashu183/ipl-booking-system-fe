import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <div>
        <img className="logo-icon" src="/logo.png" alt="CricTix Logo" />
      </div>
      <span className="logo-text">CricTix</span>
    </div>
  );
};

export default Logo;