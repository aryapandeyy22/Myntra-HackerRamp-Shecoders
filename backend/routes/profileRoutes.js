const express = require('express');
const router = express.Router();
//const {authenticateToken } = require('../middleware/authenticateToken');
const profileController = require('../controllers/profileController');

//router.get('/profile', profileController.getProfile);

router.get('/get-profile', profileController.getProfile);
router.get('/update-profile', profileController.updateProfile);

module.exports = router;
