import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../features/postSlice';
import Post from './Post';
import CrowdNavbar from './CrowdNavbar';
import NavbarHome from './NavbarHome';


function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (postStatus === 'succeeded') {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <>
      <NavbarHome/>
      <CrowdNavbar/>
      <div className="posts-list">
        {content}
      </div>
    </>
  );
}

export default PostsList;
