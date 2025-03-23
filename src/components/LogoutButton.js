// /components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/logoutButton.css"; // Ensure this CSS is applied

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (e.g., clear session, etc.)
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      LOGOUT
    </button>
  );
}
