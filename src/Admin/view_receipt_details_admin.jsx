import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./view_receipt_details_admin.css";

export default function ViewReceiptDetailsAdmin() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(state?.receipt || null);

  useEffect(() => {
    if (!receipt) {
      const saved = JSON.parse(localStorage.getItem("selectedReceipt"));
      if (saved) setReceipt(saved);
    }
  }, [receipt]);

  const handlePrint = () => window.print();

  if (!receipt) {
    return (
      <div className="vrda-container">
        <h2>No Receipt Found</h2>
        <button onClick={() => navigate(-1)} className="vrda-back-btn">
          Back
        </button>
      </div>
    );
  }

  // ✅ Always compute properly
  const vehicleNumber = (() => {
    const district = receipt.vehicleDistrict ? receipt.vehicleDistrict.toUpperCase() : "";
    const series = receipt.vehicleSeriesNumber ? receipt.vehicleSeriesNumber.toUpperCase() : "";
    return `${district} ${series}`.trim();
  })();

  return (
    <div className="vrda-container">
      <div className="vrda-card">
        <h2 className="vrda-title">Receipt Details</h2>

        <table className="vrda-table">
          <tbody>
            <tr><th>Lane Number</th><td>{receipt.laneName}</td></tr>
            <tr><th>Receipt ID</th><td>{receipt.receiptId}</td></tr>
            <tr><th>Vehicle Category</th><td>{receipt.vehicleCategory}</td></tr>
            <tr><th>Vehicle Name</th><td>{receipt.vehicleName}</td></tr>
            <tr><th>Owner Name</th><td>{receipt.ownerName}</td></tr>

            {/* ✅ Always works */}
            <tr><th>Vehicle Reg Number</th><td>{vehicleNumber}</td></tr>

            <tr><th>Vehicle Enter City</th><td>{receipt.vehicleCity}</td></tr>
            <tr><th>Trip</th><td>{receipt.trip}</td></tr>
            <tr><th>Cost</th><td>₹{receipt.cost}</td></tr>
            <tr><th>Date of Creation</th><td>{receipt.dateOfCreation}</td></tr>
          </tbody>
        </table>

        <div className="vrda-btn-group">
          <button className="vrda-print-btn" onClick={handlePrint}>
            🖨️ Print Receipt
          </button>
          <button className="vrda-back-btn" onClick={() => navigate(-1)}>
            🔙 Back to View Receipts
          </button>
        </div>
      </div>
    </div>
  );
}
