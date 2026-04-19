const simulate = (req, res) => {
  try {
    const { cpu, ram, storage, region, workloadType, pricingData } = req.body;

    if (!cpu || !ram || !storage) {
      return res.status(400).json({ error: 'CPU, RAM, and Storage are required' });
    }

    if (!pricingData || pricingData.length === 0) {
      return res.status(400).json({ error: 'Pricing data not provided in payload' });
    }

    const targetRegion = region || 'ap-south-1';
    const providers = [...new Set(pricingData.map(p => p.provider))];
    const monthlyHours = 730;

    // For each provider, find the best-fit instance from the dataset
    const providerResults = providers.map(provider => {
      // Filter instances for this provider in the target region
      let candidates = pricingData.filter(
        p => p.provider === provider && p.region === targetRegion
      );

      // Fallback to any region if no match
      if (candidates.length === 0) {
        candidates = pricingData.filter(p => p.provider === provider);
      }

      // Find the closest instance that satisfies the CPU and RAM requirement
      // Sort by closest match (cpu >= requested, ram >= requested), then cheapest
      const suitable = candidates
        .filter(c => c.cpu >= cpu && c.ram >= ram)
        .sort((a, b) => a.price_inr_per_hour - b.price_inr_per_hour);

      // If no exact match, just pick the largest instance available
      const selected = suitable.length > 0
        ? suitable[0]
        : candidates.sort((a, b) => b.cpu - a.cpu)[0];

      // Cost calculation with breakdown
      const baseHourly = selected.price_inr_per_hour;
      const scaleFactor = Math.max(1, (cpu / selected.cpu + ram / selected.ram) / 2);

      const computeCost = parseFloat((baseHourly * scaleFactor * monthlyHours * 0.65).toFixed(2));
      const storageCost = parseFloat(((storage || 50) * 0.12).toFixed(2)); // ~₹0.12/GB/month
      const networkCost = parseFloat((computeCost * 0.08).toFixed(2)); // ~8% of compute
      const totalCost = parseFloat((computeCost + storageCost + networkCost).toFixed(2));

      return {
        provider,
        instance: selected.instance,
        totalCost,
        computeCost,
        storageCost,
        networkCost,
        performanceScore: selected.performance_score,
        reliabilityScore: selected.reliability_score
      };
    });

    // Normalize cost scores (lower cost = higher score, on a 0-100 scale)
    const maxCost = Math.max(...providerResults.map(p => p.totalCost));
    const minCost = Math.min(...providerResults.map(p => p.totalCost));
    const costRange = maxCost - minCost || 1;

    const scored = providerResults.map(p => {
      const costScore = ((maxCost - p.totalCost) / costRange) * 100;
      const perfScore = p.performanceScore;
      const relScore = (p.reliabilityScore / 100) * 100; // Already 0-100 ish

      const compositeScore = parseFloat(
        (0.5 * costScore + 0.3 * perfScore + 0.2 * relScore).toFixed(1)
      );

      // Generate a contextual reason
      let reason = '';
      if (costScore >= 80 && perfScore >= 85) {
        reason = 'Best value — lowest cost with strong performance for this workload.';
      } else if (costScore >= 80) {
        reason = 'Most cost-effective option for the requested configuration.';
      } else if (perfScore >= 90) {
        reason = 'Premium performance tier — ideal for compute-heavy workloads.';
      } else if (relScore >= 99.95) {
        reason = 'Highest reliability — suited for mission-critical production workloads.';
      } else {
        reason = 'Balanced cost and reliability for standard workloads.';
      }

      return {
        name: p.provider,
        instance: p.instance,
        cost: p.totalCost,
        computeCost: p.computeCost,
        storageCost: p.storageCost,
        networkCost: p.networkCost,
        score: compositeScore,
        reason
      };
    });

    // Sort by composite score descending and return top 3
    scored.sort((a, b) => b.score - a.score);
    const topProviders = scored.slice(0, 3);

    // General suggestions
    const suggestions = [
      `Top pick: ${topProviders[0].name} (${topProviders[0].instance}) at ₹${topProviders[0].cost}/mo.`,
      'Consider reserved instances for steady workloads — savings up to 40%.',
      'Enable auto-scaling to optimize costs during off-peak hours.'
    ];

    res.json({
      topProviders,
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
