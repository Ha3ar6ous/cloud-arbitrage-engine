import React, { useState, useEffect, useContext } from 'react';
import RiskPanel from '../components/RiskPanel';
import { AuthContext } from '../context/AuthContext';

const SecurityPage = () => {
  const [inputs, setInputs] = useState({
    region: 'ap-south-1', // Default to India
    provider: 'AWS',
    dataSensitivity: 'low',
    isPublic: true
  });

  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    const fetchSecurityInsights = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/security', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-username': user
          },
          body: JSON.stringify(inputs)
        });
        const data = await response.json();
        setRiskData(data);
      } catch (err) {
        console.error('Error fetching security data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      const timer = setTimeout(() => {
        fetchSecurityInsights();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [inputs, user]);

  return (
    <div className="page-container security-page">
      <h2>Security & Reliability Insights</h2>
      <p>Configure your architecture details to generate an automated security audit and risk score.</p>

      <div className="simulator-grid">
        <div className="left-panel input-form">
          <h3>Architecture Context</h3>
          
          <div className="form-group row">
            <div className="input-container">
              <label htmlFor="provider">Cloud Provider</label>
              <select name="provider" id="provider" value={inputs.provider} onChange={handleChange}>
                <option value="AWS">Amazon Web Services</option>
                <option value="Azure">Microsoft Azure</option>
                <option value="GCP">Google Cloud Platform</option>
              </select>
            </div>
            
            <div className="input-container">
              <label htmlFor="region">Deployment Region</label>
              <select name="region" id="region" value={inputs.region} onChange={handleChange}>
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="eu-west-1">EU (Ireland)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
              </select>
            </div>
          </div>

          <div className="form-group mt-2">
            <label htmlFor="dataSensitivity">Data Sensitivity Level</label>
            <select name="dataSensitivity" id="dataSensitivity" value={inputs.dataSensitivity} onChange={handleChange}>
              <option value="low">Low (Public Information)</option>
              <option value="medium">Medium (Internal Corporate Data)</option>
              <option value="high">High (PII, Financial, PHI)</option>
            </select>
          </div>

          <div className="form-group toggle-group mt-2">
            <label htmlFor="isPublic">Publicly Accessible Deployment</label>
            <label className="switch">
              <input type="checkbox" id="isPublic" name="isPublic" checked={inputs.isPublic} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>

        </div>

        <div className="right-panel">
          <RiskPanel data={riskData} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
