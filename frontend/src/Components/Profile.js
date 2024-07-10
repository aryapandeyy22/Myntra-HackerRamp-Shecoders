import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {PhoneContext } from './PhoneContext.js';
import './Profile.css'; 

function Profile() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const { phone } = useContext(PhoneContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Token from localStorage:', token);
        const response = await axios.post('http://localhost:3000/profile/get-profile',{}, { 
          headers: {Authorization: `Bearer ${token}`}
         });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [phone]);

  const handleEdit = () => {
    navigate('/edit-profile', { state: { profile } });
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-details">
        <p><strong>Full Name:</strong> {profile.name || '- not added -'}</p>
        <p><strong>Mobile Number:</strong> {profile.phone}</p>
        <p><strong>Email ID:</strong> {profile.email || '- not added -'}</p>
        <p><strong>Gender:</strong> {profile.gender || '- not added -'}</p>
        <p><strong>Date of Birth:</strong> {profile.birthday || '- not added -'}</p>
        <p><strong>Location:</strong> - not added -</p>
        <p><strong>Alternate Mobile:</strong> {profile.altphone || '- not added -'}</p>
        <p><strong>Hint Name:</strong> {profile.hintname || '- not added -'}</p>
      </div>
      <button className="edit-btn" onClick={handleEdit}>EDIT</button>
    </div>
  );
}

export default Profile;
