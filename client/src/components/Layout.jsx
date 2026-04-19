import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MdSpeed, MdDashboard, MdQueryStats, MdSecurity, MdLogout } from 'react-icons/md';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout-container">
      <aside className="sidebar neo-sidebar">
        <div className="sidebar-header">
          <h2>Cloud Engine</h2>
          <p>Welcome, {user}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/simulator" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
            <MdSpeed className="nav-icon" /> Simulator
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
            <MdDashboard className="nav-icon" /> Dashboard
          </NavLink>
          <NavLink to="/what-if" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
            <MdQueryStats className="nav-icon" /> What-if
          </NavLink>
          <NavLink to="/security" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
            <MdSecurity className="nav-icon" /> Security
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button className="neo-btn logout-btn" onClick={handleLogout}>
            <MdLogout className="nav-icon" /> Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
