import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/recruitersidebar.css';

function RecruiterSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle log out
  const handleLogout = () => {
    // Clear session or localStorage when logging out
    sessionStorage.clear(); // or use localStorage.clear() based on where the data is stored
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <div className="sidebar">
       <h1 className='titlestyle'>Placement Portal</h1>
      <ul>
        <li>
          <Link to="/recruiter/recruiterprofile" className={location.pathname === '/recruiter/recruiterprofile' ? 'active' : ''}>View/Edit Profile</Link>
        </li>
        <li>
          <Link to="/recruiter/addjob" className={location.pathname === '/recruiter/addjob' ? 'active' : ''}>Add Job</Link>
        </li>
        <li>
          <Link to="/recruiter/viewalljobs" className={location.pathname === '/recruiter/viewalljobs' ? 'active' : ''}>View all Jobs</Link>
        </li>
        <li style={{ position: 'absolute', bottom: 0, width: '90%', left: '4px'}}>
        <button onClick={handleLogout} className="logout-button" >Log out</button>
        </li>
      </ul>
    </div>
  );
}

export default RecruiterSideBar;
