import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaUserTie,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "../../styles/adminsidebar.css";

const AdminSideBar = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  // Toggle the active section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} style={{backgroundColor:'#2c3e50'}}>
        <MenuOpenIcon onClick={toggleSidebar} style={{ cursor: "pointer" }} />
      <div className="sidebar-logo">
        {!isCollapsed && "Placement Portal"}
      </div>
      <ul className="sidebar-menu">
        {/* Student Section */}
        <li className="menu-item" onClick={() => toggleSection("student")}>
          <span>
            <FaUserGraduate /> {!isCollapsed && "Student"}
          </span>
          {activeSection === "student" && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {activeSection === "student" && !isCollapsed && (
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
            <FaUserTie /> {!isCollapsed && "Recruiter"}
          </span>
          {activeSection === "recruiter" && !isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {activeSection === "recruiter" && !isCollapsed && (
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
