import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate, FaUserTie, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../styles/adminsidebar.css";

const AdminSideBar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  // Toggle the active section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar" style={{backgroundColor:'#2c3e50'}}>
      <div className="sidebar-logo">Placement Portal</div>
      <ul className="sidebar-menu">
        {/* Student Section */}
        <li className="menu-item" onClick={() => toggleSection("student")}>
          <span>
            <FaUserGraduate /> Student
          </span>
          {activeSection === "student" ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {activeSection === "student" && (
          <ul className="submenu">
            <li><Link to="/admin/insertstudent">Insert Student</Link></li>
            <li><Link to="/admin/deletestudent">Delete Student</Link></li>
            <li><Link to="/admin/updatestudent">Update Student</Link></li>
            <li><Link to="/admin/viewallstudents">View All Students</Link></li>
          </ul>
        )}

        {/* Recruiter Section */}
        <li className="menu-item" onClick={() => toggleSection("recruiter")}>
          <span>
            <FaUserTie /> Recruiter
          </span>
          {activeSection === "recruiter" ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {activeSection === "recruiter" && (
          <ul className="submenu">
            <li><Link to="/admin/addrecruiter">Add Recruiter</Link></li>
            <li><Link to="/admin/deleterecruiter">Delete Recruiter</Link></li>
            <li><Link to="/admin/updaterecruiter">Update Recruiter</Link></li>
            <li><Link to="/admin/viewallrecruiter">View All Recruiters</Link></li>
          </ul>
        )}
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default AdminSideBar;
