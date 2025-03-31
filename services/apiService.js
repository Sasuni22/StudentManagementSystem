import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

// Create axios instance with auth headers
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Student Services
export const getStudents = async () => {
  try {
    const response = await axiosInstance.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students", error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}`, error);
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await axiosInstance.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error adding student", error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axiosInstance.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with ID ${id}`, error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    await axiosInstance.delete(`/students/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting student with ID ${id}`, error);
    throw error;
  }
};

export const getStudentsByCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/students/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching students for course ${courseId}`, error);
    throw error;
  }
};

// Course Services
export const getCourses = async () => {
  try {
    const response = await axiosInstance.get("/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses", error);
    throw error;
  }
};

export const getCoursesBySemester = async (semester) => {
  try {
    const response = await axiosInstance.get(`/courses/semester/${semester}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching courses for semester ${semester}`, error);
    throw error;
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post("/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error adding course", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await axiosInstance.delete(`/courses/${courseId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting course ${courseId}`, error);
    throw error;
  }
};

// Audit Log Services
export const getAuditLogs = async () => {
  try {
    const response = await axiosInstance.get("/audit-logs");
    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs", error);
    throw error;
  }
};