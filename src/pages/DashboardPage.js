import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/';
    } else {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Dashboard</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Phone:</strong> {user.phone}</p> {/* ✅ Showing phone */}
    </div>
  );
}

export default DashboardPage;
