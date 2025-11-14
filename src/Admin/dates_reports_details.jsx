import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./dates_reports_details.css";

export default function DatesReportsDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { fromDate, toDate } = location.state || {};

  const allPasses = JSON.parse(localStorage.getItem("passData")) || [];

  const reportData = allPasses.filter((pass) => {
    const passDate = new Date(pass.createdAt.split(" ")[0]);
    return passDate >= new Date(fromDate) && passDate <= new Date(toDate);
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="datesReportsContainer">
      <div className="datesReportsWrapper">
        <h2 className="datesReportsHeading">Between Dates Pass Generate Reports</h2>

        <h4 className="datesReportsSubText">
          Report from <b>{formatDate(fromDate)}</b> to{" "}
          <b>{formatDate(toDate)}</b>
        </h4>

        <table className="datesReportsTable">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Pass ID</th>
              <th>Name of Applicant</th>
              <th>Vehicle Reg Number</th>
              <th>Date of Creation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reportData.length > 0 ? (
              reportData.map((item, i) => (
                <tr key={i}>
                  <td data-label="S.NO">{i + 1}</td>
                  <td data-label="Pass ID">{item.passId}</td>
                  <td data-label="Name of Applicant">{item.applicantName}</td>
                  <td data-label="Vehicle Reg Number">{item.vehicleRegNumber}</td>
                  <td data-label="Date of Creation">
                    {formatDate(item.createdAt)}
                  </td>

                  <td data-label="Action">
                    <button
                      className="datesReportsActionBtn"
                      onClick={() =>
                        navigate("/admin/dashboard/view_pass_details", {
                          state: { pass: item },
                        })
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                  No data found for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="datesReportsBackBtnWrap">
          <button className="datesReportsActionBtn" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}