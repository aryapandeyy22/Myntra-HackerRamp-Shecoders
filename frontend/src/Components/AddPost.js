// AddPost.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const [postData, setPostData] = useState({
    caption: '',
    productLinks: '',
  });
  const [postImage, setPostImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
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
      navigate('/profile');
    } catch (error) {
      console.error('Error adding post', error);
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="postImage"
          onChange={handleImageChange}
          required
        />
        <input
          type="text"
          name="caption"
          value={postData.caption}
          onChange={handleChange}
          placeholder="Caption"
          required
        />
        <input
          type="text"
          name="productLinks"
          value={postData.productLinks}
          onChange={handleChange}
          placeholder="Product Links"
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;
