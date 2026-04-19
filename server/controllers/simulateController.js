const simulate = (req, res) => {
  try {
    const { cpu, ram, storage, pricingData } = req.body;
    
    if (!cpu || !ram || !storage) {
      return res.status(400).json({ error: 'CPU, RAM, and Storage are required' });
    }

    if (!pricingData || pricingData.length === 0) {
      return res.status(400).json({ error: 'Pricing data not provided in payload' });
    }

    // Filter pricing data that roughly matches the request, or just calculate for all providers using base logic
    // We will find the closest instance or simply calculate logic matching the frontend JSON.
    const costBreakdown = [];
    let bestProvider = '';
    let lowestCost = Infinity;

    // A simplified matching logic taking unique providers from the pricing table.
    const providers = [...new Set(pricingData.map(p => p.provider))];

    providers.forEach(provider => {
      // Find pricing instances for this provider
      const options = pricingData.filter(p => p.provider === provider);
      // Let's assume user requested CPU and RAM. Find instance that satisfies it or just linearly scale the closest one.
      // For simplicity, we just use the first option to dictate base costs and scale linearly based on requested vs provided.
      const baseOption = options[0];
      const costPerCpuHour = baseOption.price_inr_per_hour / baseOption.cpu;
      const costPerRamHour = baseOption.price_inr_per_hour / baseOption.ram; // Very naive calculation
      
      // Better simulation logic: Just multiply request by price_inr_per_hour average
      const baseCost = (cpu * (costPerCpuHour*0.6)) + (ram * (costPerRamHour*0.4));
      const monthlyHours = 730; 
      
      const estimatedCost = parseFloat((baseCost * monthlyHours).toFixed(2));
      
      if (estimatedCost < lowestCost) {
        lowestCost = estimatedCost;
        bestProvider = provider;
      }

      costBreakdown.push({
        provider,
        estimatedCost
      });
    });

    // Provide simplified logic suggestions
    const suggestions = [
      `Migrating to ${bestProvider} can save you an estimated ₹${(costBreakdown.find(c => c.estimatedCost !== lowestCost)?.estimatedCost - lowestCost || 0).toFixed(2)} monthly.`,
      `Consider reserved instances for steady workloads to save up to 40%.`
    ];

    res.json({
      bestProvider,
      costBreakdown,
      suggestions
    });
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ error: 'Failed to process simulation' });
  }
};

module.exports = {
  simulate
};
