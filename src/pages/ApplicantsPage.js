import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../api';


function ViewApplicantsPage() {
  const { jobId } = useParams(); // comes from URL like /view-applicants/:jobId
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in first');
      navigate('/');
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.role !== 'employer') {
      alert('Access denied. Only employers can view applicants.');
      navigate('/dashboard');
      return;
    }

    // Fetch applicants for this job
    axios.get(`${BASE_URL}/api/job-applicants/${jobId}`, {
      headers: { Authorization: token }
    })
      .then((res) => {
        setApplicants(res.data.applicants || []);
        setJobTitle(res.data.jobTitle || '');
      })
      .catch((err) => {
        setMessage('❌ Failed to load applicants');
        console.error(err);
      });
  }, [jobId, navigate]);

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h2>Applicants for: {jobTitle}</h2>
      {message && <p>{message}</p>}

      {applicants.length === 0 ? (
        <p>No one has applied yet.</p>
      ) : (
        <ul>
          {applicants.map((applicant, index) => (
            <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <p><strong>Name:</strong> {applicant.name}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
              <p><strong>Phone:</strong> {applicant.phone}</p> {/* ✅ Show phone number */}
            </li>
          ))}
        </ul>
      )}

      <Link to="/my-jobs">
        <button style={{ marginTop: '20px' }}>🔙 Back to My Jobs</button>
      </Link>
    </div>
  );
}

export default ViewApplicantsPage;
