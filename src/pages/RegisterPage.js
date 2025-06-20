import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('worker');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/register', {
      name,
      email,
       phone,
      password,
      role
    })
      .then((res) => {
        alert('✅ Registered successfully! Now login.');
        navigate('/');
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Registration failed');
      });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f2f2f2',
    },
    card: {
      background: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      width: '300px',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    select: {
      width: '100%',
      padding: '10px',
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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />

          <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
            <option value="worker">Worker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
