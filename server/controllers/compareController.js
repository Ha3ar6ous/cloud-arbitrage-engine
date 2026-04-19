const getComparison = (req, res) => {
  try {
    const { pricingData } = req.body;
    
    if (!pricingData) {
       return res.status(400).json({ error: 'Pricing data not provided.' });
    }

    const providers = [...new Set(pricingData.map(p => p.provider))];

    const comparisonData = providers.map((provider, index) => {
      // Find the medium instance configuration from frontend
      const config = pricingData.find(p => p.provider === provider && p.instance.includes('medium')) || pricingData.find(p => p.provider === provider);
      
      const multiplier = provider === 'AWS' ? 1.05 : provider === 'Azure' ? 0.98 : 1.0;
      
      // Generating dynamic cost using the INR payload
      const hoursInMonth = 730;
      const totalCost = (config.price_inr_per_hour * hoursInMonth) * multiplier;

      return {
        id: index + 1,
        provider: provider,
        // Using static logos from newly instructed public folder logic
        logo: `/providers/${provider.toLowerCase()}.png`,
        cpuCost: (totalCost * 0.4),
        ramCost: (totalCost * 0.3),
        totalCost: totalCost,
        performanceScore: provider === 'AWS' ? 92 : provider === 'Azure' ? 89 : 94,
        reliabilityScore: provider === 'Azure' ? 99.95 : 99.99
      };
    });

    res.json(comparisonData);
  } catch(error) {
    res.status(500).json({ error: 'Failed to generate comparison' });
  }
};

module.exports = {
  getComparison
};
