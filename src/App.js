import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Schedule from './pages/Schedule';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';
import AnalyticsPage from './pages/AnalyticsPage';
import Help from './pages/Help';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
