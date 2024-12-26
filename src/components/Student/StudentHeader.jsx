import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function StudentHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    navigate('/login');
  };

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '250px',
    backgroundColor: '#2c3e50',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.3)',
    zIndex: 1000,
  };

  const titleStyle = {
    fontSize: '1.8rem',
    color: 'white',
    margin: 0,
    paddingBottom: '20px',
    borderBottom: '2px solid white',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#1a242f',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  };

  const buttonHoverStyle = {
    backgroundColor: 'white',
    color: '#2c3e50',
    fontWeight: 'bold', // or use numeric values like 700 for boldness
  };
  

  return (
    <aside style={sidebarStyle}>
      {/* Title */}
      <h1 style={titleStyle}>Placement Portal</h1>

      {/* Navigation Buttons */}
      <div style={buttonContainerStyle}>
        <Link
          to="/student/profile"
          style={{ ...buttonStyle, textDecoration: 'none' }}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Profile
        </Link>
        <Link
          to="/student/jobs"
          style={{ ...buttonStyle, textDecoration: 'none' }}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Jobs
        </Link>
        <Link
          to="/student/applied"
          style={{ ...buttonStyle, textDecoration: 'none' }}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Applied
        </Link>
        <button
        onClick={handleLogout}
        style={{
          ...buttonStyle,
          position: 'absolute',
          width:'225px',
          bottom: '20px',
          left: '8px',
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
          e.target.style.color = buttonHoverStyle.color;
          e.target.style.fontWeight = buttonHoverStyle.fontWeight;
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = buttonStyle.backgroundColor;
          e.target.style.color = buttonStyle.color;
          e.target.style.fontWeight = 'normal';
        }}
      >
        Logout
      </button>
      </div>
    </aside>
  );
}

export default StudentHeader;
