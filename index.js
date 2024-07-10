// server.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
