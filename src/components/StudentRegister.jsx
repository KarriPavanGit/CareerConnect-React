import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/studentinsert.css'; // Ensure your CSS is in place
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function StudentRegister() {
  const navigate = useNavigate();

  // Initial state for the student form
  const initialState = {
    name: "",
    dateofbirth:"",
    cgpa: "",
    phoneNumber: "",
    program: "",
    email: "",
    branch: "",
    graduationYear: "",
    username: "",
    password: ""
  };

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false); // Loading state to disable button while submitting

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation for form fields
  const validateFields = () => {
    // Validate phone number to be 10 digits
    if (!/^\d{10}$/.test(data.phoneNumber)) {
      toast.error("Invalid phone number. Must be 10 digits.");
      return false;
    }
    // Validate CGPA to be between 0 and 10
    if (data.cgpa < 0 || data.cgpa > 10) {
      toast.error("Invalid CGPA. Must be between 0 and 10.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return; // Only submit if validation passes

    setLoading(true); // Show loading state during API call

    try {
      const response = await axios.post('http://localhost:5000/admin/addstudent', data,
        {
          params:data
        }
      );
      if (response.data.includes("exists")) {
        toast.error(response.data); // Show error if student already exists
      } else {
        toast.success("Student Added Successfully");
        setData(initialState); // Reset form after success
      }
    } catch (error) {
      toast.error("Error Occurred While Inserting");
      console.error('Error details:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Hide loading state after API call
    }
  };

  return (
    <div>
      <ToastContainer/>
      <Header/>
      <div style={{marginTop:'300px',marginBottom:'100px'}}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date Of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={data.dateofbirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Program</label>
            <input
              type="text"
              name="program"
              value={data.program}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Branch</label>
            <input
              type="text"
              name="branch"
              value={data.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>CGPA</label>
            <input
              type="number"
              step="0.01"
              name="cgpa"
              value={data.cgpa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={data.graduationYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default StudentRegister;
