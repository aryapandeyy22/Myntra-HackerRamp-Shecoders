import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { PhoneContext } from './Auth/PhoneContext';
import './EditProfile.css'; 

function EditProfile() {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  //const { phone } = useContext(PhoneContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post('http://localhost:3000/profile/get-profile', {  });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/profile/update-profile', { ...profile});
      navigate.push('/profile');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={profile.name || ''} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email ID</label>
          <input type="email" id="email" name="email" value={profile.email || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={profile.gender || ''} onChange={handleChange}>
            <option value="">- select -</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="birthday">Date of Birth</label>
          <input type="date" id="birthday" name="birthday" value={profile.birthday || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="altphone">Alternate Mobile</label>
          <input type="text" id="altphone" name="altphone" value={profile.altphone || ''} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="hintname">Hint Name</label>
          <input type="text" id="hintname" name="hintname" value={profile.hintname || ''} onChange={handleChange} />
        </div>
        <button type="submit" className="save-btn">SAVE</button>
      </form>
    </div>
  );
}

export default EditProfile;
