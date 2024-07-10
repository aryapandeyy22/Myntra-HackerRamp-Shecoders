const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://otp-verification-cbc87-default-rtdb.asia-southeast1.firebasedatabase.app"
  
  });

module.exports = admin;