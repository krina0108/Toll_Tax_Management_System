import React, { useState } from "react";
import "./setting.css";

export default function ChangePassword() {
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
    // TODO: Replace with backend API call
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2 className="change-password-title">Change Password</h2>

        <form onSubmit={handleSubmit} className="change-password-form">
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

          <div className="btn-container">
            <button type="submit" className="change-btn">
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
