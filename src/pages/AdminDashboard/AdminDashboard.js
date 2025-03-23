import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LogoutButton from "../../components/LogoutButton"; // Separate file for Logout Button
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import "../../styles/admin.css"; // Admin dashboard styles

export default function AdminDashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="admin-dashboard-container">
      <Header />
      {/* Logout Button Container placed below the Header */}
      <div className="admin-logout-container">
        <LogoutButton /> {/* LogoutButton component inside the logout container */}
      </div>
      <div className="admin-content-container">
        {/* Sidebar Menu */}
        <nav className="admin-sidebar-menu">
          <ul>
            <li><Link to="/admin/addstudent">ADD STUDENT</Link></li>
            <li><Link to="/admin/addcourse">ADD COURSE</Link></li>
            <li><Link to="/admin/liststudent">LIST STUDENTS</Link></li>
            <li><Link to="/admin/updateinfo">UPDATE INFO</Link></li>
            <li><Link to="/admin/removestudent">REMOVE STUDENT</Link></li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="admin-main-content">
          <h1>Admin Dashboard</h1>
          <p>Welcome to the Admin Panel. Here you can manage all aspects of the system.</p>

          {/* Info Boxes */}
          <div className="admin-info-boxes">
            <div className="info-box">Total Users: 100</div>
            <div className="info-box">Active Bookings: 50</div>
            <div className="info-box">Pending Requests: 10</div>
            <div className="info-box">Revenue: $5000</div>
          </div>

          {/* Calendar Section */}
          <div className="admin-calendar-container">
            <h3>Calendar</h3>
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
