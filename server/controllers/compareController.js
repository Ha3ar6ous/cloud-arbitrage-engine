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
      
      const multiplier = provider === 'AWS' ? 1.05 : provider === 'Azure' ? 0.98 : 1.1;
      
      // Use external logos for reliability
      let logoUrl = '';
      if (provider === 'AWS') logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg';
      else if (provider === 'Azure') logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg';
      else if (provider === 'GCP') logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg';
      else if (provider === 'DigitalOcean') logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg';
      else if (provider === 'Hetzner') logoUrl = '/Logo_Hetzner.png';
      else if (provider === 'Linode') logoUrl = '/Linode_updated_logo.png';
      else logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Cloud_computing_icon.svg';

      // Generating dynamic cost using the INR payload
      const hoursInMonth = 730;
      const totalCost = (config.price_inr_per_hour * hoursInMonth) * multiplier;

      return {
        id: index + 1,
        provider: provider,
        logo: logoUrl,
        cpuCost: (totalCost * 0.4),
        ramCost: (totalCost * 0.3),
        totalCost: totalCost,
        performanceScore: provider === 'AWS' ? 94 : provider === 'GCP' ? 91 : provider === 'Azure' ? 88 : 82,
        reliabilityScore: provider === 'AWS' ? 99.99 : provider === 'Azure' ? 99.95 : provider === 'GCP' ? 99.9 : 99.5
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
