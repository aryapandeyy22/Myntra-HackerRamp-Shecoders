import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CrowdProfile.css';
import CrowdNavbar from './CrowdNavbar';
import { setUser } from '../features/userSlice';
import './CrowdProfile.css'
import NavbarHome from './NavbarHome';

function CrowdProfile() {
  const { profileImage, profileName, caption } = useSelector((state) => state.crowdProfile);
  const [isFollowing , setIsFollowing ] = useState(false);
  const [followersCount , setFollowersCount ] = useState(82);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const handleOnClick = ()=>{
    
    dispatch(setUser({id:userData.id, name: userData.name}));
    navigate('/addpost');
  }


  const handleFollowClick = () => {
    if (!isFollowing) {
      setFollowersCount(followersCount + 1);
    }
    setIsFollowing(true);
  };

  return (
    <>
    
    <NavbarHome/>
    <CrowdNavbar/>
    <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Because you are your favourite.</h1>
        </div>
        <div className="profile-content">
          <div className="profile-image-wrapper">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{profileName}</h2>
            <button className="follow-button" onClick={handleFollowClick}>
              {isFollowing ? 'Following' : '+ Follow'}
            </button>
            <br></br>
            <button className="follow-button" onClick={handleOnClick}> Add Post</button>
            <div className="profile-stats">
              <span className="followers">{followersCount}</span>
              <span className="posts">• 4 Posts</span>
            </div>
            <p className="profile-caption">{caption}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrowdProfile;
