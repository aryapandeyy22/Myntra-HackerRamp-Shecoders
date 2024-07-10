const express = require('express');
const multer = require('multer');
const thriftController = require('../controllers/thriftController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/addThriftItem', upload.array('files'), thriftController.addThriftItem);

module.exports = router;
