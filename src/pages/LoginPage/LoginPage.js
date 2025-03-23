import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/global.css";
import "../../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = () => {
    // Perform authentication check here (optional)
    navigate("/admin"); // Redirect to Admin Dashboard
  };

  return (
    <div>
      <Helmet>
        <title>Login | Student Management System</title>
      </Helmet>
      <Header />
      <main className="login-main">
        <div className="loginpage-container">
          <div className="login-form">
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username" placeholder="Enter your username" />
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button className="continue-btn" onClick={handleLogin}>CONTINUE</button>
          </div>
          <div className="login-image">
            <img src="/login.png" alt="Login Illustration" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
