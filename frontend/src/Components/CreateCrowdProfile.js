import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProfileData } from '../features/crowdProfileSlice';
import { setUser } from '../features/userSlice';
import NavbarHome from './NavbarHome';
import './CreateCrowdProfile.css';

function CreateCrowdProfile() {
  const [crowdProfileData, setCrowdProfileData] = useState({
    profileImage: null,
    profileName: '',
    caption: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('profileImage', crowdProfileData.profileImage);
        formData.append('profileName', crowdProfileData.profileName);
        formData.append('caption', crowdProfileData.caption);

      const token = localStorage.getItem('authToken');
     const response = await axios.post('http://localhost:3000/crowdprofile/create', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const userData = response.data;
      dispatch(setUser({id:userData.id, name: userData.name}));

      const imageUrl = URL.createObjectURL(crowdProfileData.profileImage);
      dispatch(setProfileData({
        ...crowdProfileData,
        profileImage: imageUrl,
      }));
      //dispatch(setProfileData(crowdProfileData));
      // Redirect or perform necessary actions after successful submission
      navigate('/crowdaccount');
    } catch (error) {
      console.error('Error creating crowdsource profile', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      setCrowdProfileData({ ...crowdProfileData, profileImage: e.target.files[0] });
    } else {
      setCrowdProfileData({ ...crowdProfileData, [e.target.name]: e.target.value });
    }
  };


  return (
    //  <div>
    //   <h2>Create Crowdsource Profile</h2>
    //   <form onSubmit={handleSubmit}>
       
    //     <input type="file" name="profileImage" onChange={handleChange} />

       
    //     <input type="text" name="profileName" value={crowdProfileData.profileName} onChange={handleChange} placeholder="Profile Name" />

      
    //     <textarea name="caption" value={crowdProfileData.caption} onChange={handleChange} placeholder="Caption"></textarea>

       
    //      <button type="submit">Create Profile</button>
    //   </form>  

    //  </div> 
    <>
    <NavbarHome/>
    <div className="create-crowd-profile-container">
    <div className="left-side">
      <h1 className="brand-name">Myntra</h1>
    </div>
    <div className="right-side">
      <div className="form-handle-right">
      <h2>CREATE AN ACCOUNT</h2>
      <form onSubmit={handleSubmit} className="form-right">
        <div className="input-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input type="file" id="profileImage" name="profileImage" onChange={handleChange} />
        </div>
        <br></br>
        <div className="input-group">
          <label htmlFor="profileName">Profile Name</label>
          <input type="text" id="profileName" name="profileName" value={crowdProfileData.profileName} onChange={handleChange} placeholder="Profile Name" />
        </div>
        <br></br>
        <div className="input-group">
          <label htmlFor="caption">Caption</label>
          <textarea id="caption" name="caption" value={crowdProfileData.caption} onChange={handleChange} placeholder="Caption"></textarea>
        </div>
        <br></br>
        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
      </div>
    </div>
  </div>
  </>

  );
}

export default CreateCrowdProfile;
