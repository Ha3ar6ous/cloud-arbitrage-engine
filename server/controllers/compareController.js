const getComparison = (req, res) => {
  // Dummy comparison data across providers
  const comparisonData = [
    {
      id: 1,
      provider: 'AWS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      cpuCost: 15.00,
      ramCost: 5.00,
      totalCost: 20.00,
      performanceScore: 92,
      reliabilityScore: 99.99
    },
    {
      id: 2,
      provider: 'Azure',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
      cpuCost: 14.00,
      ramCost: 5.50,
      totalCost: 19.50,
      performanceScore: 89,
      reliabilityScore: 99.95
    },
    {
      id: 3,
      provider: 'GCP',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
      cpuCost: 13.50,
      ramCost: 6.00,
      totalCost: 19.50,
      performanceScore: 94,
      reliabilityScore: 99.99
    }
  ];

  res.json(comparisonData);
};

module.exports = {
  getComparison
};
