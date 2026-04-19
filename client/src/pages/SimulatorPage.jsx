import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';

const SimulatorPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSimulate = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
