const express = require('express');
const multer = require('multer');
const thriftController = require('../controllers/thriftController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/additem', upload.array('files', 10), thriftController.addThriftItem);
router.get('/:id', thriftController.getThriftItem);
router.get('/h/all_items', thriftController.getAllThriftItems);

module.exports = router;
