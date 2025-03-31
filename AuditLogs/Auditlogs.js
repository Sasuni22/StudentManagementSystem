import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/AuditLogs.css";
import axios from "axios";
import "../../styles/admin.css";
import "../../styles/AddCourse.css";
import Layout from "../../components/Layout";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch audit logs when component mounts
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get("http://localhost:8080/api/audit-logs", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setLogs(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching audit logs:", err);
        setError("Failed to load audit logs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="admin-container">
      <Header />
      
      <div className="admin-content">
        <LogoutButton />

        {/* Sidebar Menu */}
        <nav className="admin-menu">
          <ul>
            <li><Link to="/admin/addstudent">ADD STUDENT</Link></li>
            <li><Link to="/admin/addcourse">ADD COURSE</Link></li>
            <li><Link to="/admin/liststudents">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
            <li><Link to="/admin/auditlogs" className="active">AUDIT LOGS</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="content">
          <h1 className="page-title">Audit Logs</h1>

          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading">Loading...</div>}

          {!loading && !error && (
            <div className="table-container">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.action}</td>
                        <td>{log.userEmail}</td>
                        <td>{formatTimestamp(log.timestamp)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-logs">No audit logs available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
