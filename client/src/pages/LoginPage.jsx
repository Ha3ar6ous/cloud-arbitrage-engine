import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MdLogin } from 'react-icons/md';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/simulator" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      await login(username.trim());
      navigate('/simulator');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card neo-box">
        <h2>System Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="input-group" style={{ width: '100%' }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter specific username..."
              required
            />
          </div>
          <button type="submit" className="neo-btn primary-btn mt-3" style={{ width: 'fit-content' }}>
            <MdLogin /> Continue to Workspace
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
