import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Cloud App</h2>
          <p>Welcome, {user}</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/simulator" className={({ isActive }) => (isActive ? 'active-link' : '')}>Simulator</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>Dashboard</NavLink>
          <NavLink to="/what-if" className={({ isActive }) => (isActive ? 'active-link' : '')}>What-if</NavLink>
          <NavLink to="/security" className={({ isActive }) => (isActive ? 'active-link' : '')}>Security</NavLink>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
