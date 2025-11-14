// UpdateStaffInfo.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./update_staff_info.css";

/* ✅ Reusable CustomSelect Component */
function CustomSelect({ name, value, onChange, options = [], placeholder = "Select" }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange({ target: { name, value: opt } });
    setOpen(false);
  };

  return (
    <div className={`custom-select ${open ? "open" : ""}`} ref={wrapperRef}>
      <button
        type="button"
        className="custom-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className={`selected-text ${!value ? "placeholder" : ""}`}>
          {value || placeholder}
        </span>
        <span className="arrow">▾</span>
      </button>

      {open && (
        <ul className="custom-select-list" role="listbox">
          {options.map((opt, i) => (
            <li
              key={i}
              role="option"
              aria-selected={opt === value}
              className={`custom-select-option ${opt === value ? "active" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function UpdateStaffInfo() {
  const [staffData, setStaffData] = useState(null);
  const [genderOptions] = useState(["Male", "Female", "Other"]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStaff = JSON.parse(localStorage.getItem("loggedInStaff"));
    if (loggedInStaff) setStaffData(loggedInStaff);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!staffData.name || !staffData.email) {
      alert("Please fill in Name and Email!");
      return;
    }

    const allStaff = JSON.parse(localStorage.getItem("staffData")) || [];
    const updatedList = allStaff.map((s) =>
      s.staffId === staffData.staffId ? staffData : s
    );

    localStorage.setItem("staffData", JSON.stringify(updatedList));
    localStorage.setItem("loggedInStaff", JSON.stringify(staffData));

    alert("✅ Staff details updated successfully!");
    navigate("/admin/dashboard/managestaff");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!staffData) return <p>Loading staff info...</p>;

  return (
    <div className="staff-update-container">
      <div className="staff-update-card">
        <h2 className="staff-update-title">Update Staff Information</h2>

        {/* LEFT */}
        <div className="staff-update-left">
          <div className="staff-update-row">
            <label>Staff ID</label>
            <input type="text" value={staffData.staffId} disabled />
          </div>

          <div className="staff-update-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={staffData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="staff-update-row">
            <label>Email-Id</label>
            <input
              type="email"
              name="email"
              value={staffData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="staff-update-row">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={staffData.mobile || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="staff-update-right">
          <div className="staff-update-row">
            <label>Gender</label>
            <CustomSelect
              name="gender"
              value={staffData.gender}
              onChange={handleChange}
              options={genderOptions}
              placeholder="Select Gender"
            />
          </div>

          <div className="staff-update-row">
            <label>Address</label>
            <textarea
              name="address"
              value={staffData.address || ""}
              onChange={handleChange}
            />
          </div>

          <div className="staff-update-row">
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              value={staffData.dob || ""}
              onChange={handleChange}
            />
          </div>

          <div className="staff-update-row">
            <label>Joining Date</label>
            <input type="text" value={formatDate(staffData.joiningDate)} disabled />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="staff-btn-wrapper">
          <button type="submit" className="btn-update" onClick={handleSubmit}>
            Update
          </button>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/admin/dashboard/managestaff")}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
