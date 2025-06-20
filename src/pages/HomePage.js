import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5',
      padding: '30px',
      textAlign: 'center'
    },
    card: {
      background: '#fff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      width: '100%'
    },
    banner: {
      width: '100%',
      height: 'auto',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    button: {
      padding: '12px 24px',
      margin: '10px',
      backgroundColor: '#222',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome to the Job Portal</h1>

        {/* ✅ Use local image instead of external link */}
        <img
  src="/images/banner.png"
  alt="Job Portal Banner"
  style={{
    width: '100%',
    borderRadius: '12px',
    marginBottom: '20px'
  }}
/>


        <h3>
          This platform bridges the gap between employers and informal sector workers.
          Easily post jobs or apply with just a few clicks!
        </h3>

        <div>
          <Link to="/register"><button style={styles.button}>Register</button></Link>
          <Link to="/login"><button style={styles.button}>Login</button></Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
