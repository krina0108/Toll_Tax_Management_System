import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dates_reports.css";

export default function DatesReports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/admin/dashboard/reportspass/date/details", {
      state: { fromDate, toDate },
    });
  };

  return (
    <div className="drNewContainer">
      <div className="drNewWrapper">
        <h2 className="drNewHeading">Between dates pass generation reports</h2>

        <form className="drNewForm" onSubmit={handleSubmit}>
          <div className="drFormGroup">
            <label className="drFormLabel">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="drFormInput"
              required
            />
          </div>

          <div className="drFormGroup">
            <label className="drFormLabel">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="drFormInput"
              required
            />
          </div>

          <button type="submit" className="drActionBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}