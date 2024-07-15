// server.js
const express = require('express');
const dotenv = require('dotenv');
//const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const crowdProfileRoutes = require('./routes/crowdProfileRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// // PayPal configuration
// paypal.configure({
//   'mode': 'sandbox', // Change to 'live' for production
//   'client_id': process.env.PAYPAL_CLIENT_ID,
//   'client_secret': process.env.PAYPAL_CLIENT_SECRET
// });



app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/crowdprofile', crowdProfileRoutes);
app.use('/posts' , postRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
