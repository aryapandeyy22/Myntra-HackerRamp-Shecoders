// controllers/crowdprofilecontroller.js
const cloudinary = require('../config/cloudinaryConfig.js');
const db = require('../config/dbConfig');

const createCrowdProfile = (req, res) => {
    const { profileName, caption } = req.body;
    const profileImage = req.file;
  
    // Upload image to Cloudinary
    cloudinary.uploader.upload(profileImage.path, { timeout: 60000 }, (error, result) => {
      if (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
      }
  
      const imageUrl = result.secure_url;
  
      // Store profile details in database
      const query = 'INSERT INTO crowdprofile (profileName, caption, profileImage, createdAt) VALUES (?, ?, ?, NOW())';
      db.query(query, [profileName, caption, imageUrl], (err, results) => {
        if (err) {
          console.error('Error creating crowdsource profile:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        res.status(201).json({ message: 'Crowdsource profile created successfully', crowdProfileId: results.insertId });
      });
    });
  };
  

module.exports = {
  createCrowdProfile
};
