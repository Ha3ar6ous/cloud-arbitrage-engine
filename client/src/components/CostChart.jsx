import React from 'react';

const CostChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Find the max cost to scale the bars properly
  const maxCost = Math.max(...data.map(item => item.totalCost));

  return (
    <div className="chart-container">
      <h3>Estimated Monthly Costs Comparison (₹)</h3>
      <div className="bar-chart">
        {data.map((item) => {
          const heightPercentage = (item.totalCost / maxCost) * 100;
          return (
            <div key={item.id} className="bar-group">
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${heightPercentage}%` }}
                >
                  <span className="bar-value">₹{item.totalCost.toFixed(0)}</span>
                </div>
              </div>
              <span className="bar-label">{item.provider}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CostChart;
