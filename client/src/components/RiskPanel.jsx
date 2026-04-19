import React from 'react';
import { MdWarning, MdCheckCircle } from 'react-icons/md';

const RiskPanel = ({ data, loading }) => {
  if (loading) {
    return <div className="risk-panel neo-box loading">Analyzing security posture...</div>;
  }

  if (!data) return null;

  const { riskScore, issues, recommendations } = data;

  let scoreColor = '#22c55e';
  let riskLevel = 'Low Risk';
  if (riskScore >= 40 && riskScore < 75) {
    scoreColor = '#eab308';
    riskLevel = 'Medium Risk';
  } else if (riskScore >= 75) {
    scoreColor = '#ef4444';
    riskLevel = 'High Risk';
  }

  return (
    <div className="risk-panel neo-box">
      <div className="risk-header">
        <div className="flex-align">
          <h3>Security & Reliability Audit</h3>
          <div className="live-indicator">
            <span className="live-blinker"></span>
            LIVE
          </div>
        </div>
        <span className="audit-badge">Scraping cloud datasets...</span>
      </div>

      <div className="score-container">
        <div className="score-circle" style={{ borderColor: scoreColor, color: scoreColor }}>
          <span className="score-value">{riskScore}</span>
          <span className="score-max">/100</span>
        </div>
        <p className="risk-level" style={{ color: scoreColor }}>{riskLevel}</p>
      </div>

      <div className="audit-section issues">
        <h4>Identified Issues ({issues.length})</h4>
        {issues.length === 0 ? (
          <p className="no-issues">No major issues identified.</p>
        ) : (
          <ul>
            {issues.map((issue, idx) => (
              <li key={idx}><MdWarning className="icon-inline warning" /> {issue}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="audit-section recommendations">
        <h4>Actionable Recommendations</h4>
        <ul>
          {recommendations.map((rec, idx) => (
            <li key={idx}><MdCheckCircle className="icon-inline success" /> {rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiskPanel;
