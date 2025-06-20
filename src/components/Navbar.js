import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/login');
  };

  const requireLogin = () => {
    alert('🚫 Please login to access this feature');
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: '#222',
    color: '#fff'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '18px',
    fontSize: '16px'
  };

  return (
    <nav style={navStyle}>
      {/* Logo + Name */}
      <Link to="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/images/logo.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px' }}>Job Portal</span>
      </Link>

<div>
  {/* ✅ Home is always shown */}
  <Link to="/home" style={linkStyle}>Home</Link>

  {!token && (
    <>
      <Link to="/register" style={linkStyle}>Register</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
    </>
  )}

  {token && (
    <>
      <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

      {role === 'employer' && (
        <>
          <Link to="/post-job" style={linkStyle}>Post Job</Link>
          <Link to="/my-jobs" style={linkStyle}>My Jobs</Link>
        </>
      )}

      {role === 'worker' && (
        <Link to="/jobs" style={linkStyle}>Browse Jobs</Link>
      )}

      {role === 'admin' && (
        <Link to="/admin" style={linkStyle}>Admin Panel</Link>
      )}

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Logout
      </button>
    </>
  )}
</div>

    </nav>
  );
}

export default Navbar;
