const express = require('express');
const router = express.Router();
const simulateController = require('../controllers/simulateController');

router.post('/', simulateController.simulate);

module.exports = router;
