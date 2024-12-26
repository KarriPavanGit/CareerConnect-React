import React, { useState, useEffect } from 'react';
import AdminSideBar from './AdminSideBar'; // Assuming AdminSideBar is another component
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function RecruiterInsert() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect if session is invalid or user is not admin
    }
  }, [navigate]);

  const initialState = {
    name: "",
    company: "",
    email: "",
    contactNumber: "",
    industry: "",
    location: "",
    websiteurl: "",
    username: "",
    password: ""
  };

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);  // Loading state for the submit button

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/admin/addrecruiter', data);

      if (response.status === 200) {
        if (response.data.includes("exists")) {
          toast.error(response.data);
        } else {
          toast.success("Recruiter Registered Successfully");
          setData(initialState); // Reset form on success
        }
      }
    } catch (error) {
      toast.error('Error occurred while registering recruiter');
      console.error('Error details:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recruiter-insert-container">
      <ToastContainer/>
      <AdminSideBar />
      <div className="form-wrapper">
        <h2>Add New Recruiter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={data.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={data.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={data.industry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={data.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="websiteurl">Website URL</label>
            <input
              type="text"
              id="websiteurl"
              name="websiteurl"
              value={data.websiteurl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Recruiter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RecruiterInsert;
