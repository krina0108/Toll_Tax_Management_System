import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search_receipt.css";

export default function SearchReceipt() {
  const [query, setQuery] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // To control table display
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("receiptData")) || [];
    setReceipts(data);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSearch = () => {
    setIsSearched(true); // Trigger table display on search

    const lowerQuery = query.toLowerCase().trim();
    const filtered = lowerQuery === "" ? receipts : receipts.filter((r) => {
      const vehicleReg =
        r.vehicleNumber ||
        `${r.vehicleDistrict || ""}${r.vehicleSeriesNumber || ""}`.trim();
      return (
        (r.receiptId || r.id)?.toLowerCase().includes(lowerQuery) ||
        r.ownerName?.toLowerCase().includes(lowerQuery) ||
        vehicleReg.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredReceipts(filtered);
  };

  const handleView = (receipt) => {
    localStorage.setItem("selectedReceipt", JSON.stringify(receipt));
    navigate("/admin/dashboard/view_receipt_details_admin", { state: { receipt } });
  };

  return (
    <div className="receipt-search-wrapper">
      <h2 className="sr-title">Search Receipt</h2>

      <div className="sr-input-section">
        Search by Receipt Number / Owner Name / Vehicle Number
        <input
          type="text"
          placeholder="Enter Receipt Number, Owner Name, or Vehicle Number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sr-input"
        />
        <button className="sr-search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Show results ONLY after search button is clicked */}
      {isSearched && (
        <>
          {filteredReceipts.length > 0 ? (
            <div className="sr-table-wrapper">
              <table className="sr-table">
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
                  {filteredReceipts.map((r, index) => {
                    const vehicleReg =
                      r.vehicleNumber ||
                      `${r.vehicleDistrict || ""}${r.vehicleSeriesNumber || ""}`.trim();
                    return (
                      <tr key={r.receiptId || r.id || index}>
                        <td data-label="S.No">{index + 1}</td>
                        <td data-label="Receipt ID">{r.receiptId || r.id}</td>
                        <td data-label="Owner Name">{r.ownerName}</td>
                        <td data-label="Vehicle Number">{vehicleReg}</td>
                        <td data-label="Date of Creation">
                          {formatDate(r.dateOfCreation || r.createdAt)}
                        </td>
                        <td data-label="Action">
                          <button className="sr-view-btn" onClick={() => handleView(r)}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sr-no-results">
              No receipts found for "{query}"
            </p>
          )}
        </>
      )}
    </div>
  );
}