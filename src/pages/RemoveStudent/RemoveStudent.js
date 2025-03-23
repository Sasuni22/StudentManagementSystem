import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/RemoveStudent.css";

export default function RemoveStudent() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");

  // Handle input changes
  const handleStudentIdChange = (e) => setStudentId(e.target.value);
  const handleCourseIdChange = (e) => setCourseId(e.target.value);

  // Remove student by ID
  const handleRemoveStudent = () => {
    if (studentId) {
      alert(`Student with ID ${studentId} removed!`);
      setStudentId(""); // Clear input
    } else {
      alert("Please enter a Student ID.");
    }
  };

  // Remove course by ID
  const handleRemoveCourse = () => {
    if (courseId) {
      alert(`Course with ID ${courseId} removed!`);
      setCourseId(""); // Clear input
    } else {
      alert("Please enter a Course ID.");
    }
  };

  return (
    <div className="admin-container">
      <Header />
      <LogoutButton />
      <div className="admin-content">
        {/* Sidebar Menu */}
        <nav className="admin-menu">
          <ul>
            <li><Link to="/admin/addstudent">ADD STUDENT</Link></li>
            <li><Link to="/admin/addcourse">ADD COURSE</Link></li>
            <li><Link to="/admin/liststudent">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent" className="active">REMOVE STUDENT</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="admin-main">
          <h1>Remove Student or Course</h1>

          {/* Remove Student Section */}
          <div className="remove-form">
            <label>Enter Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={handleStudentIdChange}
              placeholder="Enter Student ID"
            />
            <button onClick={handleRemoveStudent} className="remove-btn">Remove</button>
          </div>

          {/* Remove Course Section */}
          <div className="remove-form">
            <label>Enter Course ID:</label>
            <input
              type="text"
              value={courseId}
              onChange={handleCourseIdChange}
              placeholder="Enter Course ID"
            />
            <button onClick={handleRemoveCourse} className="remove-btn">Remove</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
