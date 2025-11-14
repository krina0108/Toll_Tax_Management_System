// src/Admin/manage_staff_admin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./manage_staff_admin.css";

export default function ManageStaffAdmin() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staffData")) || [];
    const validStaff = storedStaff.filter(
      (s) => s.staffId && s.name && s.name.trim() !== ""
    );
    setStaffList(validStaff);
  }, []);

  const handleEdit = (staffId) => {
    const selected = staffList.find((s) => s.staffId === staffId);
    if (selected) {
      localStorage.setItem("loggedInStaff", JSON.stringify(selected));
      navigate("/admin/update-staff-info");
    }
  };

  return (
    <div className="manage-staff-container">
      <h2>Manage Staff</h2>

      {staffList.length === 0 ? (
        <p>No staff data found!</p>
      ) : (
        <table className="staff-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Staff ID</th>
              <th>Staff Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff, index) => (
              <tr key={staff.staffId}>
                <td data-label="S.No">{index + 1}</td>
                <td data-label="Staff ID">{staff.staffId}</td>
                <td data-label="Staff Name">{staff.name}</td>
                <td data-label="Action">
                  <button
                    className="msEditBtn"
                    onClick={() => handleEdit(staff.staffId)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}