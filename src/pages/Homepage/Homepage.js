import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginButton from "../../components/LoginButton"; // Import the LoginButton component
import "../../styles/global.css";

export default function HomePage() {
  return (
    <div>
      <Helmet>
        <title>Student Management System</title>
      </Helmet>
      <Header />
      <LoginButton /> {/* Use the LoginButton component here */}
      <main className="main-content">
        <div className="text-image-container">
          <div className="text-content">
            <h1>GET STARTED NOW! 🚀</h1>
            <p>"Your Path to Success Starts Here - Simplify Your Academic Life with Just a Few Clicks"</p>
          </div>
          <div className="image-content">
            <img src="/std.png" alt="Student Management" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
