import React, { useRef } from "react";
import "./home.css";

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToHero = () => {
    heroRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToAdmin = () => {
    window.location.href = "/admin";
  };

  const goToStaff = () => {
    window.location.href = "/staff";
  };

  return (
    <div className="home-container">
      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <div className="logo">
          TollTax<span>ManagementSystem</span>
        </div>
        <div>
          <button onClick={scrollToHero} className="nav-button">Home</button>
          <button onClick={goToAdmin} className="nav-button">Admin</button>
          <button onClick={goToStaff} className="nav-button">Staff</button>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <h1>TollTax Management System</h1>
          <p>
            A smart, transparent, and digital solution for managing toll
            collection with accuracy and speed.
          </p>
          <button onClick={scrollToFeatures} className="hero-btn">
            Get Started
          </button>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="features" ref={featuresRef}>
        <h2>Why Choose TollTax System?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Fast Processing</h3>
            <p>Reduce waiting time with automated toll collection and quick verification.</p>
          </div>
          <div className="card">
            <h3>Secure Payments</h3>
            <p>Experience safe and reliable digital transactions with instant receipts.</p>
          </div>
          <div className="card">
            <h3>Real-Time Reports</h3>
            <p>Track payments, vehicles, and analytics from a unified dashboard.</p>
          </div>
        </div>
      </section>

      {/* ===== Pricing Table ===== */}
      <section className="pricing-box">
        <div className="container">
          <h2>Vehicle Toll Rates (with GST)</h2>
          <div className="pricing-table-box">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Vehicle Type</th>
                  <th>Base Toll (₹)</th>
                  <th>GST (18%)</th>
                  <th>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Bike</td><td>20</td><td>3.60</td><td>23.60</td></tr>
                <tr><td>Riksha</td><td>30</td><td>5.40</td><td>35.40</td></tr>
                <tr><td>Car</td><td>50</td><td>9.00</td><td>59.00</td></tr>
                <tr><td>LCV</td><td>80</td><td>14.40</td><td>94.40</td></tr>
                <tr><td>Bus</td><td>150</td><td>27.00</td><td>177.00</td></tr>
                <tr><td>Truck</td><td>200</td><td>36.00</td><td>236.00</td></tr>
                <tr><td>MAV</td><td>300</td><td>54.00</td><td>354.00</td></tr>
              </tbody>
            </table>
            <p className="pricing-note">
              * Toll rates are inclusive of 18% GST and may vary with future updates.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>© 2025 TollTax Management System | Designed by Krina Patel</p>
      </footer>
    </div>
  );
};

export default Home;
