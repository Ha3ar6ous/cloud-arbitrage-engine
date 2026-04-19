import React, { useState, useContext, useEffect } from 'react';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import { AuthContext } from '../context/AuthContext';
import { MdRocketLaunch, MdTrendingUp, MdWeb } from 'react-icons/md';
import pricingData from '../data/pricingData.json';

const PRESETS = {
  startup: {
    label: 'Startup App',
    icon: <MdRocketLaunch />,
    data: { cpu: 2, ram: 4, storage: 50, region: 'ap-south-1', workloadType: 'web', trafficLevel: 30, deploymentFrequency: 'high', scalingPreference: true }
  },
  highTraffic: {
    label: 'High Traffic',
    icon: <MdTrendingUp />,
    data: { cpu: 8, ram: 32, storage: 200, region: 'us-east-1', workloadType: 'web', trafficLevel: 95, deploymentFrequency: 'medium', scalingPreference: true }
  },
  static: {
    label: 'Static Website',
    icon: <MdWeb />,
    data: { cpu: 1, ram: 1, storage: 20, region: 'ap-south-1', workloadType: 'web', trafficLevel: 10, deploymentFrequency: 'low', scalingPreference: false }
  }
};

const LOADING_MESSAGES = [
  'Analyzing providers...',
  'Calculating costs...',
  'Ranking recommendations...'
];

const SimulatorPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');
  const [preset, setPreset] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSimulate = async (formData) => {
    setLoading(true);
    setError('');
    setResult(null);

    // Cycle through loading messages
    let msgIndex = 0;
    setLoadingMsg(LOADING_MESSAGES[0]);
    const msgInterval = setInterval(() => {
      msgIndex++;
      if (msgIndex < LOADING_MESSAGES.length) {
        setLoadingMsg(LOADING_MESSAGES[msgIndex]);
      }
    }, 600);
    
    try {
      const payload = {
        ...formData,
        pricingData
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

      // Ensure minimum loading time of 1.5s for UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      clearInterval(msgInterval);
      setLoading(false);
      setLoadingMsg('');
    }
  };

  const applyPreset = (key) => {
    setPreset({ ...PRESETS[key].data });
    setResult(null);
  };

  return (
    <div className="page-container simulator-page">
      <h2>Cloud Arbitrage Simulator</h2>
      <p>Configure your workload requirements to find the best provider and optimization strategies.</p>
      
      <div className="preset-bar">
        <span className="preset-label">Quick Start:</span>
        {Object.entries(PRESETS).map(([key, val]) => (
          <button key={key} className="neo-btn preset-btn" onClick={() => applyPreset(key)}>
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="simulator-grid">
        <div className="left-panel">
          <InputForm onSubmit={handleSimulate} initialData={preset} />
        </div>
        <div className="right-panel">
          {loading && (
            <div className="loading-card neo-box">
              <div className="spinner"></div>
              <p className="loading-msg">{loadingMsg}</p>
            </div>
          )}
          {error && <p className="error-text">{error}</p>}
          {!loading && <ResultCard result={result} />}
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
