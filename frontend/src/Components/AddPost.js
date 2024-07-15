// AddPost.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CrowdNavbar from './CrowdNavbar';
import NavbarHome from './NavbarHome';
import './AddPost.css';

function AddPost() {
  const [postData, setPostData] = useState({
    caption: '',
    productLinks: '',
  });
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    console.log('User ID:' , userId);
  },[userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is not set');
      return;
    }

    const formData = new FormData();
    formData.append('userId' , userId);
    formData.append('caption', postData.caption);
    formData.append('productLinks', postData.productLinks);
    formData.append('postImage', postImage);


    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:3000/posts/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/homefeed');
    } catch (error) {
      console.error('Error adding post', error);
    }
  };

  return (
    <>
    <NavbarHome/>
    <CrowdNavbar/>
    

<div className="create-crowd-profile-container">
    <div className="left-side-crowd">
      <h1 className="brand-name">Myntra</h1>
    </div>
    <div className="right-side-crowd">
      <div className="form-handle-right">
      <h2>ADD POST</h2>
      <form onSubmit={handleSubmit} className="form-right">
        <div className="input-group">
          <label htmlFor="profileImage">Post Image</label>
          <input style={{backgroundColor:'white'}} type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
        </div>
        <br></br>
        <div className="input-group">
          <label htmlFor="productLinks">Product Links</label>
          <input type="text" id="profileName" name="profileName" value={postData.productLinks} onChange={handleChange} placeholder="Product Links" />
        </div>
        <br></br>
        <div className="input-group">
          <label htmlFor="caption">Caption</label>
          <textarea id="caption" name="caption" value={postData.productLinks} onChange={handleChange} placeholder="Caption"></textarea>
        </div>
        <br></br>
        <button type="submit" className="submit-btn">ADD</button>
      </form>
      </div>
    </div>
  </div>



    </>
  );
}

export default AddPost;
