const securityService = require('../services/securityService');

const getSecurityInsights = (req, res) => {
  try {
    const inputs = req.body;
    const insights = securityService.analyzeSecurity(inputs);
    res.json(insights);
  } catch (error) {
    console.error('Security analysis error:', error);
    res.status(500).json({ error: 'Failed to generate security insights' });
  }
};

module.exports = {
  getSecurityInsights
};
