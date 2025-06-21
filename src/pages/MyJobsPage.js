import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

function MyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/';
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.role !== 'employer') {
      alert('Access denied. Only employers can view this page.');
      window.location.href = '/dashboard';
      return;
    }

    axios
      .get(`${BASE_URL}/api/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setJobs(res.data.jobs || res.data); // handles both formats
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setMessage('❌ Failed to load jobs');
      });
  }, []);

  const handleDeleteJob = (jobId) => {
    const token = localStorage.getItem('token');

    if (!window.confirm('Are you sure you want to delete this job?')) return;

    axios
      .delete(`${BASE_URL}/api/my-job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert('✅ Job deleted successfully');
      })
      .catch((err) => {
        console.error('Error deleting job:', err);
        alert('❌ Failed to delete job');
      });
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/job-applicants/${jobId}`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📋 My Posted Jobs</h2>

      {message && <p>{message}</p>}

      {jobs.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>You haven’t posted any jobs yet.</p>
          <p>
            Click <a href="/post-job">here</a> to post your first job!
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px',
                background: '#fdfdfd',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}
            >
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>

              <div style={{ marginTop: '15px' }}>
                <button
                  onClick={() => handleViewApplicants(job._id)}
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    marginRight: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  👀 View Applicants
                </button>

                <button
                  onClick={() => handleDeleteJob(job._id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  🗑️ Delete Job
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyJobsPage;
