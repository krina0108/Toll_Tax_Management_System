import React, { useState } from "react";
import "./admin_setting.css";   // ✅ NEW CSS FILE

export default function AdminSetting() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    alert("Password changed successfully!");
    // TODO: Backend API call
  };

  return (
    <div className="as-container">
      <div className="as-card">
        <h2 className="as-title">Change Password</h2>

        <form onSubmit={handleSubmit} className="as-form">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="as-btn-container">
            <button type="submit" className="as-btn">
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
