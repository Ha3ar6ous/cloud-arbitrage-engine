const express = require('express');
const router = express.Router();
const compareController = require('../controllers/compareController');

router.get('/', compareController.getComparison);

module.exports = router;
