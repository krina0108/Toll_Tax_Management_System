// ✅ ViewReceiptAdmin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./view_receipt_admin.css";

export default function ViewReceiptAdmin() {
  const [receiptData, setReceiptData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedReceipts = JSON.parse(localStorage.getItem("receiptData")) || [];
    setReceiptData(storedReceipts);
  }, []);

  const handleViewDetails = (item) => {
    navigate("/admin/dashboard/view_receipt_details_admin", {
      state: { receipt: item },
    });
  };

  return (
    <div className="receipt-container">
      <h2 className="receipt-title">View Receipt</h2>

      <div className="receipt-card">
        <div className="receipt-table-wrapper">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Receipt ID</th>
                <th>Owner Name</th>
                <th>Vehicle Reg Number</th>
                <th>Date of Creation</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {receiptData.length > 0 ? (
                receiptData.map((item, index) => {
                  const vehicleReg =
                    item.vehicleNumber ||
                    `${item.vehicleDistrict || ""}${item.vehicleSeriesNumber || ""}`.trim();

                  return (
                    <tr key={item.receiptId || index}>
                      <td data-label="S.NO">{index + 1}</td>
                      <td data-label="Receipt ID">{item.receiptId || item.id}</td>
                      <td data-label="Owner Name">{item.ownerName}</td>
                      <td data-label="Vehicle Reg Number">{vehicleReg}</td>
                      <td data-label="Date of Creation">
                        {new Date(item.dateOfCreation || item.createdAt).toLocaleDateString()}
                      </td>
                      <td data-label="Action">
                        <button
                          className="details-btn"
                          onClick={() => handleViewDetails(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No receipts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
