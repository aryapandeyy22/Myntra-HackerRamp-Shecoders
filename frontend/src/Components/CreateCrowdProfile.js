import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCrowdProfile() {
  const [crowdProfileData, setCrowdProfileData] = useState({
    profileImage: null,
    profileName: '',
    caption: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('profileImage', crowdProfileData.profileImage);
        formData.append('profileName', crowdProfileData.profileName);
        formData.append('caption', crowdProfileData.caption);

      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:3000/crowdprofile/create', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // Redirect or perform necessary actions after successful submission
      navigate('/profile');
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
    <div>
      <h2>Create Crowdsource Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <input type="file" name="profileImage" onChange={handleChange} />

        {/* Profile Name */}
        <input type="text" name="profileName" value={crowdProfileData.profileName} onChange={handleChange} placeholder="Profile Name" />

        {/* Caption */}
        <textarea name="caption" value={crowdProfileData.caption} onChange={handleChange} placeholder="Caption"></textarea>

        {/* Submit Button */}
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default CreateCrowdProfile;
