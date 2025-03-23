import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/UpdateInfo.css";

export default function UpdateInfo() {
  // Mock Data (Replace this with API call if needed)
  const mockStudents = {
    "S101": { name: "SH PERERA", course: "Computer Networks" },
    "S102": { name: "JD SMITH", course: "Operating Systems" },
    "S103": { name: "MM ALI", course: "Data Structures" },
  };

  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", course: "" });

  // Handle Student ID input
  const handleIdChange = (e) => setStudentId(e.target.value);

  // Fetch student details by ID
  const handleEditClick = () => {
    const student = mockStudents[studentId];
    if (student) {
      setStudentData(student);
      setEditedData(student);
    } else {
      alert("Student ID not found");
      setStudentData(null);
    }
  };

  // Handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update button click
  const handleUpdateClick = () => {
    alert("Student details updated!");
    setStudentId("");
    setStudentData(null);
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
            <li><Link to="/admin/updateinfo" className="active">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="admin-main">
          <h1>Update Student Info</h1>

          {/* Enter Student ID */}
          <div className="update-form">
            <label>Enter Student ID:</label>
            <input type="text" value={studentId} onChange={handleIdChange} placeholder="S101" />
            <button onClick={handleEditClick} className="edit-btn">Edit Details</button>
          </div>

          {/* Edit Form */}
          {studentData && (
            <div className="edit-details">
              <label>Name:</label>
              <input type="text" name="name" value={editedData.name} onChange={handleInputChange} />

              <label>Course:</label>
              <input type="text" name="course" value={editedData.course} onChange={handleInputChange} />

              <button onClick={handleUpdateClick} className="update-btn">Update</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
