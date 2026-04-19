import React, { useState, useEffect, useContext } from 'react';
import RiskPanel from '../components/RiskPanel';
import { AuthContext } from '../context/AuthContext';
import { MdShield, MdPublic, MdLock, MdLocationOn, MdCloudCircle, MdNewspaper, MdWarning } from 'react-icons/md';

const INCIDENTS = {
  AWS: [
    { date: 'Dec 2021', title: 'US-EAST-1 Outage', detail: 'Significant impairment of multiple AWS APIs in North Virginia region.' },
    { date: 'Feb 2017', title: 'S3 Error Rates', detail: 'Human error during debugging caused high error rates in S3.' }
  ],
  Azure: [
    { date: 'Oct 2021', title: 'Global DNS Outage', detail: 'Configuration change triggered outage for multiple Azure services.' },
    { date: 'Jan 2023', title: 'Networking Issues', detail: 'Wide-area networking connectivity issues globally.' }
  ],
  GCP: [
    { date: 'Aug 2022', title: 'London Datacenter Fire', detail: 'Zonal cooling failure caused by record temperatures.' },
    { date: 'Jun 2019', title: 'Google Cloud Outage', detail: 'Network configuration change caused major disruptions.' }
  ],
  DigitalOcean: [
    { date: 'Dec 2022', title: 'FRA1 Networking', detail: 'Network connectivity issues in Frankfurt region.' }
  ],
  Hetzner: [
    { date: 'Sep 2023', title: 'Control Panel DDoS', detail: 'Temporary disruption of management interface services.' }
  ],
  Linode: [
    { date: 'Jan 2016', title: 'DDoS Attacks', detail: 'Sustained DDoS attacks targeting Linode infrastructure.' }
  ]
};

const SecurityPage = () => {
  const [inputs, setInputs] = useState({
    region: 'ap-south-1', 
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
      <div className="flex-align">
        <div className="live-indicator">
          <span className="live-blinker"></span>
          RELIABILITY STREAM
        </div>
      </div>
      <h2><MdShield className="icon-inline" /> Security & Reliability Insights</h2>
      <p>Configure your architecture details to generate an automated security audit and risk score.</p>

      <div className="simulator-grid">
        <div className="left-panel input-form neo-box">
          <h3 className="flex-align"><MdCloudCircle className="icon-inline" /> Architecture Context</h3>
          
          <div className="form-group row">
            <div className="input-container">
              <label htmlFor="provider"><MdCloudCircle className="icon-tiny" /> Cloud Provider</label>
              <select name="provider" id="provider" value={inputs.provider} onChange={handleChange}>
                <option value="AWS">Amazon Web Services</option>
                <option value="Azure">Microsoft Azure</option>
                <option value="GCP">Google Cloud Platform</option>
                <option value="DigitalOcean">DigitalOcean</option>
                <option value="Hetzner">Hetzner</option>
                <option value="Linode">Linode</option>
              </select>
            </div>
            
            <div className="input-container">
              <label htmlFor="region"><MdLocationOn className="icon-tiny" /> Deployment Region</label>
              <select name="region" id="region" value={inputs.region} onChange={handleChange}>
                <option value="us-east-1">US (N. Virginia)</option>
                <option value="eu-west-1">EU (Ireland)</option>
                <option value="ap-south-1">Asia Pacific (Mumbai)</option>
              </select>
            </div>
          </div>

          <div className="form-group mt-2">
            <label htmlFor="dataSensitivity"><MdLock className="icon-tiny" /> Data Sensitivity Level</label>
            <select name="dataSensitivity" id="dataSensitivity" value={inputs.dataSensitivity} onChange={handleChange}>
              <option value="low">Low (Public Information)</option>
              <option value="medium">Medium (Internal Corporate Data)</option>
              <option value="high">High (PII, Financial, PHI)</option>
            </select>
          </div>

          <div className="form-group toggle-group mt-2">
            <label htmlFor="isPublic"><MdPublic className="icon-tiny" /> Publicly Accessible Deployment</label>
            <label className="switch">
              <input type="checkbox" id="isPublic" name="isPublic" checked={inputs.isPublic} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="security-incidents mt-4">
            <h4 className="flex-align"><MdNewspaper className="icon-inline" /> Recent Provider Incidents</h4>
            <div className="incident-grid">
              {INCIDENTS[inputs.provider].map((incident, i) => (
                <div key={i} className="incident-card neo-box mini">
                  <span className="incident-date">{incident.date}</span>
                  <strong>{incident.title}</strong>
                  <p>{incident.detail}</p>
                </div>
              ))}
            </div>
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
