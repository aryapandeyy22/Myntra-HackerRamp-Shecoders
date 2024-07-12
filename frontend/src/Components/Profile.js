import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {PhoneContext } from './Auth/PhoneContext.js';
import './Profile.css'; 

function Profile() {
  const [profile, setProfile] = useState({});
  const [error , setError ] = useState('');
  const navigate = useNavigate();
  //const phone = useSelector ((state) => state.auth.phone);
  const phone = '+918817621427';

  useEffect(() => {
    console.log('Phone:' , phone);

    const fetchProfile = async () => {
      try {
        const response = await axios.post('http://localhost:3000/profile/get-profile',{phone});
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile. Please try again');
        console.error('Error fetching profile', error);
      }
    };

    if(phone) fetchProfile();
  }, [phone]);

  if (error) {
    return <div>{error}</div>;
  }


  const handleEdit = () => {
    navigate('/edit-profile', { state: { profile } });
  };

  //crowdsource profile
  // const handleCreateCrowdProfile = async () => {
  //   try {
  //     //const token = localStorage.getItem('authToken');
  //     await axios.post('http://localhost:3000/crowdprofile/create', { phone});
  //     navigate('/create-crowd-profile');
  //   } catch (error) {
  //     console.error('Error creating crowdsource profile', error);
  //   }
  // };


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
      <br></br>
      {/* <button className="edit-btn" onClick={handleCreateCrowdProfile}>Create Crowdsource Profile</button> */}
    </div>
  );
}

export default Profile;
