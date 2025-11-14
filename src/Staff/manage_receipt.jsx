import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./manage_receipt.css";

export default function ManageReceipt() {
  const [receipts, setReceipts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedReceipts = JSON.parse(localStorage.getItem("receiptData")) || [];
    setReceipts(storedReceipts);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleView = (receipt) => {
    localStorage.setItem("selectedReceipt", JSON.stringify(receipt));
    navigate("/staff/view-pass", { state: { receipt } });
  };

  const handleDelete = (receiptId) => {
    const updatedReceipts = receipts.filter((r) => r.receiptId !== receiptId);
    setReceipts(updatedReceipts);
    localStorage.setItem("receiptData", JSON.stringify(updatedReceipts));
    alert("Receipt deleted successfully!");
  };

  return (
    <div className="manage-receipt-container">
      <h2>Manage Receipts</h2>

      <div className="receipt-table-container">
        <table className="receipt-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Receipt ID</th>
              <th>Owner Name</th>
              <th>Vehicle Number</th>
              <th>Date of Creation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {receipts.length > 0 ? (
              receipts.map((receipt, index) => (
                <tr key={receipt.receiptId}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Receipt ID">{receipt.receiptId}</td>
                  <td data-label="Owner Name">{receipt.ownerName}</td>
                  <td data-label="Vehicle Number">{receipt.fullVehicleNumber}</td>
                  <td data-label="Date of Creation">{formatDate(receipt.dateOfCreation)}</td>

                  <td data-label="Action" className="action-cell">
                    <button
                      className="view-btn"
                      onClick={() => handleView(receipt)}
                    >
                      View
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(receipt.receiptId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No receipts found. Add a receipt to see it here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
