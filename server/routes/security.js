const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

router.post('/', securityController.getSecurityInsights);

module.exports = router;
