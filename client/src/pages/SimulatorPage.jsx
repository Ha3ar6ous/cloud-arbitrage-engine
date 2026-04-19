import React, { useState, useContext } from 'react';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import { AuthContext } from '../context/AuthContext';
import pricingData from '../data/pricingData.json';

const SimulatorPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleSimulate = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const payload = {
        ...formData,
        pricingData // Send to backend to perform calculation
      };

      const response = await fetch('http://localhost:5000/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-username': user
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Simulation failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container simulator-page">
      <h2>Cloud Arbitrage Simulator</h2>
      <p>Configure your workload requirements to find the best provider and optimization strategies.</p>
      
      <div className="simulator-grid">
        <div className="left-panel">
          <InputForm onSubmit={handleSimulate} />
          {loading && <p className="loading-text">Running Simulation...</p>}
          {error && <p className="error-text">{error}</p>}
        </div>
        <div className="right-panel">
          <ResultCard result={result} />
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
