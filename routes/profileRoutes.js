const express = require('express');
const router = express.Router();
const {authenticateToken } = require('../middleware/authenticateToken');
const profileController = require('../controllers/profileController');

//router.get('/profile', profileController.authenticateToken, profileController.getProfile);

router.post('/get-profile', authenticateToken,profileController.getProfile);
router.post('/update-profile', authenticateToken, profileController.updateProfile);

module.exports = router;
