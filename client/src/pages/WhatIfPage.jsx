import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MdTrendingUp, MdTrendingDown, MdTrendingFlat } from 'react-icons/md';
import pricingData from '../data/pricingData.json';

const WhatIfPage = () => {
  const [inputs, setInputs] = useState({
    traffic: 1000,
    scaling: false,
    region: 'ap-south-1',
    instanceType: 'standard'
  });

  const [results, setResults] = useState([]);
  const previousResultsRef = useRef({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'range' ? Number(value) : value)
    }));
  };

  useEffect(() => {
    const fetchWhatIf = async () => {
      setLoading(true);
      try {
        const payload = {
          ...inputs,
          pricingData
        };

        const response = await fetch('http://localhost:5000/api/whatif', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-username': user 
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        
        if (results.length > 0) {
          const prevMap = {};
          results.forEach(r => { prevMap[r.name] = r.cost; });
          previousResultsRef.current = prevMap;
        }

        setResults(data.providers);
      } catch (err) {
        console.error('Error fetching what-if data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      const debounceTimer = setTimeout(() => {
        fetchWhatIf();
      }, 400);

      return () => clearTimeout(debounceTimer);
    }
  }, [inputs, user]);

  const getTrendIcon = (providerName, currentCost) => {
    const prevCost = previousResultsRef.current[providerName];
    if (!prevCost || prevCost === currentCost) return <MdTrendingFlat className="trend neutral" />;
    if (currentCost > prevCost) return <MdTrendingUp className="trend up" title="Cost increase" />;
    return <MdTrendingDown className="trend down" title="Cost decrease" />;
  };

  return (
    <div className="page-container whatif-page">
      <h2>What-if Scenarios</h2>
      <p>Adjust parameters in real-time to see how dynamic events impact provider costs.</p>

      <div className="simulator-grid">
        <div className="left-panel neo-box form-panel">
          <h3>Simulation Triggers</h3>

          <div className="form-group">
            <label htmlFor="traffic">Traffic Level (Users): <strong>{inputs.traffic}</strong></label>
            <input
              type="range"
              id="traffic"
              name="traffic"
              min="0"
              max="10000"
              step="100"
              value={inputs.traffic}
              onChange={handleChange}
            />
          </div>

          <div className="form-group row">
            <div className="input-container">
              <label htmlFor="region">Region</label>
              <select name="region" id="region" value={inputs.region} onChange={handleChange}>
                <option value="us-east-1">US East (Virginia)</option>
                <option value="eu-west-1">EU (Ireland)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="instanceType">Instance Type</label>
              <select name="instanceType" id="instanceType" value={inputs.instanceType} onChange={handleChange}>
                <option value="standard">Standard</option>
                <option value="compute-optimized">Compute Optimized</option>
                <option value="memory-optimized">Memory Optimized</option>
              </select>
            </div>
          </div>

          <div className="form-group toggle-group mt-2">
             <label htmlFor="scaling">Enable Auto-scaling</label>
             <label className="switch">
               <input type="checkbox" id="scaling" name="scaling" checked={inputs.scaling} onChange={handleChange} />
               <span className="slider round"></span>
             </label>
          </div>
        </div>

        <div className="right-panel">
          {loading && results.length === 0 ? (
            <div className="loading-card neo-box">
              <div className="spinner"></div>
              <p className="loading-msg">Calculating costs...</p>
            </div>
          ) : (
            <div className="neo-box result-card">
              <div className="result-header">
                <h3>Live Cost Estimator (INR)</h3>
                {loading && <span className="loading-badge">Updating...</span>}
              </div>
              
              <div className="cost-breakdown whatif-results">
                <ul>
                  {results.map(provider => (
                    <li key={provider.name}>
                      <div className="whatif-row">
                        <strong>{provider.name}</strong> 
                        <span>
                          ₹{provider.cost.toFixed(2)}{' '}
                          {getTrendIcon(provider.name, provider.cost)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatIfPage;
