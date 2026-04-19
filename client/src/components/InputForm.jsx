import React, { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';

const Tooltip = ({ text }) => (
  <span className="tooltip-wrapper">
    <MdInfoOutline className="info-icon" />
    <span className="tooltip-text">{text}</span>
  </span>
);

const InputForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    cpu: 2,
    ram: 4,
    storage: 50,
    region: 'ap-south-1',
    workloadType: 'web',
    trafficLevel: 50,
    deploymentFrequency: 'medium',
    scalingPreference: false,
    ...(initialData || {})
  });

  // Sync when presets change
  React.useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' || type === 'range' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <h3>Simulation Parameters</h3>
      
      <div className="form-group row">
        <div className="input-container">
          <label htmlFor="cpu">
            CPU (Cores) <Tooltip text="Processing power required for your app. More cores = faster compute." />
          </label>
          <input type="number" id="cpu" name="cpu" min="1" value={formData.cpu} onChange={handleChange} />
        </div>
        
        <div className="input-container">
          <label htmlFor="ram">
            RAM (GB) <Tooltip text="Memory needed to handle your workload efficiently." />
          </label>
          <input type="number" id="ram" name="ram" min="1" value={formData.ram} onChange={handleChange} />
        </div>

        <div className="input-container">
          <label htmlFor="storage">
            Storage (GB) <Tooltip text="Disk space for your application data and files." />
          </label>
          <input type="number" id="storage" name="storage" min="10" value={formData.storage} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group row">
        <div className="input-container">
          <label htmlFor="region">
            Region <Tooltip text="Server location — closer to users means lower latency." />
          </label>
          <select id="region" name="region" value={formData.region} onChange={handleChange}>
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="eu-west-1">EU (Ireland)</option>
            <option value="ap-south-1">Asia Pacific (Mumbai)</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="workloadType">
            Workload Type <Tooltip text="The kind of application you're running — affects optimization strategy." />
          </label>
          <select id="workloadType" name="workloadType" value={formData.workloadType} onChange={handleChange}>
            <option value="web">Web Application</option>
            <option value="database">Database</option>
            <option value="batch">Batch Processing</option>
            <option value="ml">Machine Learning</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="trafficLevel">
          Traffic Level: <strong>{formData.trafficLevel}</strong>
          <Tooltip text="Number of concurrent users accessing your app." />
        </label>
        <input 
          type="range" 
          id="trafficLevel" 
          name="trafficLevel" 
          min="1" 
          max="100" 
          value={formData.trafficLevel} 
          onChange={handleChange} 
        />
      </div>

      <div className="form-group">
        <label>
          Deployment Frequency
          <Tooltip text="How often you push updates — affects CI/CD recommendations." />
        </label>
        <div className="radio-group">
          <label>
            <input type="radio" name="deploymentFrequency" value="low" checked={formData.deploymentFrequency === 'low'} onChange={handleChange} />
            Low
          </label>
          <label>
            <input type="radio" name="deploymentFrequency" value="medium" checked={formData.deploymentFrequency === 'medium'} onChange={handleChange} />
            Medium
          </label>
          <label>
            <input type="radio" name="deploymentFrequency" value="high" checked={formData.deploymentFrequency === 'high'} onChange={handleChange} />
            High
          </label>
        </div>
      </div>

      <div className="form-group toggle-group">
        <label htmlFor="scalingPreference">
          Auto-scaling
          <Tooltip text="Automatically adjust resources based on traffic — saves cost during low usage." />
        </label>
        <label className="switch">
          <input type="checkbox" id="scalingPreference" name="scalingPreference" checked={formData.scalingPreference} onChange={handleChange} />
          <span className="slider round"></span>
        </label>
      </div>

      <button type="submit" className="submit-btn">Run Simulation</button>
    </form>
  );
};

export default InputForm;
