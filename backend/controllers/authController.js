const admin = require('firebase-admin');
const db = require('../config/db');

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60000);

  try {
    await admin.auth().createUser({
      phoneNumber: phone,
      password: otp 
    });

    db.query('INSERT INTO users (phone, otp, otp_expiry) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp=?, otp_expiry=?', 
    [phone, otp, otpExpiry, otp, otpExpiry], (err, results) => {
      if (err) return res.status(500).send('Database error');
      res.status(200).send('OTP sent');
    });
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
};

exports.verifyOtp = (req, res) => {
  const { phone, otp } = req.body;

  db.query('SELECT * FROM users WHERE phone=? AND otp=? AND otp_expiry > NOW()', 
  [phone, otp], (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid OTP');
    res.status(200).send('OTP verified');
  });
};
