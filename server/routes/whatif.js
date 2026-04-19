const express = require('express');
const router = express.Router();
const whatifController = require('../controllers/whatifController');

router.post('/', whatifController.calculateWhatIf);

module.exports = router;
