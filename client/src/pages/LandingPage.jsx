import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const { user, login } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/simulator" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Cloud Arbitrage Engine</h1>
          <p>Optimize your cloud deployments</p>
        </div>
      </nav>
      <main className="landing-content">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
