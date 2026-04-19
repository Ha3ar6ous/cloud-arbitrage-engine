import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSpeed, MdDashboard, MdQueryStats, MdSecurity } from 'react-icons/md';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar neo-navbar">
        <div className="navbar-brand">
          <h1>Cloud Arbitrage Engine</h1>
        </div>
        <div>
          <button className="neo-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>
      
      <main className="landing-content">
        <div className="landing-split">
          <div className="landing-hero">
            <h2 className="hero-title">Optimize Cloud Costs Instantly</h2>
            <p>
              Simulate architectures, compare providers like AWS, Azure, and GCP, 
              and instantly uncover deep structural and financial optimizations.
            </p>
            <button className="neo-btn primary-btn large-btn mt-2" onClick={() => navigate('/login')}>
              Get Started Now
            </button>
          </div>

          <div className="landing-features">
            <div className="feature-grid">
              
              <div className="feature-card neo-box">
                <MdSpeed className="feature-icon" />
                <h3>Simulator</h3>
                <p>Plug in raw CPU & RAM to predict baseline costs in seconds.</p>
              </div>

              <div className="feature-card neo-box">
                <MdDashboard className="feature-icon" />
                <h3>Dashboard</h3>
                <p>Visualize scaling trends and score reliability metrics.</p>
              </div>

              <div className="feature-card neo-box">
                <MdQueryStats className="feature-icon" />
                <h3>What-If</h3>
                <p>Tweak simulated traffic to see how bills explode or shrink.</p>
              </div>

              <div className="feature-card neo-box">
                <MdSecurity className="feature-icon" />
                <h3>Audit</h3>
                <p>Identify architectural oversights before deployment.</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
