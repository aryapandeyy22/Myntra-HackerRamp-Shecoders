// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addPost, getPosts } = require('../controllers/postController');

// POST /posts/add - Add a new post
router.post('/add', upload.single('postImage'), addPost);
router.get('/show' , getPosts);

module.exports = router;
