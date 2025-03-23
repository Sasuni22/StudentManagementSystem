import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/AddStudent.css";

export default function StudentForm() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ name: "", age: "", course: "" });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("newStudent", JSON.stringify(student));
    navigate("/admin/addstudent"); // Redirect back to Add Student page
  };

  return (
    <div className="admin-container">
      <Header />
      <LogoutButton />
      <div className="admin-content">
        <div className="admin-main">
          <h1>Student Registration Form</h1>
          <form className="student-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={student.name} onChange={handleChange} required />

            <label>Student ID:</label>
            <input type="text" name="studentID" value={student.studentID} onChange={handleChange} required />

            <label>Course:</label>
            <input type="text" name="course" value={student.course} onChange={handleChange} required />

            <button type="submit" className="continue-btn">Continue</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
