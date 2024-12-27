import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentHeader from './StudentHeader';
import StudentApplication from "./StudentApplication";
import { toast, ToastContainer } from "react-toastify";

function StudentJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // State for the selected job
  const navigate = useNavigate();

  useEffect(() => {
    // Session validation
    const studentId = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!studentId || role !== 'student') {
      navigate('/login');
    } else {
      axios
        .get("https://careerconnect-springboot-production.up.railway.app/student/viewalljobs")
        .then((response) => {
          setJobs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
          setLoading(false);
          toast.error("Failed to fetch job listings");
        });
    }
  }, [navigate]);

  const handleApply = async (jobId) => {
    const studentId = sessionStorage.getItem('id'); // Get student ID from sessionStorage
    const formdata = new FormData();
    formdata.append('jobid', jobId);
    formdata.append('studentid', studentId);

    try {
      const response = await axios.post("https://careerconnect-springboot-production.up.railway.app/student/checkjobapplication", formdata);
      if (response.data === "Job not applied") {
        // Set the selected job to show the application form
        setSelectedJob(jobId);
      } else {
        toast.error('Already applied for this job');
      }
    } catch (error) {
      console.error("Error checking job application:", error);
      toast.error("An error occurred while checking your application status.");
    }
  };

  if (loading) return <><StudentHeader/><p>Loading jobs...</p></>;

  if (jobs.length === 0) return <><StudentHeader/><p>No jobs available.</p></>;

  return (
    <>
      <StudentHeader />
      <ToastContainer />
      <div style={{ padding: "20px" }}>
        <h2>Available Jobs</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                width: "300px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "#007BFF" }}>{job.title}</h3>
              <h5 style={{ marginBottom: "5px", color: "#007BFF" }}>{job.company}</h5>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Posted Date:</strong> {job.postedDate}</p>
              <button
                onClick={() => handleApply(job.id)}
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Conditionally render the application form */}
        {selectedJob && <StudentApplication jobId={selectedJob} />}
      </div>
    </>
  );
}

export default StudentJobs;
