//const Profile = require('../models/profile');
const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

exports.getProfile = (req, res) => {
  console.log('req.user:' , req.user);
    const  phone  = req.user.phone;
    const sql = 'SELECT * FROM profile WHERE phone = ?';
  
    db.query(sql, [phone], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send('Server error');
      }
      if (result.length > 0) {
        console.log('Profile found:', result[0]);
        return res.json(result[0]);
      } else {
        return res.status(404).send('Profile not found');
      }
    });
  };



exports.updateProfile = (req, res) => {
    const { phone, name, email, gender, birthday, altphone, hintname } = req.body;
    const sql = 'UPDATE profile SET name = ?, email = ?, gender = ?, birthday = ?, altphone = ?, hintname = ? WHERE phone = ?';
  
    db.query(sql, [name, email, gender, birthday, altphone, hintname, phone], (err, result) => {
      if (err) throw err;
      res.send('Profile updated');
    });
  };

  //module.exports = { authenticateToken };
  