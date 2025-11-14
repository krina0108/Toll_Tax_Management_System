import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./view_pass_details.css";

export default function ViewPassDetails() {
  const { state: pass } = useLocation();
  const navigate = useNavigate();

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  if (!pass) return <h2>No Data Found</h2>;

  return (
    <div className="vp-container">
      <div className="vp-card">
        <h2 className="vp-title">Pass Details</h2>

        <table className="vp-table">
          <tbody>
            <tr><td>Pass ID</td><td>{pass.passId}</td></tr>
            <tr><td>Vehicle Category</td><td>{pass.vehicleCategory}</td></tr>
            <tr><td>Vehicle Name</td><td>{pass.vehicleName}</td></tr>
            <tr><td>Vehicle Reg Number</td><td>{pass.vehicleRegNumber}</td></tr>
            <tr><td>Validity From</td><td>{formatDate(pass.validityFrom)}</td></tr>
            <tr><td>Validity To</td><td>{formatDate(pass.validityTo)}</td></tr>
            <tr><td>Applicant Name</td><td>{pass.applicantName}</td></tr>
            <tr><td>Applicant Age</td><td>{pass.applicantAge}</td></tr>
            <tr><td>Applicant Gender</td><td>{pass.applicantGender}</td></tr>
            <tr><td>Applicant Address</td><td>{pass.applicantAddress}</td></tr>
            <tr><td>Cost of Pass</td><td>{pass.costOfPass}</td></tr>
          </tbody>
        </table>

        <div className="vp-btn-group">
          <button onClick={() => window.print()}>🖨️ Print Pass</button>
          <button onClick={() => navigate(-1)}>🔙 Back</button>
        </div>
      </div>
    </div>
  );
}
