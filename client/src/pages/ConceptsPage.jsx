import React from 'react';
import { MdSchool, MdBookmark } from 'react-icons/md';

const ConceptsPage = () => {
  const modules = [
    {
      title: "Module 1: Introduction to Cloud Computing",
      topics: [
        "1.1 Evolution of Cloud Computing: Comparison between Cluster, Grid and Cloud Computing. Benefits & Challenges.",
        "1.2 Deployment Models: Private, Public, Community, and Hybrid cloud types.",
        "Service Models: SaaS (Software), PaaS (Platform), IaaS (Infrastructure), XaaS (Anything), DBaaS, AIaaS, FaaS. The SPI Model and Service Abstraction.",
        "1.3 Scaling: Vertical (Scale-Up) and Horizontal (Scale-Out) scaling strategies."
      ]
    },
    {
      title: "Module 2: Virtualization",
      topics: [
        "2.1 Types of Virtualization: CPU, Storage, Memory, OS, and Hardware. Abstraction of physical computing resources.",
        "2.2 Hypervisors: Type 1 (Bare Metal) and Type 2 (Hosted) Hypervisors. HLL Virtual Machines and Emulation.",
        "2.3 Security: Specific threats and vulnerabilities in virtualized environments.",
        "2.4 Resource Management: Pooling, Sharing, and Provisioning logic."
      ]
    },
    {
      title: "Module 3: Containerization",
      topics: [
        "3.1 Architecture: Comparison of Image vs Container. Virtualization vs Containerization efficiency.",
        "3.2 Docker: Dockerfile structure, Images, and DockerHub registry ecosystem.",
        "3.3 Orchestration: Kubernetes basics - Pods, ReplicaSets, Deployments, and YAML configuration."
      ]
    },
    {
      title: "Module 4: Architecture of Cloud and IoT",
      topics: [
        "4.1 Platforms: eucalyptus and OpenStack architecture and operation modes.",
        "4.2 Cloud Giants: Architecture and comparison of AWS (Amazon), Azure (Microsoft), and Google App Engine.",
        "4.3 IoT Integration: Role of cloud in IoT, Edge Computing, and Fog Computing architectures."
      ]
    },
    {
      title: "Module 5: Security & Cost Management",
      topics: [
        "5.1 Security Principles: Identity & Access Management (IAM), Design Principles, and Management Frameworks.",
        "5.2 Host Security: Comparative security in SaaS, PaaS, and IaaS layers.",
        "5.3 Cost Optimization: Cloud budget management, Reserved vs Spot instances, and FinOps principles."
      ]
    }
  ];

  return (
    <div className="page-container concepts-page">
      <div className="flex-align mb-1">
        <MdSchool className="icon-inline" style={{ fontSize: '2rem', color: '#22c55e' }} />
        <h2 style={{ margin: 0 }}>Syllabus Concepts</h2>
      </div>
      <p className="mb-2">A concise summary of key cloud computing concepts directly from the course syllabus.</p>

      <div className="concepts-grid">
        {modules.map((m, idx) => (
          <div key={idx} className="concept-module neo-box">
            <h3 className="module-title">
              <MdBookmark className="icon-tiny" /> {m.title}
            </h3>
            <ul className="topic-list">
              {m.topics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .concepts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
        }
        .concept-module {
          background: #fff;
          padding: 20px;
        }
        .module-title {
          font-size: 1.25rem;
          margin-bottom: 15px;
          color: #1a1a1a;
          border-bottom: 2px solid #22c55e;
          padding-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .topic-list {
          list-style: none;
          padding: 0;
        }
        .topic-list li {
          margin-bottom: 10px;
          font-size: 0.95rem;
          color: #444;
          line-height: 1.4;
          position: relative;
          padding-left: 15px;
        }
        .topic-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
        }
      `}} />
    </div>
  );
};

export default ConceptsPage;
