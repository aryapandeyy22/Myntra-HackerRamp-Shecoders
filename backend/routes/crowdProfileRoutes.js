// routes/crowdprofileRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Adjust the path as necessary
const { createCrowdProfile } = require('../controllers/crowdProfileController');

// POST /crowdprofile/create - Create a crowdsource profile
router.post('/create', upload.single('profileImage'), createCrowdProfile);

module.exports = router;
