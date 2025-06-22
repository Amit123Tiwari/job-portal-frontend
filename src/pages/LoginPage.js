import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/api/login`, { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Login failed');
      });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f2f2f2' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '300px', textAlign: 'center' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', fontSize: '14px' }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
