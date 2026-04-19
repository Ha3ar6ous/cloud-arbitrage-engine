// Dummy pricing data (cost per unit per month)
const providerRates = {
  AWS: {
    cpuCost: 15,
    ramCost: 5,
    storageCost: 0.1
  },
  Azure: {
    cpuCost: 14,
    ramCost: 5.5,
    storageCost: 0.09
  },
  GCP: {
    cpuCost: 13.5,
    ramCost: 6,
    storageCost: 0.08
  }
};

const calculateCost = (inputs) => {
  const { cpu, ram, storage } = inputs;
  
  const breakdown = [];

  for (const [provider, rates] of Object.entries(providerRates)) {
    const totalCost = (cpu * rates.cpuCost) + (ram * rates.ramCost) + (storage * rates.storageCost);
    breakdown.push({
      provider,
      estimatedCost: parseFloat(totalCost.toFixed(2))
    });
  }

  return breakdown;
};

module.exports = {
  calculateCost
};
