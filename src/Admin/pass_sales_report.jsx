import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ ADD
import "./pass_sales_report.css";

export default function PassSalesReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [requestType, setRequestType] = useState("month");

  const navigate = useNavigate();   // ✅ ADD

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard/pass_sales_report_details", {
      state: { fromDate, toDate, requestType },
    });       // ✅ NAVIGATE + SEND DATA (corrected path)
  };

  return (
    <div className="pass-report-container">
      <div className="pass-report-wrapper">
        <h2 className="pass-report-heading">Pass sales report</h2>

        <form className="pass-report-form" onSubmit={handleSubmit}>
          <div className="pass-report-form-group">
            <label className="pass-report-form-label">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="pass-report-form-input"
              required
            />
          </div>

          <div className="pass-report-form-group">
            <label className="pass-report-form-label">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="pass-report-form-input"
              required
            />
          </div>

          <div className="pass-report-form-group">
            <label className="pass-report-form-label">Request Type</label>
            <div className="pass-report-radio-options">
              <label>
                <input
                  type="radio"
                  name="requestType"
                  value="month"
                  checked={requestType === "month"}
                  onChange={() => setRequestType("month")}
                />
                Month wise
              </label>

              <label>
                <input
                  type="radio"
                  name="requestType"
                  value="year"
                  checked={requestType === "year"}
                  onChange={() => setRequestType("year")}
                />
                Year wise
              </label>
            </div>
          </div>

          <button type="submit" className="pass-report-action-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}