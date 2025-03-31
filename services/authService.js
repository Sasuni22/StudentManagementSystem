import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Store token in localStorage
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  }
};

// Get stored token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Login service
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    // Ensure the response contains the token and email
    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem("userEmail", response.data.email); // Store email from response
    }
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

// Logout service
const logout = async () => {
  try {
    const token = getAuthToken();
    if (token) {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setAuthToken(null);
    return true;
  } catch (error) {
    console.error("Logout error", error);
    // Still remove token on client side even if server logout fails
    setAuthToken(null);
    return false;
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!getAuthToken();
};

export default {
  login,
  logout,
  getAuthToken,
  isAuthenticated,
};
