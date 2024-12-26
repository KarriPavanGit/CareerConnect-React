import React, { useEffect } from 'react';
import StudentHeader from './StudentHeader';
import { useNavigate } from 'react-router-dom'; // For navigation

function StudentHome() {
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check if the user is logged in as a student
    const studentId = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!studentId || role !== 'student') {
      // Redirect to login if not logged in as a student
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <StudentHeader />
      <h2>Student Home</h2>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default StudentHome;
