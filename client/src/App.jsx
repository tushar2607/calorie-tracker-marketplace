import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { Activity, Apple, LayoutDashboard, Settings, LogOut, Store, Bot, Stethoscope } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import FoodDatabase from './pages/FoodDatabase';
import Marketplace from './pages/Marketplace';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AICoach from './pages/AICoach';
import FitnessDiagnostic from './pages/FitnessDiagnostic';
import SettingsPage from './pages/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';

// NavBar Component
const NavBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Apple color="#3b82f6" fill="#3b82f6" />
        <span className="text-gradient">NutriGen</span>
      </div>
      <div className="nav-links" style={{ flex: 1 }}>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/diagnostic" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Stethoscope size={20} /> Diagnostic Hub
        </NavLink>
        <NavLink to="/foods" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Activity size={20} /> Log Food
        </NavLink>
        <NavLink to="/marketplace" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Store size={20} /> Marketplace
        </NavLink>
        <NavLink to="/ai-coach" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Bot size={20} /> AI Coach
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} /> Settings
        </NavLink>
      </div>
      <div style={{ padding: '0 1rem' }}>
        <button 
          onClick={handleLogout}
          className="nav-item" 
          style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
          <LogOut size={20} color="var(--danger)" /> <span style={{ color: 'var(--danger)' }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex-center" style={{ height: '100vh', width: '100%' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Main Layout
const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="app-container">
      {user && <NavBar />}
      <main className="main-content" style={{ padding: user ? '2rem' : '0' }}>
        {children}
      </main>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/diagnostic" element={<ProtectedRoute><FitnessDiagnostic /></ProtectedRoute>} />
            <Route path="/foods" element={<ProtectedRoute><FoodDatabase /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            <Route path="/ai-coach" element={<ProtectedRoute><AICoach /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
