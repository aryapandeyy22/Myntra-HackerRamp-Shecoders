import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './EditProfile.css'; 
import NavbarHome from './NavbarHome';


function EditProfile() {
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  //const { phone } = useContext(PhoneContext);
  const phone = useSelector ((state) => state.auth.phone);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post('http://localhost:3000/profile/get-profile', {phone  });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProfile = {
      ...profile,
      birthday: profile.birthday ? new Date(profile.birthday).toISOString().split('T')[0] : null
    };

    try {
      await axios.post('http://localhost:3000/profile/update-profile', { ...formattedProfile, phone});
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <>
    <NavbarHome/>
    <div className="edit-profile-container">
      <h2 style={{backgroundColor: "white"}} >Edit Profile</h2>
      <form onSubmit={handleSubmit} style={{backgroundColor: "white"}}>
        <div className="input-group" style={{backgroundColor: "white"}}>
          <label htmlFor="name" style={{backgroundColor: "white"}}>Full Name</label>
          <input style={{backgroundColor: "white"}} type="text" id="name" name="name" value={profile.name || ''} onChange={handleChange} required />
        </div>
        <div className="input-group" style={{backgroundColor: "white"}}>
          <label htmlFor="email" style={{backgroundColor: "white"}}>Email ID</label>
          <input style={{backgroundColor: "white"}} type="email" id="email" name="email" value={profile.email || ''} onChange={handleChange} />
        </div>
        <div className="input-group" style={{backgroundColor: "white"}}>
          <label htmlFor="gender" style={{backgroundColor: "white"}}>Gender</label>
          <select style={{backgroundColor: "white"}} id="gender" name="gender" value={profile.gender || ''} onChange={handleChange}>
            <option value="">- select -</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
          </select>
        </div>
        <div className="input-group" style={{backgroundColor: "white"}}>
          <label htmlFor="birthday" style={{backgroundColor: "white"}}>Date of Birth</label>
          <input style={{backgroundColor: "white"}} type="date" id="birthday" name="birthday" value={profile.birthday || ''} onChange={handleChange} />
        </div>
        <div className="input-group" style={{backgroundColor: "white"}}>
          <label htmlFor="altphone" style={{backgroundColor: "white"}}>Alternate Mobile</label>
          <input style={{backgroundColor: "white"}} type="text" id="altphone" name="altphone" value={profile.altphone || ''} onChange={handleChange} />
        </div>
        <div className="input-group" style={{backgroundColor: "white"}}>
          <label style={{backgroundColor: "white"}} htmlFor="hintname">Hint Name</label>
          <input style={{backgroundColor: "white"}} type="text" id="hintname" name="hintname" value={profile.hintname || ''} onChange={handleChange} />
        </div>
        <button type="submit" className="save-btn">SAVE</button>
      </form>
    </div>
    </>
  );
}

export default EditProfile;
