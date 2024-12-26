import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import '../../styles/studentupdate.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/recruiterupdate.css';

const RecruiterUpdate = () => {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'admin') {
      navigate('/login');
    }

    const fetchRecruiters = async () => {
      try {
        const response = await axios.get('https://careerconnect-springboot-production.up.railway.app/admin/viewallrecruiters');
        setRecruiters(response.data);
      } catch (err) {
        console.error('Failed to fetch recruiters:', err);
      }
    };

    fetchRecruiters();
  }, [navigate]);

  const handleEdit = (id) => {
    const selectedRecruiter = recruiters.find((rec) => rec.recruiterId === id);
    setEditRow(id);
    setEditData(selectedRecruiter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://careerconnect-springboot-production.up.railway.app/admin/updaterecruiter`, editData);
      setRecruiters((prev) =>
        prev.map((rec) => (rec.recruiterId === editRow ? { ...rec, ...editData } : rec))
      );
      setEditRow(null);
    } catch (err) {
      console.error('Failed to update recruiter:', err);
    }
  };

  const closeModal = () => {
    setEditRow(null);
  };

  return (
    <div className="container">
      <div className={`main-content ${editRow ? 'blur-background' : ''}`}>
        <h3>Update Recruiter Details</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((rec) => (
              <tr key={rec.recruiterId}>
                <td>{rec.name}</td>
                <td>{rec.company}</td>
                <td>{rec.email}</td>
                <td>{rec.contactNumber}</td>
                <td>{rec.industry}</td>
                <td>{rec.location}</td>
                <td>{rec.websiteurl}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(rec.recruiterId)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editRow && (
        <div className="edit-card-container">
          <div className="edit-card">
            <h4>Edit Recruiter Details</h4>
            <div className="edit-fields">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={editData.company}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
              <label>Phone</label>
              <input
                type="text"
                name="contactNumber"
                value={editData.contactNumber}
                onChange={handleInputChange}
              />
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                value={editData.industry}
                onChange={handleInputChange}
              />
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleInputChange}
              />
              <label>Website</label>
              <input
                type="text"
                name="websiteurl"
                value={editData.websiteurl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminSideBar />
    </div>
  );
};

export default RecruiterUpdate;
