import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { BASE_URL } from '../api';

function MyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

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

    axios.get(`${BASE_URL}/api/my-jobs`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setJobs(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setMessage('❌ Failed to load jobs');
      });
  }, []);

  const handleDelete = (jobId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first!');
      return;
    }

    axios.delete(`${BASE_URL}/api/my-job/${jobId}`, {
      headers: { Authorization: token }
    })
      .then(() => {
        alert('✅ Job deleted successfully!');
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      })
      .catch((err) => {
        console.error('Delete job error:', err);
        alert('❌ Failed to delete job');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>My Posted Jobs</h2>
      {message && <p>{message}</p>}

      {jobs.length === 0 ? (
        <div>
          <p>You haven’t posted any jobs yet.</p>
          <p>Click <a href="/post-job">here</a> to post your first job!</p>
        </div>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h3>{job.title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              <button onClick={() => handleDelete(job._id)}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyJobsPage;
