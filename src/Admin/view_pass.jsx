import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./view_pass.css";

export default function ViewPass() {
  const navigate = useNavigate();
  const [passList, setPassList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("passData")) || [];
    setPassList(data);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="vpNewContainer">
      <div className="vpNewWrapper">
        <h2 className="vpNewHeading">View Pass</h2>

        <table className="vpNewTable">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Pass ID</th>
              <th>Applicant Name</th>
              <th>Vehicle Number</th>
              <th>Date of Creation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {passList.length > 0 ? (
              passList.map((p, i) => (
                <tr key={i}>
                  <td data-label="S.NO">{i + 1}</td>
                  <td data-label="Pass ID">{p.passId}</td>
                  <td data-label="Applicant Name">{p.applicantName}</td>
                  <td data-label="Vehicle Number">{p.vehicleRegNumber}</td>
                  <td data-label="Date of Creation">{formatDate(p.createdAt)}</td>

                  <td data-label="Action">
                    <button
                      className="vpActionBtn"
                      onClick={() =>
                        navigate("/admin/dashboard/view_pass_details", {
                          state: p,
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
                <td colSpan={6}>No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

