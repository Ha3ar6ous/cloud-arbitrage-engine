import React, { useState, useEffect, useContext } from 'react';
import ProviderTable from '../components/ProviderTable';
import CostChart from '../components/CostChart';
import { AuthContext } from '../context/AuthContext';
import pricingData from '../data/pricingData.json';
import API_BASE_URL from '../api';

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/compare`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-username': user
          },
          body: JSON.stringify({ pricingData })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch comparison data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchComparisonData();
    }
  }, [user]);

  return (
    <div className="page-container dashboard-page">
      <h2>Comparison Dashboard</h2>
      <p>Analyze performance, reliability, and cost-efficiency across multiple cloud providers at a glance.</p>
      
      {loading && <p className="loading-text">Loading dashboard data...</p>}
      {error && <p className="error-text">{error}</p>}
      
      {!loading && !error && (
        <div className="dashboard-content">
          <div className="chart-section">
            <CostChart data={data} />
          </div>
          <div className="table-section">
            <h3>Provider Details</h3>
            <ProviderTable data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
