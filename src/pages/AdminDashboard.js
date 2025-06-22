import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState('');
  const token = localStorage.getItem('token');

  // ✅ Reusable fetchUsers wrapped in useCallback
  const fetchUsers = useCallback(() => {
    axios.get(`${BASE_URL}/api/admin/users`, {
      headers: { Authorization: token }
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, [token]);

  // ✅ useEffect with token dependency
  useEffect(() => {
    if (!token) {
      alert('Unauthorized');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setAdminName(decoded.name || 'Admin');
    } catch (err) {
      console.error('Invalid token');
    }

    fetchUsers();
  }, [token, fetchUsers]);

  // ✅ Delete user using BASE_URL
  const deleteUser = (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    axios.delete(`${BASE_URL}/api/admin/users/${userId}`, {
      headers: {
  Authorization: `Bearer ${token}`  // ✅ Bearer prefix is compulsory
}

    })
      .then(() => {
        alert('User deleted successfully');
        fetchUsers();
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      });
  };

  const workers = users.filter((user) => user.role === 'worker');
  const employers = users.filter((user) => user.role === 'employer');

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        Welcome, <strong>{adminName}</strong>
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px'
      }}>

        {/* 👷 Workers */}
        <div style={{
          flex: '1 1 45%',
          background: '#f8f8f8',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h3>👷 Workers ({workers.length})</h3>
          {workers.length === 0 ? (
            <p>No workers found.</p>
          ) : (
            <ul>
              {workers.map((user) => (
                <li key={user._id} style={{ marginBottom: '8px' }}>
                  <strong>{user.name}</strong> — {user.email}
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{
                      marginLeft: '10px',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🧑‍💼 Employers */}
        <div style={{
          flex: '1 1 45%',
          background: '#e6f0ff',
          padding: '20px',
          borderRadius: '10px'
        }}>
          <h3>🧑‍💼 Employers ({employers.length})</h3>
          {employers.length === 0 ? (
            <p>No employers found.</p>
          ) : (
            <ul>
              {employers.map((user) => (
                <li key={user._id} style={{ marginBottom: '8px' }}>
                  <strong>{user.name}</strong> — {user.email}
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{
                      marginLeft: '10px',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
