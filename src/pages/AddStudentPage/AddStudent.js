import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/AddStudent.css";

export default function AddStudent() {
  const navigate = useNavigate();
  const location = useLocation(); // Access the current route
  const [students, setStudents] = useState([]);

  // Function to get newly added student data from local storage
  React.useEffect(() => {
    const savedStudent = JSON.parse(localStorage.getItem("newStudent"));
    if (savedStudent) {
      setStudents([...students, savedStudent]);
      localStorage.removeItem("newStudent"); // Clear after loading
    } else {
      // If no students in localStorage, load mock student data
      const mockStudents = [
        { name: "John Doe", age: 20, course: "Software Engineering" },
        { name: "Jane Smith", age: 22, course: "Computer Science" },
        { name: "Mark Johnson", age: 21, course: "Data Science" }
      ];
      setStudents(mockStudents);
    }
  }, []); // Run only once when the component is mounted

  return (
    <div className="admin-container">
      <Header />
      <LogoutButton />
      <div className="admin-content">
        <nav className="admin-menu">
          <ul>
            <li>
              <Link 
                to="/admin/addstudent" 
                className={location.pathname === "/admin/addstudent" ? "active" : ""}
              >
                ADD STUDENT
              </Link>
            </li>
            <li><Link to="/admin/addcourse">ADD COURSE</Link></li>
            <li><Link to="/admin/liststudent">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
          </ul>
        </nav>

        <div className="admin-main">
          <h1>Add Student</h1>
          
          {/* Student List Display */}
          <div className="student-list">
            {students.length > 0 ? (
              students.map((student, index) => (
                <div key={index} className="student-card">
                  <h3>{student.name}</h3>
                  <p>Age: {student.age}</p>
                  <p>Course: {student.course}</p>
                </div>
              ))
            ) : (
              <p>No students added yet.</p>
            )}
          </div>

          {/* Add Student Button */}
          <button className="add-student-btn" onClick={() => navigate("/admin/studentform")}>
            Add Student
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
