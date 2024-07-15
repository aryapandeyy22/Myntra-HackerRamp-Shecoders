// controllers/postController.js
const cloudinary = require('../config/cloudinaryConfig.js');
const db = require('../config/dbConfig');

const addPost = (req, res) => {
  const { userId, caption, productLinks } = req.body;
  const postImage = req.file;

  // Upload image to Cloudinary
  cloudinary.uploader.upload(postImage.path, { timeout: 60000 }, (error, result) => {
    if (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
    }

    const imageUrl = result.secure_url;

    // Store post details in database
    const query = 'INSERT INTO posts (userId, caption, productLinks, imageUrl) VALUES (?, ?, ?, ?)';
    db.query(query, [userId,caption, productLinks, imageUrl], (err, results) => {
      if (err) {
        console.error('Error adding post:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(201).json({ message: 'Post added successfully', postId: results.insertId });
    });
  });
};

const getPosts = (req, res) => {
  const sql = `SELECT posts.*, crowdprofile.profileName, crowdprofile.profileImage FROM posts
               JOIN crowdprofile ON posts.userId = crowdprofile.id ORDER BY posts.id DESC`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};


module.exports = {
  addPost,
  getPosts
};
