// server.js
const express = require('express');
const dotenv = require('dotenv');
const thriftRoutes = require('./routes/thriftRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
var cors = require('cors');
const profileRoutes = require('./routes/profileRoutes');


  

var corsOptions = {
    origin: 'http://localhost:3000'
  }
dotenv.config();

//middleware 
const app = express();
app.use(cors())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api/thrift', thriftRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
