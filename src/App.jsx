import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import AIResume from './pages/AIResume';
import AIPrep from './pages/AIPrep';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/add-job" element={
                <ProtectedRoute>
                  <Navbar />
                  <AddJob />
                </ProtectedRoute>
              } />
              <Route path="/edit-job/:id" element={
                <ProtectedRoute>
                  <Navbar />
                  <EditJob />
                </ProtectedRoute>
              } />
              <Route path="/ai-resume" element={
                <ProtectedRoute>
                  <Navbar />
                  <AIResume />
                </ProtectedRoute>
              } />
              <Route path="/ai-prep" element={
                <ProtectedRoute>
                  <Navbar />
                  <AIPrep />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;