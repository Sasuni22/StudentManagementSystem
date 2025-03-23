import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/AddCourse.css";

export default function AddCourses() {
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Dummy course data for different semesters
  const availableCourses = {
    semester1: [
      { name: "Introduction to Programming", details: "Basic concepts of programming" },
      { name: "Mathematics I", details: "Mathematical foundations for engineering" },
    ],
    semester2: [
      { name: "Data Structures", details: "Fundamentals of data structures" },
      { name: "Operating Systems", details: "Understanding the basics of OS" },
    ],
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setCourses(availableCourses[e.target.value] || []);
  };

  const handleAddCourse = () => {
    if (newCourse && courseDetails) {
      const newCourseData = {
        name: newCourse,
        details: courseDetails,
        addedDate: new Date().toLocaleDateString(),
      };
      setCourses([...courses, newCourseData]);
      setNewCourse("");
      setCourseDetails("");
      setShowPopup(false); // Close the popup after adding
    }
  };

  return (
    <div className="admin-container">
      <Header />
      <LogoutButton />
      <div className="admin-content">
        <nav className="admin-menu">
          <ul>
            <li><Link to="/admin/addstudent">ADD STUDENT</Link></li>
            <li><Link to="/admin/addcourse" className="active">ADD COURSE</Link></li>
            <li><Link to="/admin/liststudent">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
          </ul>
        </nav>

        <div className="admin-main">
          <h1>Add Course</h1>

          <div className="semester-selector">
            <label>Select Semester: </label>
            <select value={semester} onChange={handleSemesterChange}>
              <option value="">Select a semester</option>
              <option value="semester1">Semester 1</option>
              <option value="semester2">Semester 2</option>
            </select>
          </div>

          <div className="course-list">
            <h3>Courses for {semester && semester.charAt(0).toUpperCase() + semester.slice(1)}</h3>
            {courses.length > 0 ? (
              <ul>
                {courses.map((course, index) => (
                  <li key={index} className="course-item">
                    <h4>{course.name}</h4>
                    <p>{course.details}</p>
                    <small>Added on: {course.addedDate}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses available for this semester.</p>
            )}
          </div>

          <button className="add-course-btn" onClick={() => setShowPopup(true)}>Add Course</button>

          {/* Popup to add new course */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup">
                <h3>Add New Course</h3>
                <label>Course Name:</label>
                <input
                  type="text"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="Enter course name"
                />
                <label>Course Details:</label>
                <textarea
                  value={courseDetails}
                  onChange={(e) => setCourseDetails(e.target.value)}
                  placeholder="Enter course details"
                />
                <div className="popup-buttons">
                  <button onClick={handleAddCourse}>Add Course</button>
                  <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
