import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./search_pass.css";

export default function SearchPass() {
  const [query, setQuery] = useState("");
  const [passes, setPasses] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [isSearched, setIsSearched] = useState(false); // To control table display
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("passData")) || [];
    setPasses(data);
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
    const filtered = passes.filter(
      (p) =>
        p.passId?.toLowerCase().includes(lowerQuery) ||
        p.applicantName?.toLowerCase().includes(lowerQuery) ||
        p.vehicleRegNumber?.toLowerCase().includes(lowerQuery)
    );
    setFilteredPasses(filtered);
  };

  const handleView = (pass) => {
    localStorage.setItem("selectedPass", JSON.stringify(pass));
    navigate("/staff/view-pass", { state: { pass } });
  };

  return (
    <div className="pass-search-wrapper">
      <h2 className="sp-title">Search Pass</h2>

      <div className="sp-input-section">
        Search by Pass ID / Applicant Name / Vehicle Reg Number
        <input
          type="text"
          placeholder="Enter Pass ID, Applicant, or Vehicle Reg No..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sp-input"
        />
        <button className="sp-search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Show results ONLY after search button is clicked */}
      {isSearched && (
        <>
          {filteredPasses.length > 0 ? (
            <div className="sp-table-wrapper">
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Pass ID</th>
                    <th>Name of Applicant</th>
                    <th>Vehicle Reg. Number</th>
                    <th>Date of Creation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPasses.map((p, index) => (
                    <tr key={p.passId}>
                      <td data-label="S.No">{index + 1}</td>
                      <td data-label="Pass ID">{p.passId}</td>
                      <td data-label="Applicant Name">{p.applicantName}</td>
                      <td data-label="Vehicle Reg Number">{p.vehicleRegNumber}</td>
                      <td data-label="Date of Creation">{formatDate(p.createdAt)}</td>
                      <td data-label="Action">
                        <button className="sp-view-btn" onClick={() => handleView(p)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sp-no-results">
              No passes found for "{query}"
            </p>
          )}
        </>
      )}
    </div>
  );
}
