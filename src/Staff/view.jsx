import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./view.css";

export default function ViewPass() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(state?.receipt || null);

  useEffect(() => {
    if (!receipt) {
      const saved = JSON.parse(localStorage.getItem("selectedReceipt"));
      if (saved) setReceipt(saved);
    }
  }, [receipt]);

  const handlePrint = () => {
    window.print();
  };

  if (!receipt) {
    return (
      <div className="rda-container">
        <h2>No Receipt Found</h2>
        <button onClick={() => navigate(-1)} className="rda-back-btn">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="rda-container">
      <div className="rda-card">
        <h2 className="rda-title">Receipt Details</h2>

        <table className="rda-table">
          <tbody>
            <tr><th>Lane Name</th><td>{receipt.laneName}</td></tr>
            <tr><th>Receipt ID</th><td>{receipt.receiptId}</td></tr>
            <tr><th>Vehicle Category</th><td>{receipt.vehicleCategory}</td></tr>
            <tr><th>Vehicle Name</th><td>{receipt.vehicleName}</td></tr>
            <tr><th>Owner Name</th><td>{receipt.ownerName}</td></tr>
            <tr><th>Vehicle Number</th><td>{receipt.fullVehicleNumber}</td></tr>
            <tr><th>Vehicle City</th><td>{receipt.vehicleCity}</td></tr>
            <tr><th>Trip</th><td>{receipt.trip}</td></tr>
            <tr><th>Cost</th><td>₹{receipt.cost}</td></tr>
            <tr><th>Date of Creation</th><td>{receipt.dateOfCreation}</td></tr>
          </tbody>
        </table>

        <div className="rda-btn-group">
          <button className="rda-print-btn" onClick={handlePrint}>
            🖨️ Print Receipt
          </button>
          <button className="rda-back-btn" onClick={() => navigate(-1)}>
            ⬅ Back to Manage Receipts
          </button>
        </div>
      </div>
    </div>
  );
}
