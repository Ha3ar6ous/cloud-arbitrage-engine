import React from 'react';

const RiskPanel = ({ data, loading }) => {
  if (loading) {
    return <div className="risk-panel loading">Analyzing security posture...</div>;
  }

  if (!data) return null;

  const { riskScore, issues, recommendations } = data;

  // Determine color based on risk score
  let scoreColor = '#34a853'; // Green for low risk
  let riskLevel = 'Low Risk';
  if (riskScore >= 40 && riskScore < 75) {
    scoreColor = '#fbbc05'; // Yellow
    riskLevel = 'Medium Risk';
  } else if (riskScore >= 75) {
    scoreColor = '#ea4335'; // Red
    riskLevel = 'High Risk';
  }

  return (
    <div className="risk-panel">
      <div className="risk-header">
        <h3>Security & Reliability Audit</h3>
        <span className="audit-badge">Generated Live</span>
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
              <li key={idx}><span className="icon-warning">⚠️</span> {issue}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="audit-section recommendations">
        <h4>Actionable Recommendations</h4>
        <ul>
          {recommendations.map((rec, idx) => (
            <li key={idx}><span className="icon-check">✅</span> {rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiskPanel;
