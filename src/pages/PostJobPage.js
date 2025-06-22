import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';


function PostJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.role !== 'employer') {
      alert('Only employers can access this page.');
      navigate('/dashboard');
    }
  }, [navigate]);

  const handlePost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`${BASE_URL}/api/post-job`,
      { title, description, location, salary },
      { headers: {
  Authorization: `Bearer ${token}`  // ✅ Bearer prefix is compulsory
}
 }
    )
      .then((res) => {
        alert('✅ Job posted successfully!');
        navigate('/my-jobs');
      })
      .catch((err) => {
        alert(err.response?.data?.message || '❌ Failed to post job');
      });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    },
    card: {
      background: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      width: '400px',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      height: '80px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#222',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📝 Post a New Job</h2>
        <form onSubmit={handlePost}>
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default PostJobPage;
