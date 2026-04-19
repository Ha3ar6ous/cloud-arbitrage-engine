import React from 'react';
import { MdSchool, MdCheckCircle, MdCode, MdSecurity as MdSecurityIcon, MdAnalytics } from 'react-icons/md';

const ConceptsPage = () => {
  const modules = [
    {
      title: "Module 1: Service Models & Scaling",
      icon: <MdAnalytics />,
      content: [
        {
          topic: "IaaS & PaaS Delivery Models",
          theory: "Infrastructure as a Service provides virtualized computing resources (CPU/RAM/Storage) over the internet.",
          implementation: "Our 'Simulator' handles IaaS configurations where you pick raw hardware specs to predict monthly billing."
        },
        {
          topic: "Horizontal vs Vertical Scaling",
          theory: "Vertical scaling increases the power of a single node; Horizontal scaling adds more nodes to a cluster.",
          implementation: "The 'What-If' module simulates Horizontal Scaling costs by adding instance units based on user traffic sliders."
        }
      ]
    },
    {
      title: "Module 4: Provider Architectures",
      icon: <MdCode />,
      content: [
        {
          topic: "Hyperscaler Comparison",
          theory: "Analyzing the architecture, uptime, and pricing regions of major clouds like AWS, Azure, and GCP.",
          implementation: "The 'Comparison Dashboard' fetches real-world regional data (ap-south-1) to grade these giants on performance and cost."
        }
      ]
    },
    {
      title: "Module 5: Security & Cost Optimization",
      icon: <MdSecurityIcon />,
      content: [
        {
          topic: "Cloud Cost Optimization (FinOps)",
          theory: "The practice of bringing financial accountability to the variable spend model of cloud.",
          implementation: "This entire engine is a FinOps tool. It identifies 'Arbitrage' opportunities—switching providers to save money automatically."
        },
        {
          topic: "Reserved vs Spot Instances",
          theory: "Reserved instances are prepaid for stability; Spot instances are spare capacity at 70-90% discount.",
          implementation: "Our recommendation logic suggests switching to 'Spot Instances' if your workload is interruptible, maximizing savings."
        },
        {
          topic: "Security Design Principles",
          theory: "Protecting data and hosts through identity management, encryption, and region-locked compliance.",
          implementation: "The 'Security Audit' page evaluates your setup against threats and provides a weighted safety score."
        }
      ]
    }
  ];

  return (
    <div className="page-container concepts-page">
      <div className="flex-align mb-1">
        <MdSchool className="icon-inline" style={{ fontSize: '2.5rem', color: '#22c55e' }} />
        <div>
          <h2 style={{ margin: 0 }}>Syllabus Implementation Mapping</h2>
          <p style={{ margin: 0, color: '#666' }}>Bridging academic theory with this platform's practical features.</p>
        </div>
      </div>
      <hr className="mb-2" style={{ border: 'none', borderTop: '2px solid #1a1a1a' }} />

      <div className="concepts-vertical-grid">
        {modules.map((m, idx) => (
          <div key={idx} className="concept-module-large neo-box">
            <div className="module-header-main">
              <span className="module-idx">0{idx + 1}</span>
              {m.icon}
              <h3>{m.title}</h3>
            </div>
            
            <div className="topics-container">
              {m.content.map((item, i) => (
                <div key={i} className="topic-block neo-box mini">
                  <div className="topic-header">
                    <MdCheckCircle className="icon-success" />
                    <strong>{item.topic}</strong>
                  </div>
                  <div className="topic-details">
                    <p className="theory-text"><strong>Theory:</strong> {item.theory}</p>
                    <p className="impl-text"><strong>In This Project:</strong> {item.implementation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .concepts-vertical-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .concept-module-large {
          background: #fff;
          padding: 25px;
        }
        .module-header-main {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          border-bottom: 3px solid #1a1a1a;
          padding-bottom: 10px;
        }
        .module-header-main h3 {
          margin: 0;
          text-transform: uppercase;
          font-size: 1.5rem;
        }
        .module-idx {
          background: #1a1a1a;
          color: #22c55e;
          padding: 2px 10px;
          font-weight: 900;
          font-size: 1.2rem;
          transform: rotate(-5deg);
        }
        .topic-block {
          margin-bottom: 20px;
          background: #fafafa;
        }
        .topic-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 10px;
          border-bottom: 1px dashed #ccc;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        .theory-text {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 8px;
        }
        .impl-text {
          font-size: 0.95rem;
          color: #1a1a1a;
          padding: 8px;
          background: #f0fdf4;
          border-left: 4px solid #22c55e;
          font-weight: 600;
        }
        .icon-success {
          color: #22c55e;
        }
      `}} />
    </div>
  );
};

export default ConceptsPage;
