import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { bestProvider, costBreakdown, suggestions } = result;

  return (
    <div className="result-card">
      <div className="result-header">
        <h3>Simulation Results</h3>
        <p>Recommended Provider:<span className="best-provider"> {bestProvider}</span></p>
      </div>

      <div className="cost-breakdown">
        <h4>Cost Breakdown (Estimated Monthly in ₹)</h4>
        <ul>
          {costBreakdown.map((item) => (
            <li key={item.provider} className={item.provider === bestProvider ? 'highlight' : ''}>
              <strong>{item.provider}:</strong> ₹{item.estimatedCost.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="suggestions">
        <h4>Optimization Suggestions</h4>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;
