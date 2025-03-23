import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/ListStudents.css";

export default function ListStudents() {
  const [students, setStudents] = useState([
    {
      courseId: "CS101",
      moduleName: "Computer Networks",
      studentName: "SH PERERA",
      enrolledDate: "2025-02-03",
    },
    {
      courseId: "CS102",
      moduleName: "Operating Systems",
      studentName: "JD SMITH",
      enrolledDate: "2025-03-10",
    },
    {
      courseId: "CS103",
      moduleName: "Data Structures",
      studentName: "MM ALI",
      enrolledDate: "2025-01-15",
    },
    {
      courseId: "CS101",
      moduleName: "Computer Networks",
      studentName: "AK JAYAWARDENE",
      enrolledDate: "2025-02-07",
    },
  ]);

  const [courseIdFilter, setCourseIdFilter] = useState("");

  // Filter students based on selected Course ID
  const filteredStudents = students.filter((student) =>
    courseIdFilter === "" || student.courseId.toLowerCase().includes(courseIdFilter.toLowerCase())
  );

  return (
    <div className="admin-container">
      <Header />
      <LogoutButton />
      <div className="admin-content">
        <nav className="admin-menu">
          <ul>
            <li><Link to="/admin/addstudent">ADD STUDENT</Link></li>
            <li><Link to="/admin/addcourse">ADD COURSE</Link></li>
            <li><Link to="/admin/liststudent" className="active">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
          </ul>
        </nav>

        <div className="admin-main">
          <h1>List Students</h1>

          {/* Filter Form - Only by Course ID */}
          <div className="filter-form">
            <h3>Filter By Course ID</h3>
            <input
              type="text"
              value={courseIdFilter}
              onChange={(e) => setCourseIdFilter(e.target.value)}
              placeholder="Enter Course ID"
            />
          </div>

          {/* Student List Table */}
          <div className="student-list">
            <table>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Module Name</th>
                  <th>Student Name</th>
                  <th>Enrolled Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.courseId}</td>
                      <td>{student.moduleName}</td>
                      <td>{student.studentName}</td>
                      <td>{student.enrolledDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
