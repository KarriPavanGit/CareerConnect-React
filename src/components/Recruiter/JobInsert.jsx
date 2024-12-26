import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Don't forget to import useNavigate
import RecruiterSideBar from './RecruiterSideBar';
import '../../styles/jobinsert.css';

function JobInsert() {
  const navigate = useNavigate(); // to handle redirect
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: localStorage.getItem('company'),
    location: '',
    salary: '',
    postedDate: new Date().toISOString().split('T')[0],
    recruiter_id: localStorage.getItem('id'), // Ensure recruiter_id is stored correctly in localStorage
  });
  
  const [loading, setLoading] = useState(false); // Loading state for form submission

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not a recruiter
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending job data:', jobData);  // Log the job data before submission
    if (!jobData.recruiter_id) {
      toast.error('Recruiter ID is missing. Please login again.');
      return;
    }

    // Basic validation for fields
    if (!jobData.title || !jobData.description || !jobData.location || !jobData.salary) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await axios.post('https://careerconnect-springboot-production.up.railway.app/recruiter/addjob', jobData, {
        // If the recruiter ID is needed in the URL, we can include it like this
        params: { recruiterId: jobData.recruiter_id },
      });
      
      if (response.status === 200) {
        toast.success('Job added successfully!');
        console.log(response.data);
        // Reset job form after successful submission
        setJobData({
          title: '',
          description: '',
          company: localStorage.getItem('company'),
          location: '',
          salary: '',
          postedDate: new Date().toISOString().split('T')[0],
          recruiter_id: localStorage.getItem('id'),
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding job';
      toast.error(errorMessage);
      console.error('Error details:', error);
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  return (
    <>
      <RecruiterSideBar />
      <ToastContainer />
      <div className="job-insert-page">
  <div className="job-insert-container">
    <h2>Add Job</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Job Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={jobData.description}
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
          value={jobData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          id="salary"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Adding Job...' : 'Add Job'}
      </button>
    </form>
  </div>
</div>

    </>
  );
}

export default JobInsert;
