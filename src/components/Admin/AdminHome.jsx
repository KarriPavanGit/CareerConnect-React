import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';

function AdminHome() {
  const navigate = useNavigate();
  const name = sessionStorage.getItem('name') || 'Admin';

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!id || role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        color: '#000',
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <AdminSideBar />
      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Welcome Back, {name}!</h1>
          <p style={{ fontSize: '1.2rem' }}>
            Here's an overview of your dashboard.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Manage Users</h2>
            <p style={{ fontSize: '1rem' }}>Add, update, or remove users easily.</p>
          </div>
          {/* Card 2 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Job Postings</h2>
            <p style={{ fontSize: '1rem' }}>View and manage job opportunities.</p>
          </div>
          {/* Card 3 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Reports</h2>
            <p style={{ fontSize: '1rem' }}>
              Generate detailed placement reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
