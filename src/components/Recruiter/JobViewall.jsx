import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecruiterSideBar from './RecruiterSideBar';
import JobApplications from './JobApplications';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate
import '../../styles/jobviewall.css';
const JobViewall = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null); // To track selected job for applications view
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recruiterId = localStorage.getItem('id'); // Replace with dynamic recruiter ID as needed
  const navigate = useNavigate(); // to handle redirect

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not a recruiter
    }

    // Fetch jobs
    axios
      .get('https://careerconnect-springboot-production.up.railway.app/recruiter/viewalljobs', { params: { id: recruiterId } })
      .then((response) => {
        const jobData = Array.isArray(response.data) ? response.data : [];
        setJobs(jobData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setError('There was an error fetching the jobs.');
        setLoading(false);
      });
  }, [recruiterId, navigate]);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <RecruiterSideBar />
      <h1 style={{ color: '#1a242f', textAlign: 'center', margin: '20px 0' }}>Jobs</h1>
      {selectedJobId ? (
        <JobApplications id={selectedJobId} />
      ) : jobs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No jobs found for this recruiter.</p>
      ) : (
        <div className="container">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="card"
            >
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Posted Date:</strong> {job.postedDate}</p>
              <button onClick={() => setSelectedJobId(job.id)}>View Applications</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobViewall;
