const analyzeSecurity = (inputs) => {
  const { region = 'us-east-1', provider = 'AWS', dataSensitivity = 'low', isPublic = true } = inputs;
  
  let riskScore = 0;
  const issues = [];
  const recommendations = [];

  // Base checks based on public/private
  if (isPublic) {
    if (dataSensitivity === 'high') {
      riskScore += 50;
      issues.push("High sensitivity data exposed to public network.");
      recommendations.push("Implement a Private VPC and use a Bastion Host for access.");
      recommendations.push("Enforce strict IAM roles and disable public read/write.");
    } else if (dataSensitivity === 'medium') {
      riskScore += 30;
      issues.push("Medium sensitivity data on public deployment.");
      recommendations.push("Restrict public access via WAF (Web Application Firewall) & restricted Security Groups.");
    } else {
      riskScore += 10;
      issues.push("Publicly accessible endpoint detected.");
      recommendations.push("Ensure only port 80/443 are open. Setup basic DDoS protection.");
    }
  } else {
    // Private deployment
    riskScore += 5;
    recommendations.push("Ensure VPN or Direct Connect is used for internal access.");
  }

  // Region constraints check (mock logic: some regions might have specific compliance concerns)
  if (dataSensitivity === 'high' && region !== 'us-east-1' && region !== 'eu-west-1') {
    riskScore += 15;
    issues.push(`Region ${region} might not meet stringent local compliance requirements for high sensitivity data.`);
    recommendations.push("Verify local data sovereignty laws before deployment.");
  }

  // Provider specific mock logic
  if (provider === 'AWS' && isPublic) {
    recommendations.push("Enable AWS Shield Standard and configure CloudFront.");
  }
  if (provider === 'Azure' && dataSensitivity === 'high') {
    recommendations.push("Utilize Azure Key Vault for deep secrets management.");
  }
  if (provider === 'GCP' && !isPublic) {
    recommendations.push("Enable Private Google Access for secure internal subnets.");
  }

  // General redundancy issue
  issues.push("Data stored in single region. No cross-region redundancy configured.");
  recommendations.push("Implement multi-region active-passive failover for Disaster Recovery.");

  // Cap risk score between 0 and 100
  riskScore = Math.min(100, Math.max(0, riskScore));

  return {
    riskScore,
    issues,
    recommendations
  };
};

module.exports = {
  analyzeSecurity
};
