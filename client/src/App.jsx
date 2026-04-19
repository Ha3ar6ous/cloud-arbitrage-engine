import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SimulatorPage from './pages/SimulatorPage';
import DashboardPage from './pages/DashboardPage';
import WhatIfPage from './pages/WhatIfPage';
import SecurityPage from './pages/SecurityPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/what-if" element={<WhatIfPage />} />
            <Route path="/security" element={<SecurityPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
