import React from 'react';
import { MdCheckCircle, MdInfo, MdLightbulb } from 'react-icons/md';

const PROVIDER_URLS = {
  'AWS': 'https://aws.amazon.com/',
  'Azure': 'https://azure.microsoft.com/',
  'GCP': 'https://cloud.google.com/',
  'DigitalOcean': 'https://www.digitalocean.com/',
  'Hetzner': 'https://www.hetzner.com/',
  'Linode': 'https://www.linode.com/'
};

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { topProviders, suggestions } = result;
  const topPick = topProviders[0];

  return (
    <div className="result-card neo-box">
      <div className="result-header">
        <h3>Simulation Results</h3>
      </div>

      {/* Why This Recommendation Section */}
      <div className="why-section neo-box">
        <h4><MdLightbulb className="icon-inline bulb" /> Why this recommendation?</h4>
        <p>{topPick.reason}</p>
        <p className="why-detail">
          <strong>{topPick.name}</strong> ({topPick.instance}) scored <strong>{topPick.score}</strong> overall, 
          combining the lowest cost with solid performance and reliability for your selected region and workload.
        </p>
      </div>

      <div className="top-providers">
        <h4>Top 3 Providers</h4>
        {topProviders.map((provider, idx) => (
          <div key={provider.name} className={`provider-rank neo-box ${idx === 0 ? 'top-pick' : ''}`}>
            <div className="rank-header">
              <span className="rank-badge">#{idx + 1}</span>
              <strong>{provider.name}</strong>
              <span className="instance-tag">{provider.instance}</span>
              <span className="score-tag">Score: {provider.score}</span>
              {PROVIDER_URLS[provider.name] && (
                <a 
                  href={PROVIDER_URLS[provider.name]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neo-btn visit-btn-mini"
                >
                  Visit Website
                </a>
              )}
            </div>

            <p className="rank-reason"><MdInfo className="icon-inline" /> {provider.reason}</p>


            <div className="cost-breakdown-grid">
              <div className="cost-item">
                <span className="cost-label">Compute</span>
                <span className="cost-value">₹{provider.computeCost.toFixed(2)}</span>
              </div>
              <div className="cost-item">
                <span className="cost-label">Storage</span>
                <span className="cost-value">₹{provider.storageCost.toFixed(2)}</span>
              </div>
              <div className="cost-item">
                <span className="cost-label">Network</span>
                <span className="cost-value">₹{provider.networkCost.toFixed(2)}</span>
              </div>
              <div className="cost-item total">
                <span className="cost-label">Total / mo</span>
                <span className="cost-value">₹{provider.cost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="suggestions">
        <h4>Optimization Suggestions</h4>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}><MdCheckCircle className="icon-inline success" /> {suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;
