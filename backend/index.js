const express = require('express');
const dotenv = require('dotenv');
//const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const profileRoutes = require('./routes/profileRoutes');
const crowdProfileRoutes = require('./routes/crowdProfileRoutes');
const postRoutes = require('./routes/postRoutes');
const thriftRoutes = require('./routes/thriftRoutes');

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
var corsOptions = {
    origin: 'http://localhost:3002'
  }
// Middleware
app.use(bodyParser.json());
app.use(cors())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api/thrift', thriftRoutes);
app.use('/crowdprofile', crowdProfileRoutes);
app.use('/posts' , postRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
