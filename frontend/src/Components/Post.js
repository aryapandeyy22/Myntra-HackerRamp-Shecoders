import React from 'react';
import './Post.css';

function Post({ post }) {
  return (
    <div className="post">
      <div className="post-header">
        <img src={`http://localhost:3000${post.profileImage}`} alt="Profile" className="profile-image" />
        <h3>{post.profileName}</h3>
      </div>
      <img src={`http://localhost:3000${post.imageUrl}`} alt="Post" className="post-image" />
      <p>{post.caption}</p>
      <p>Likes: {post.likes}</p>
    </div>
  );
}

export default Post;
