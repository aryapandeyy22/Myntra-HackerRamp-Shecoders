import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Profile.css'; 
import NavbarHome from './NavbarHome';


function Profile() {
  const [profile, setProfile] = useState({});
  const [error , setError ] = useState('');
  const navigate = useNavigate();
  const phone = useSelector ((state) => state.auth.phone);
  //const phone = '+918817621427';

  function componentDidMount() {
    document.body.style.backgroundImage = ("/Users/anushkasinha/Documents/Myntra-HackerRamp-Shecoders/frontend/src/myntrabg.jpg")
};
  componentDidMount();

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
  const handleCreateCrowdProfile = async () => {
    navigate('/crowdprofile');
  };


  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <NavbarHome/>
    <div className="profile-container">
      <h2 style={{backgroundColor: "white"}}>Profile Details</h2>
      <div className="profile-details">
        <p ><strong style={{backgroundColor: "white"}}>Full Name:</strong> {profile.name || '- not added -'}</p>
        <p><strong style={{backgroundColor: "white"}}>Mobile Number:</strong> {profile.phone}</p>
        <p><strong style={{backgroundColor: "white"}}>Email ID:</strong> {profile.email || '- not added -'}</p>
        <p><strong style={{backgroundColor: "white"}}>Gender:</strong> {profile.gender || '- not added -'}</p>
        <p><strong style={{backgroundColor: "white"}}>Date of Birth:</strong> {profile.birthday || '- not added -'}</p>
        <p><strong style={{backgroundColor: "white"}}>Location:</strong> - not added -</p>
        <p><strong style={{backgroundColor: "white"}}>Alternate Mobile:</strong> {profile.altphone || '- not added -'}</p>
        <p><strong style={{backgroundColor: "white"}}>Hint Name:</strong> {profile.hintname || '- not added -'}</p>
      </div>
      <button className="edit-btn" onClick={handleEdit}>EDIT</button>
      <br></br>
      <button className="edit-btn" onClick={handleCreateCrowdProfile}>CREATE CROWDSOURCE PROFILE</button>
    </div>
    </>
  );
}

export default Profile;
