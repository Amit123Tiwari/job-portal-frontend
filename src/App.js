import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PostJobPage from './pages/PostJobPage';
import MyJobsPage from './pages/MyJobsPage';
import ViewJobsPage from './pages/ViewJobsPage';
import AdminDashboard from './pages/AdminDashboard';
import ViewApplicantsPage from './pages/ViewApplicantsPage'; // ✅ for /job-applicants/:jobId
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // ✅ Home page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/my-jobs" element={<MyJobsPage />} />
        <Route path="/jobs" element={<ViewJobsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/job-applicants/:jobId" element={<ViewApplicantsPage />} /> {/* ✅ Important route */}
      </Routes>
    </Router>
  );
}

export default App;
