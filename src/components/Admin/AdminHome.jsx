import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'

function AdminHome() {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect to login if the condition is not met
    }
  }, [navigate]);

  return (
    <div style={{backgroundColor:'black'}}>
      <AdminSideBar />  
    </div>
  )
}

export default AdminHome;
