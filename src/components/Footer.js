import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1e1e1e',
      color: '#ccc',
      padding: '25px 10px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      marginTop: '40px'
    }}>
      <p style={{ margin: '5px 0', fontSize: '15px', fontWeight: 'bold' }}>
        © 2025 Job Portal for Informal Sector Workers
      </p>
      
      <p style={{ margin: '4px 0' }}>
        Developed by <strong style={{ color: '#fff' }}>Amit Tiwari</strong> (MCA Final Year Project)
      </p>

      <p style={{ margin: '4px 0' }}>
        Built with <span style={{ color: '#61dafb' }}>React</span>, <span style={{ color: '#68a063' }}>Node.js</span>, Express & MongoDB
      </p>
    </footer>
  );
}

export default Footer;
