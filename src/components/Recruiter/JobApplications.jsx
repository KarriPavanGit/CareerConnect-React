import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // to handle redirection
import '../../styles/jobapplications.css';

function JobApplications(props) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null); // Stores the resume URL to view
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const navigate = useNavigate(); // to handle redirection
  const jid=props.id;

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    
    // Check if the user is logged in and if the role is recruiter
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not recruiter
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/recruiter/viewapplicationsbyid",
          {
            params: { jobId: jid },
          }
        );
        setApplications(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jid, navigate]); // Added navigate as dependency to ensure it updates on role check

  const handleViewResume = (resumeBase64) => {
    // Convert base64 to a data URI for the iframe
    setSelectedResume(`data:application/pdf;base64,${resumeBase64}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedResume(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="job-applications-container">
        <h1>Job Applications</h1>
        {applications.length === 0 ? (
          <p>No applications found for this job.</p>
        ) : (
          applications.map((application) => (
            <div key={application.id} className="application-card">
              <h2>{application.name}</h2>
              <p>Email: {application.email}</p>
              <p>University: {application.university}</p>
              <p>Phone Number: {application.phoneNumber}</p>
              <p>Year in University: {application.yearInUniversity}</p>
              <p>Resume:</p>
              <button onClick={() => handleViewResume(application.resumeUrl)}>
                View Resume
              </button>
            </div>
          ))
        )}
        {isModalOpen && selectedResume && (
          <div className="modal-overlay">
            <div className="modal-content">
              <iframe src={selectedResume} title="Resume"></iframe>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
}

export default JobApplications;
