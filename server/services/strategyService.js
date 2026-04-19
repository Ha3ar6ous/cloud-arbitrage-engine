const generateStrategy = (inputs, costBreakdown) => {
  // Sort to find the cheapest
  const sortedCosts = [...costBreakdown].sort((a, b) => a.estimatedCost - b.estimatedCost);
  const bestProvider = sortedCosts[0].provider;

  const suggestions = [];

  // Generate generic suggestions based on input parameters
  if (inputs.scalingPreference) {
    suggestions.push(`Since you prefer auto-scaling, we recommend leveraging ${bestProvider}'s serverless or managed Kubernetes offerings.`);
  }

  if (inputs.trafficLevel > 75) {
    suggestions.push(`High traffic detected. Ensure you configure a Global Load Balancer and CDN to distribute the load efficiently.`);
  } else if (inputs.trafficLevel < 25) {
    suggestions.push(`Low traffic anticipated. Consider using burstable instances or serverless architectures to minimize baseline costs.`);
  }

  if (inputs.workloadType === 'batch') {
    suggestions.push(`For batch processing workflows, Spot/Preemptible instances on ${bestProvider} can reduce computing costs by up to 70%.`);
  }

  if (inputs.deploymentFrequency === 'high') {
    suggestions.push('High deployment frequency suggests heavy reliance on CI/CD pipelines. Managed DevOps services can improve release cadence.');
  }
  
  if(suggestions.length === 0) {
    suggestions.push(`Standard baseline configuration suitable for steady-state workloads.`);
  }

  return {
    bestProvider,
    suggestions
  };
};

module.exports = {
  generateStrategy
};
