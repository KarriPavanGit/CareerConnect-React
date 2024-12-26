import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import '../../styles/studentupdate.css';

const StudentUpdate = () => {
  const [students, setStudents] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/viewallstudents');
        setStudents(response.data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (id) => {
    const selectedStudent = students.find((stu) => stu.id === id);
    setEditRow(id);
    setEditData(selectedStudent);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/updatestudent`, editData);
      setStudents((prev) =>
        prev.map((stu) => (stu.id === id ? { ...stu, ...editData } : stu))
      );
      setEditRow(null);
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  return (
    <div className="container">
      <div className={`main-content ${editRow !== null ? 'blur-background' : ''}`}>
        <h3>Update Student Details</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>CGPA</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Program</th>
              <th>Branch</th>
              <th>Graduation Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td>{stu.name}</td>
                <td>{stu.cgpa}</td>
                <td>{stu.phoneNumber}</td>
                <td>{stu.email}</td>
                <td>{stu.program}</td>
                <td>{stu.branch}</td>
                <td>{stu.graduationYear}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(stu.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editRow !== null && (
        <div className="edit-card-container">
          <div className="edit-card">
            <h4>Edit Student</h4>
            <div className="edit-fields">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
              />
              <label>CGPA</label>
              <input
                type="text"
                name="cgpa"
                value={editData.cgpa}
                onChange={handleInputChange}
              />
              <label>Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleInputChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
              />
              <label>Program</label>
              <input
                type="text"
                name="program"
                value={editData.program}
                onChange={handleInputChange}
              />
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={editData.department}
                onChange={handleInputChange}
              />
              <label>Graduation Year</label>
              <input
                type="text"
                name="graduationYear"
                value={editData.graduationYear}
                onChange={handleInputChange}
              />
            </div>
            <button className="save-btn" onClick={() => handleSave(editRow)}>Save</button>
            <button className="cancel-btn" onClick={() => setEditRow(null)}>Cancel</button>
          </div>
        </div>
      )}

      <AdminSideBar />
    </div>
  );
};

export default StudentUpdate;