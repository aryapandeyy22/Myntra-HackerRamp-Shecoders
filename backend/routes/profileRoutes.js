const express = require('express');
const router = express.Router();
//const {authenticateToken } = require('../middleware/authenticateToken');
const profileController = require('../controllers/profileController');

//router.get('/profile', profileController.getProfile);

router.post('/get-profile', profileController.getProfile);
router.post('/update-profile', profileController.updateProfile);

module.exports = router;
