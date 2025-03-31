import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import { addCourse } from "../../services/apiService";
import "../../styles/AddStudent.css"; // Reuse same styles

export default function CourseForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [course, setCourse] = useState({
    courseId: "",
    name: "",
    description: "",
    semester: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ 
      ...course, 
      [name]: name === "semester" ? parseInt(value, 10) : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addCourse(course);
      navigate("/admin/addcourse"); // Redirect back to Add Course page after adding
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add course. Please check your information and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/addcourse"); // Navigate back to AddCourse page
  };

  return (
    <div className="admin-container">
      <Header />
      <LogoutButton />
      <div className="admin-content">
        <div className="student-form-container">
          <h1>Add New Course</h1>
          {error && <div className="error-message">{error}</div>}

          <form className="student-form" onSubmit={handleSubmit}>
            {/* Course ID */}
            <div className="form-section">
              <label>Course ID:</label>
              <input 
                type="text" 
                name="courseId" 
                value={course.courseId} 
                onChange={handleChange} 
                placeholder="e.g. CS101"
                required 
              />
            </div>

            {/* Course Name */}
            <div className="form-section">
              <label>Course Name:</label>
              <input 
                type="text" 
                name="name" 
                value={course.name} 
                onChange={handleChange} 
                placeholder="e.g. Introduction to Computer Science"
                required 
              />
            </div>

            {/* Course Description */}
            <div className="form-section full-width">
              <label>Description:</label>
              <textarea 
                name="description" 
                value={course.description} 
                onChange={handleChange} 
                placeholder="Brief description of the course"
                rows="4"
                required 
              />
            </div>

            {/* Semester */}
            <div className="form-section">
              <label>Semester:</label>
              <select 
                name="semester" 
                value={course.semester} 
                onChange={handleChange} 
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    Semester {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="continue-btn" 
              disabled={loading}
            >
              {loading ? "Adding Course..." : "Add Course"}
            </button>
          </form>

          {/* Back Button */}
          <button 
            className="back-btn"
            onClick={handleBack}
          >
            Back to Course List
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
