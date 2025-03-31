import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import { getCourses, getCoursesBySemester, deleteCourse } from "../../services/apiService";
import "../../styles/AddStudent.css";
import "../../styles/AddCourse.css"; 
import "../../styles/global.css";// Reuse same styles

export default function AddCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteStatus, setDeleteStatus] = useState({ loading: false, id: null });
  const [selectedSemester, setSelectedSemester] = useState(""); // Empty string means "All Semesters"
  const [semesters, setSemesters] = useState([
    { id: 1, label: "Semester 01" },
    { id: 2, label: "Semester 02" },
    { id: 3, label: "Semester 03" },
    { id: 4, label: "Semester 04" }
  ]);

  useEffect(() => {
    fetchCourses();
  }, [selectedSemester]); // Re-fetch courses when the semester changes

  const fetchCourses = async () => {
    try {
      setLoading(true);
      let coursesData;

      if (selectedSemester) {
        // Fetch courses for the selected semester
        coursesData = await getCoursesBySemester(selectedSemester);
      } else {
        // Fetch all courses if no semester is selected
        coursesData = await getCourses();
      }

      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm(`Are you sure you want to delete course ${courseId}?`)) {
      setDeleteStatus({ loading: true, id: courseId });
      try {
        await deleteCourse(courseId);
        // Refresh course list after deletion
        fetchCourses();
      } catch (error) {
        console.error(`Error deleting course ${courseId}:`, error);
        setError(`Failed to delete course ${courseId}. Please try again.`);
      } finally {
        setDeleteStatus({ loading: false, id: null });
      }
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
            <li>
              <Link 
                to="/admin/addcourse" 
                className={location.pathname === "/admin/addcourse" ? "active" : ""}
              >
                ADD COURSE
              </Link>
            </li>
            <li><Link to="/admin/liststudents">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
            <li><Link to="/admin/auditlogs">AUDIT LOGS</Link></li>
          </ul>
        </nav>

        <div className="admin-main">
          <h1>Course Management</h1>
          {error && <div className="error-message">{error}</div>}

          {/* Semester Selector */}
          <div className="semester-selector">
            <label>Select Semester:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <div className="course-list">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course.id} className="student-card">
                    <div className="card-header">
                      <h3>{course.courseId}: {course.name}</h3>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteCourse(course.courseId)}
                        disabled={deleteStatus.loading && deleteStatus.id === course.courseId}
                      >
                        {deleteStatus.loading && deleteStatus.id === course.courseId ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                    <p><strong>Semester:</strong> {course.semester}</p>
                    <p><strong>Description:</strong> {course.description}</p>
                  </div>
                ))
              ) : (
                <p>No courses found for the selected semester. Add your first course now!</p>
              )}
            </div>
          )}

          {/* Add Course Button */}
          <button className="add-student-btn" onClick={() => navigate("/admin/courseform")}>
            Add New Course
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
