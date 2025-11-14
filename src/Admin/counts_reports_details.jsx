import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./counts_reports_details.css";

export default function CountsReportsDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ✅ Get dates from state (passed from CountsDatesReports)
  const { dates } = location.state || {};
  
  // If no dates, show error
  if (!dates || !dates.from || !dates.to) {
    return (
      <div className="crNewContainer">
        <div className="crNewWrapper">
          <h2 className="crNewHeading">Error: No Dates Provided</h2>
          <p>Please go back and select dates.</p>
          <button 
            className="crActionBtn" 
            onClick={() => navigate("/admin/dashboard/counts_dates_reports")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ✅ Function to format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ Fetch pass data from localStorage (same as in ViewPass)
  const passList = JSON.parse(localStorage.getItem("passData")) || [];

  // ✅ Function to get month key (MM/YYYY)
  const getMonthKey = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  // ✅ Generate months between from and to dates, and count passes in each month
  const generatePassCounts = (from, to, passes) => {
    const months = [];
    const start = new Date(from);
    const end = new Date(to);
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    
    // Create a count map for passes within the date range
    const countMap = {};
    passes.forEach(pass => {
      if (pass.createdAt) {
        const passDate = new Date(pass.createdAt);
        if (passDate >= start && passDate <= end) {
          const key = getMonthKey(pass.createdAt);
          countMap[key] = (countMap[key] || 0) + 1;
        }
      }
    });
    
    // Generate months array with counts
    while (current <= end) {
      const key = getMonthKey(current);
      months.push({
        month: key,
        count: countMap[key] || 0
      });
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  const data = generatePassCounts(dates.from, dates.to, passList);
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="crNewContainer">
      <div className="crNewWrapper">
        <h2 className="crNewHeading">Pass Count Report</h2>

        <h4 className="crNewSubText">
          Vehicle Pass Count Report from <b>{formatDate(dates.from)}</b> to{" "}
          <b>{formatDate(dates.to)}</b>
        </h4>

        <table className="crNewTable">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Total Vehicle Pass</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td data-label="S.NO">{row.month}</td>
                <td data-label="Total Vehicle Pass">{row.count}</td>
              </tr>
            ))}

            {/* ✅ TOTAL ROW */}
            <tr className="total-row">
              <td data-label="S.NO">Total</td>
              <td data-label="Total Vehicle Pass">{total}</td>
            </tr>
          </tbody>
        </table>

        <div className="crBackBtnWrap">
          <button 
            className="crActionBtn" 
            onClick={() => navigate("/admin/dashboard/counts_dates_reports")}
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}
