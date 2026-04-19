import React from 'react';

const ProviderTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available.</p>;

  return (
    <div className="table-container">
      <table className="provider-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>CPU Cost Estimate (₹)</th>
            <th>RAM Cost Estimate (₹)</th>
            <th>Total Base Cost (₹)</th>
            <th>Performance Score</th>
            <th>Reliability Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="provider-cell">
                {/* 
                  Logos are referenced from /public/providers folder.
                  Add aws.png, azure.png, and gcp.png into the client/public/providers/ directory.
                  If the images are missing, they will just show the alt text.
                */}
                <img src={item.logo} alt={`${item.provider} logo`} className="provider-logo" />
                <span>{item.provider}</span>
              </td>
              <td>₹{item.cpuCost.toFixed(2)}</td>
              <td>₹{item.ramCost.toFixed(2)}</td>
              <td><strong>₹{item.totalCost.toFixed(2)}</strong></td>
              <td>{item.performanceScore}/100</td>
              <td>{item.reliabilityScore}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderTable;
