import React, { useState, useEffect } from "react";
import "./admin_profile.css";

export default function AdminProfile() {
  const getToday = () => {
    return new Date().toISOString().slice(0, 10);   // ✅ yyyy-mm-dd
  };

  const defaultData = {
    adminName: "test",
    userName: "admin",
    contactNumber: "7898989897",
    email: "tester1@gmail.com",
    regDate: getToday(),   // ✅ Default only date
  };

  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminProfile"));
    if (stored) setFormData(stored);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    localStorage.setItem("adminProfile", JSON.stringify(formData));
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="ap-container">
      <div className="ap-card">
        <h2 className="ap-title">Admin Profile</h2>

        <label className="ap-label">Admin Name</label>
        <input
          type="text"
          className="ap-input"
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
        />

        <label className="ap-label">User Name</label>
        <input
          type="text"
          className="ap-input"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />

        <label className="ap-label">Contact Number</label>
        <input
          type="text"
          className="ap-input"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <label className="ap-label">Email address</label>
        <input
          type="email"
          className="ap-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="ap-label">Admin Reg Date</label>
        <input
          type="date"
          className="ap-input"
          name="regDate"
          value={formData.regDate}
          onChange={handleChange}
        />

        <button className="ap-btn" onClick={handleSave}>
          Update
        </button>
      </div>
    </div>
  );
}
