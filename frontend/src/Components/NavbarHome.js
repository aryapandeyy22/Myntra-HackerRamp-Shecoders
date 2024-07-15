import React from 'react';
import './NavbarHome.css';
import MyntraLogo from '/Users/anushkasinha/Documents/Myntra-HackerRamp-Shecoders/frontend/src/myntralogo.png'; // Replace with the correct path to the logo image

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo-section">
        <img src={MyntraLogo} alt="Myntra Logo" className="logo" />
      </div>
      <div className="nav-links">
        <a href="/men">MEN</a>
        <a href="/women">WOMEN</a>
        <a href="/kids">KIDS</a>
        <a href="/home-and-living">HOME & LIVING</a>
        <a href="/beauty">BEAUTY</a>
        <a href="/studio" className="new-tag">STUDIO <span className="new-label">NEW</span></a>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for products, brands and more" />
        <i className="search-icon"></i>
      </div>
      <div className="profile-section">
        <a href="/profile">
          <i className="profile-icon"></i> Profile
        </a>
        <a href="/wishlist">
          <i className="wishlist-icon"></i> Wishlist
        </a>
        <a href="/bag">
          <i className="bag-icon"></i> Bag <span className="notification-badge">1</span>
        </a>
      </div>
    </div>
  );
};

export default Header;