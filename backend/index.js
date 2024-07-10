const express = require('express');
const dotenv = require('dotenv');
const thriftRoutes = require('./routes/thriftRoutes');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-serviceAccountKey.json');
var cors = require('cors');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://otp-verification-cbc87-default-rtdb.asia-southeast1.firebasedatabase.app"
  
  });
  


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(cors());


app.use(express.json());
app.use('/api/thrift', thriftRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
