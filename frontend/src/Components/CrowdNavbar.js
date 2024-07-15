// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Make sure you have react-icons installed

const Navbar = () => {
  const navigate = useNavigate();

  const handleHeadingClick = () => {
    navigate('/homefeed');
  };

  const handleProfileClick = () => {
    navigate('/crowdaccount');
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.heading} onClick={handleHeadingClick}>
        CrowdSourcing
      </h1>
      <FaUserCircle style={styles.icon} onClick={handleProfileClick} />
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'black',
    backgroundColor:'white',
    height:'40px',
    borderBottom: "1px solid #ddd"
  },
  heading: {
    cursor: 'pointer',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '1.5em',
  },
};

export default Navbar;
