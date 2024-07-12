const admin = require('../utils/firebase');
const db = require('../config/dbConfig');
//const jwt = require('jsonwebtoken');

exports.checkPhone=(req, res) => {
    const { phone } = req.body;
    const checkSql = 'SELECT * FROM profile WHERE phone = ?';
    const insertSql = 'INSERT INTO profile (phone) VALUES (?)';
  
    db.query(checkSql, [phone], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        res.send('Phone number exists');
      } else {
        db.query(insertSql, [phone], (err, result) => {
          if (err) throw err;
          res.send('New user created');
        });
      }
    });
  };


exports.sendOtp= async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
  
    await admin.auth().createUser({
      phoneNumber: phone,
      password: otp // Firebase will hash the OTP
    });
  
    db.query('INSERT INTO users (phone, otp, otp_expiry) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp=?, otp_expiry=?', 
    [phone, otp, otpExpiry, otp, otpExpiry], (err, results) => {
      if (err) {
        return res.status(500).send('Database error');
      }
      res.status(200).send('OTP sent');
    });
  };

exports.verifyOtp= (req, res) => {
    const { phone, otp } = req.body;
  
    db.query('SELECT * FROM users WHERE phone=? AND otp=? AND otp_expiry > NOW()', 
    [phone, otp], (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).send('Invalid OTP');
      }
      res.status(200).send('OTP verified');
      // //generate token
      // const token = jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // console.log('Generated token:' , token);
      // res.json({ token });
    });
  };

