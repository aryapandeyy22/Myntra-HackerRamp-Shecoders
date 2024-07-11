const express = require('express');
const router = express.Router();
const arTagController = require('../controllers/arTagController');


router.get('/thrift-items/:id', arTagController.getArTagByThriftItemId);


router.post('/thrift-items/:id', arTagController.createArTagForThriftItem);


router.delete('/thrift-items/:id', arTagController.deleteArTagForThriftItem);

module.exports = router;
