// AddPassAdmin.jsx
import React, { useState, useEffect, useRef } from "react";
import "./add_new_pass.css";

const costMapping = {
  "Two Wheeler": 23.6,
  "Three Wheeler": 35.4,
  "Four Wheeler": 59.0,
  "Six Wheeler": 94.4,
  "Heavy Vehicle": 354.0,
};

/* CustomSelect Component */
function CustomSelect({ name, value, onChange, options = [], placeholder = "Select Category" }) {
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

export default function AddPassAdmin() {
  const [passData, setPassData] = useState({
    vehicleCategory: "",
    vehicleName: "",
    vehicleRegNumber: "",
    validityFrom: "",
    validityTo: "",
    applicantName: "",
    applicantAge: "",
    applicantGender: "",
    applicantAddress: "",
    costOfPass: "",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCategories([
      "Two Wheeler",
      "Three Wheeler",
      "Four Wheeler",
      "Six Wheeler",
      "Heavy Vehicle",
    ]);
  }, []);

  const validateDates = (from, to) => {
    const today = new Date().toISOString().split("T")[0];
    const newErrors = {};

    if (from && from < today) newErrors.validityFrom = "Date cannot be in past.";
    if (from && to && to <= from) newErrors.validityTo = "End date must be after start date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (
      passData.vehicleCategory &&
      passData.validityFrom &&
      passData.validityTo &&
      validateDates(passData.validityFrom, passData.validityTo)
    ) {
      const perDay = costMapping[passData.vehicleCategory] || 0;
      const start = new Date(passData.validityFrom);
      const end = new Date(passData.validityTo);
      const diff = Math.ceil((end - start) / 86400000) + 1;
      const totalCost = diff * perDay;

      setPassData((p) => ({ ...p, costOfPass: totalCost.toFixed(2) }));
    } else {
      setPassData((p) => ({ ...p, costOfPass: "" }));
    }
  }, [passData.vehicleCategory, passData.validityFrom, passData.validityTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassData((p) => ({ ...p, [name]: value }));

    if (name === "validityFrom" || name === "validityTo") {
      validateDates(
        name === "validityFrom" ? value : passData.validityFrom,
        name === "validityTo" ? value : passData.validityTo
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDates(passData.validityFrom, passData.validityTo)) return;

    const passId = `PASS-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const newPass = { ...passData, passId, createdAt };

    const existing = JSON.parse(localStorage.getItem("passData")) || [];
    existing.push(newPass);
    localStorage.setItem("passData", JSON.stringify(existing));

    alert("Pass Created Successfully!");

    setPassData({
      vehicleCategory: "",
      vehicleName: "",
      vehicleRegNumber: "",
      validityFrom: "",
      validityTo: "",
      applicantName: "",
      applicantAge: "",
      applicantGender: "",
      applicantAddress: "",
      costOfPass: "",
    });
    setErrors({});
  };

  return (
    <div className="add-pass-container">
      <div className="add-pass-card">
        <h2 className="add-pass-title">Add New Pass</h2>

        <form className="add-pass-form" onSubmit={handleSubmit}>
          
          {/* Category */}
          <div className="form-group full-width">
            <label>Vehicle Category</label>
            <CustomSelect
              name="vehicleCategory"
              value={passData.vehicleCategory}
              onChange={handleChange}
              options={categories}
              placeholder="Select Category"
            />
          </div>

          <div className="form-group">
            <label>Vehicle Name</label>
            <input
              name="vehicleName"
              value={passData.vehicleName}
              onChange={handleChange}
              placeholder="Enter Vehicle Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Vehicle Reg Number</label>
            <input
              name="vehicleRegNumber"
              value={passData.vehicleRegNumber}
              onChange={handleChange}
              placeholder="Enter Vehicle Registration Number"
              required
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label>Validity From</label>
            <input
              type="date"
              name="validityFrom"
              value={passData.validityFrom}
              onChange={handleChange}
              required
            />
            {errors.validityFrom && <span className="error">{errors.validityFrom}</span>}
          </div>

          <div className="form-group">
            <label>Validity To</label>
            <input
              type="date"
              name="validityTo"
              value={passData.validityTo}
              onChange={handleChange}
              required
            />
            {errors.validityTo && <span className="error">{errors.validityTo}</span>}
          </div>

          <div className="form-group">
            <label>Applicant Name</label>
            <input
              name="applicantName"
              value={passData.applicantName}
              onChange={handleChange}
              placeholder="Enter Applicant Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Applicant Age</label>
            <input
              type="number"
              name="applicantAge"
              value={passData.applicantAge}
              onChange={handleChange}
              placeholder="Enter Age"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Gender</label>
            <div className="gender-options">
              {["Female", "Male", "Other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="applicantGender"
                    value={g}
                    checked={passData.applicantGender === g}
                    onChange={handleChange}
                    required
                  />{" "}
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Applicant Address</label>
            <textarea
              name="applicantAddress"
              value={passData.applicantAddress}
              onChange={handleChange}
              placeholder="Enter Full Address"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Cost of Pass (Auto)</label>
            <input type="number" name="costOfPass" value={passData.costOfPass} readOnly />
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="add-pass-btn"
              disabled={Object.keys(errors).length > 0}
            >
              Add Pass
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}