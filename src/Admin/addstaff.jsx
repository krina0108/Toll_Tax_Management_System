import React, { useState } from "react";
import "./addstaff.css";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    gender: "",
    address: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit number.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Generate unique Staff ID
  const generateStaffId = () => {
    return "STF" + Date.now().toString().slice(-6); // e.g. STF123456
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const staffId = generateStaffId();
      const newStaff = { staffId, ...formData, joiningDate: new Date().toISOString() };

      // ✅ Retrieve existing staff data or initialize empty array
      const existingStaff = JSON.parse(localStorage.getItem("staffData")) || [];

      // ✅ Add new staff
      const updatedStaff = [...existingStaff, newStaff];

      // ✅ Save back to localStorage
      localStorage.setItem("staffData", JSON.stringify(updatedStaff));

      console.log("✅ Staff Data Saved:", newStaff);
      window.alert("✅ Staff added successfully with ID: " + staffId);

      // Reset form
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        dob: "",
      });
    } else {
      window.alert("⚠️ Please fill all required fields correctly!");
    }
  };

  return (
    <div className="add-staff-container">
      <form className="add-staff-form" onSubmit={handleSubmit}>
        <h2>Add Staff</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Staff Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter staff name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Staff Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label>Staff Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Staff Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Staff Gender</label>
            <div className="gender-options">
              {["Female", "Male", "Other"].map((g) => (
                <label key={g} className={`radio-label ${formData.gender === g ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>Staff DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-group full-width">
            <label>Staff Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter staff address"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
    </div>
  );
}
