import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./pass_sales_report_details.css";

export default function PassSalesReportDetails() {
  const { state } = useLocation();
  const { fromDate, toDate, requestType } = state || {};

  const [reportData, setReportData] = useState([]);
  const [grandTotalSales, setGrandTotalSales] = useState(0);
  const [grandTotalPassCount, setGrandTotalPassCount] = useState(0);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  useEffect(() => {
    const allPass = JSON.parse(localStorage.getItem("passData")) || [];
    if (!fromDate || !toDate) return;

    let start = new Date(fromDate);
    let end = new Date(toDate);

    // ✅ Filter pass in range
    const filteredPass = allPass.filter((p) => {
      const d = new Date(p.createdAt);
      return d >= start && d <= end;
    });

    let grouped = {};

    filteredPass.forEach((p) => {
      const d = new Date(p.createdAt);

      let key = requestType === "month"
        ? `${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`
        : `${d.getFullYear()}`;

      if (!grouped[key]) {
        grouped[key] = { count: 0, amount: 0 };
      }

      grouped[key].count += 1;
      grouped[key].amount += Number(p.amount || p.costOfPass || 0);
    });

    const rows = Object.entries(grouped).map(([k, v], i) => ({
      id: i + 1,
      period: k,
      count: v.count,
      amount: v.amount,
    }));

    setReportData(rows);

    const totalAmt = rows.reduce((sum, r) => sum + r.amount, 0);
    const totalCnt = rows.reduce((sum, r) => sum + r.count, 0);

    setGrandTotalSales(totalAmt);
    setGrandTotalPassCount(totalCnt);
  }, [fromDate, toDate, requestType]);

  return (
    <div className="pass-report-container">
      <div className="pass-report-wrapper">
        <h2 className="pass-report-heading">Pass Sales Reports</h2>

        <h3 className="report-heading">
          {requestType === "month" ? "Month Wise" : "Year Wise"} Report
        </h3>

        <h4 className="date-range-title">
          Pass Sales Report From {formatDate(fromDate)} To {formatDate(toDate)}
        </h4>

        <table className="report-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>{requestType === "month" ? "Month / Year" : "Year"}</th>
              <th>Pass Count</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {reportData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.period}</td>
                <td>{row.count}</td>
                <td>{row.amount}</td>
              </tr>
            ))}

            <tr className="total-row">
              <td></td>
              <td className="total-label">Total</td>
              <td className="total-count">{grandTotalPassCount}</td>
              <td className="total-sales">{grandTotalSales}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
