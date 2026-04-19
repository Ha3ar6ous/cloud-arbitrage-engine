const calculateWhatIf = (req, res) => {
  const { traffic = 0, scaling = false, region = 'ap-south-1', instanceType = 'standard', pricingData } = req.body;

  if (!pricingData) {
     return res.status(400).json({ error: 'Pricing data not provided.' });
  }

  // Use base cost from JSON based on average
  // Here we simplify by mapping first found instance for provider
  const providersList = [...new Set(pricingData.map(p => p.provider))];
  
  let providers = [];

  for (const name of providersList) {
    const config = pricingData.find(p => p.provider === name);
    // Convert hourly INR to estimated monthly baseline
    const baseCost = config.price_inr_per_hour * 730; 

    // Region multipliers mapping globally
    const rm = region === 'us-east-1' ? 0.9 : region === 'eu-west-1' ? 1.05 : 1.0; 
    
    // Instance type multipliers
    const im = instanceType === 'compute-optimized' ? 1.5 : instanceType === 'memory-optimized' ? 1.4 : 1.0;

    let trafficMultiplier = 1.0;
    
    if (traffic > 0) {
      if (scaling) {
        trafficMultiplier += (traffic / 10000) * 1.5; 
      } else {
        trafficMultiplier += (traffic / 10000) * 3.0; 
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
