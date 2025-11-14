import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./staff_login.css";

export default function StaffLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🧠 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  // ✅ Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // 🧾 Basic validation
    if (!email.trim() || !password.trim()) {
      setError("⚠️ Please enter both email and password.");
      return;
    }

    // 📦 Fetch staff list from localStorage
    const staffList = JSON.parse(localStorage.getItem("staffData")) || [];

    // 🔍 Find staff
    const foundStaff = staffList.find(
      (s) => s.email === email && s.password === password
    );

    if (foundStaff) {
      // ✅ Save logged-in staff data
      localStorage.setItem("loggedInStaff", JSON.stringify(foundStaff));
      window.alert(`✅ Welcome ${foundStaff.name}!`);

      // ✅ Navigate to dashboard
      navigate("/staff/dashboard");
    } else {
      setError("❌ Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="staff-login-container">
      <form className="staff-login-form" onSubmit={handleSubmit}>
        <h2>Staff Login</h2>
        <p className="staff-subtitle">Access your toll system account</p>

        {error && <div className="staff-error">{error}</div>}

        <div className="staff-form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="username"
          />
        </div>

        <div className="staff-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="staff-login-btn">
          Login
        </button>
      </form>
    </div>
  );
}
