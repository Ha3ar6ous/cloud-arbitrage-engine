const pricingService = require('../services/pricingService');
const strategyService = require('../services/strategyService');

const simulate = (req, res) => {
  try {
    const inputs = req.body;
    
    // Validate very basic things (assume client sends correct types for now)
    if (!inputs.cpu || !inputs.ram || !inputs.storage) {
      return res.status(400).json({ error: 'CPU, RAM, and Storage are required' });
    }

    // Calculate costs
    const costBreakdown = pricingService.calculateCost(inputs);
    
    // Generate strategy and pick best provider
    const strategy = strategyService.generateStrategy(inputs, costBreakdown);

    res.json({
      bestProvider: strategy.bestProvider,
      costBreakdown,
      suggestions: strategy.suggestions
    });
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ error: 'Failed to process simulation' });
  }
};

module.exports = {
  simulate
};
