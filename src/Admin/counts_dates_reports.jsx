import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation
import "./counts_dates_reports.css";

export default function CountsDatesReports() {
  const [dates, setDates] = useState({
    from: "",
    to: ""
  });

  const navigate = useNavigate(); // ✅ Added hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Navigate to details page with dates
    navigate("/admin/dashboard/counts_dates_reports/details", { state: { dates } });
  };

  return (
    <div className="cdrNewContainer">
      <div className="cdrNewWrapper">
        <h2 className="cdrNewHeading">Between Counts dates reports</h2>

        <form className="cdrNewForm" onSubmit={handleSubmit}>
          <div className="cdrFormGroup">
            <label className="cdrFormLabel">From Date</label>
            <input
              type="date"
              name="from"
              value={dates.from}
              onChange={handleChange}
              className="cdrFormInput"
              required
            />
          </div>

          <div className="cdrFormGroup">
            <label className="cdrFormLabel">To Date</label>
            <input
              type="date"
              name="to"
              value={dates.to}
              onChange={handleChange}
              className="cdrFormInput"
              required
            />
          </div>

          <button type="submit" className="cdrActionBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}