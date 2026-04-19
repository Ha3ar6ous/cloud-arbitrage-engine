const calculateWhatIf = (req, res) => {
  const { traffic = 0, scaling = false, region = 'us-east-1', instanceType = 'standard' } = req.body;

  // Base costs for instances
  const baseRates = {
    AWS: 20,
    Azure: 19.5,
    GCP: 19
  };

  // Region multipliers
  const regionMultipliers = {
    'us-east-1': 1.0,
    'eu-west-1': 1.1,
    'ap-south-1': 0.9
  };

  // Instance type multipliers
  const instanceMultipliers = {
    'standard': 1.0,
    'compute-optimized': 1.5,
    'memory-optimized': 1.4
  };

  const rm = regionMultipliers[region] || 1.0;
  const im = instanceMultipliers[instanceType] || 1.0;

  let providers = [];

  for (const [name, baseCost] of Object.entries(baseRates)) {
    // Basic traffic scaling logic
    // Every 1000 users adds cost. If scaling is enabled, cost scales less aggressively per user
    // due to efficiency, but has base overhead.
    let trafficMultiplier = 1.0;
    
    if (traffic > 0) {
      if (scaling) {
        // Auto-scaling enabled
        trafficMultiplier += (traffic / 10000) * 1.5; // Up to 150% more base cost
      } else {
        // No auto-scaling (over-provisioning or severe penalty)
        trafficMultiplier += (traffic / 10000) * 3.0; // Up to 300% more base cost
      }
    }

    let finalCost = baseCost * rm * im * trafficMultiplier;

    providers.push({
      name,
      cost: parseFloat(finalCost.toFixed(2))
    });
  }

  res.json({ providers });
};

module.exports = {
  calculateWhatIf
};
