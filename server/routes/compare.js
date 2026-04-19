const express = require('express');
const router = express.Router();
const compareController = require('../controllers/compareController');

router.post('/', compareController.getComparison);

module.exports = router;
