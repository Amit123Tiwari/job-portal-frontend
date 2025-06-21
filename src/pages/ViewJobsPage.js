import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../api';
function ViewJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/jobs`)
      .then((res) => {
        setJobs(res.data || []);
      })
      .catch((err) => {
        setMessage('❌ Failed to load jobs');
        console.error(err);
      });
  }, []);

  const handleApply = (jobId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first to apply!');
      return;
    }

    const decoded = jwtDecode(token);

    if (decoded.role !== 'worker') {
      alert('Only workers can apply to jobs');
      return;
    }

    axios.post(`${BASE_URL}/api/apply-job`, { jobId }, {
      headers: { Authorization: token }
    })
      .then(() => {
        alert('✅ Applied successfully!');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || '❌ Failed to apply';
        alert(msg);
      });
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h2>Available Jobs</h2>
      {message && <p>{message}</p>}

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '15px' }}>
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>
              <p><strong>Posted By:</strong> {job.postedBy?.name} ({job.postedBy?.email})</p>
              <p><strong>📞 Employer Phone:</strong> <a href={`tel:${job.postedBy?.phone}`}>{job.postedBy?.phone}</a></p> {/* ✅ show phone */}

              <button onClick={() => handleApply(job._id)}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewJobsPage;
