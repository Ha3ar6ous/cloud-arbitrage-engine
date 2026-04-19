import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSpeed, MdDashboard, MdQueryStats, MdSecurity, MdAnalytics, MdCompareArrows, MdCheckCircleOutline } from 'react-icons/md';

const FEATURES = [
  { icon: <MdSpeed />, title: 'Simulator', desc: 'Plug in raw CPU & RAM to predict baseline costs in seconds.' },
  { icon: <MdDashboard />, title: 'Dashboard', desc: 'Visualize scaling trends and score reliability metrics.' },
  { icon: <MdQueryStats />, title: 'What-If', desc: 'Simple traffic testing to see how bills explode or shrink.' },
  { icon: <MdSecurity />, title: 'Audit', desc: 'Identify architectural oversights before deployment.' },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [ticker, setTicker] = useState(128.45);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker(prev => parseFloat((prev + (Math.random() * 2 - 1)).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container bg-crosshatch">
      {/* Navbar */}
      <nav className="navbar neo-navbar">
        <div className="navbar-brand branding-compact">
          <h1>Cloud Arbitrage Engine</h1>
        </div>
        <div>
          <button className="neo-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>
      
      <main className="landing-content">
        {/* REFINED HERO SECTION */}
        <section className="hero-section-wrapper">
          <div className="hero-text-content">
            <div className="hero-badges">
              <div className="hero-ticker">
                SAVINGS: <span className="ticker-value">₹{ticker}</span>/hr
              </div>
            </div>
            
            <h2 className="hero-title">
              Find the Cheapest & Smartest Cloud for Your App
            </h2>
            <p className="hero-subtitle">
              Simulate real workloads • Compare global providers in INR • Get beginner-friendly explanations and find arbitrage opportunities instantly.
            </p>
            
            <div className="provider-logos-hero">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="hero-logo animate-slow-float" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" alt="Azure" className="hero-logo animate-slow-float" style={{ animationDelay: '1s' }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="GCP" className="hero-logo animate-slow-float" style={{ animationDelay: '2s' }} />
            </div>

            <button 
              className="neo-btn primary-btn large-btn hero-cta" 
              onClick={() => navigate('/login')}
            >
              Get Started Now
            </button>
          </div>

          <div className="hero-visual-content">
            <div className="mockup-container">
              <img src="/heroimage.png" alt="Dashboard Mockup" className="mockup-img" />
              <div className="mockup-overlay">
                <span className="scraping-text">Analyzing global pricing nodes...</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Marquee */}
        <div className="marquee-section">
          <div className="marquee-mask">
            <div className="marquee-content">
              {[...FEATURES, ...FEATURES].map((f, i) => (
                <div key={i} className="feature-card neo-box">
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step-arrow"></div>
            <div className="step-card neo-box">
              <div className="step-number">1</div>
              <MdAnalytics className="step-icon" />
              <h4>Define Workload</h4>
              <p>Set your CPU, RAM, and expected user traffic.</p>
            </div>
            <div className="step-card neo-box">
              <div className="step-number">2</div>
              <MdCompareArrows className="step-icon" />
              <h4>Compare Real Data</h4>
              <p>We analyze real-time pricing across major regions.</p>
            </div>
            <div className="step-card neo-box">
              <div className="step-number">3</div>
              <MdCheckCircleOutline className="step-icon" />
              <h4>Launch Smarter</h4>
              <p>Deploy to the provider that gives the best score.</p>
            </div>
          </div>
        </section>

        {/* Built for Devs */}
        <section className="built-for-devs neo-box">
          <div className="devs-content">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Built for Developers</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Cloud pricing is a maze. We built this platform to provide <strong>beginner-friendly explanations</strong> behind every score. No complex billing PhD required.
            </p>
            <ul className="devs-list">
              <li><MdCheckCircleOutline className="icon-success" /> Tooltips on every complex term</li>
              <li><MdCheckCircleOutline className="icon-success" /> Scenario presets for quick starts</li>
              <li><MdCheckCircleOutline className="icon-success" /> Transparent reliability indexing</li>
            </ul>
          </div>
          <div className="devs-visual">
            <div className="code-box">
              <code>
                <span className="code-comment">// The Arbitrage Logic</span><br />
                if (aws.cost &gt; gcp.cost) &#123;<br />
                &nbsp;&nbsp;console.log("Switching to GCP!");<br />
                &nbsp;&nbsp;savings = aws.cost - gcp.cost;<br />
                &#125;
              </code>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© 2026 Cloud Arbitrage Engine • Built with ❤️</p>
      </footer>
    </div>
  );
};

export default LandingPage;
