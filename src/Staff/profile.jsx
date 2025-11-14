import React, { useState, useEffect } from "react";
import "./profile.css";

export default function StaffProfile() {
  const [staffData, setStaffData] = useState(null);

  // ✅ Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString(); // Same as UpdateStaffInfo
  };

  useEffect(() => {
    // Load logged-in staff OR create new
    const loggedInStaff = JSON.parse(localStorage.getItem("loggedInStaff"));
    if (loggedInStaff) {
      setStaffData(loggedInStaff);
    } else {
      const newStaff = {
        staffId: Date.now().toString(),
        name: "",
        mobile: "",
        email: "",
        gender: "",
        address: "",
        dob: "",
        joiningDate: new Date().toISOString(), // stored ISO
      };
      setStaffData(newStaff);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!staffData.name || !staffData.email) {
      alert("Please fill in required fields (Name & Email).");
      return;
    }

    // Save loggedInStaff
    localStorage.setItem("loggedInStaff", JSON.stringify(staffData));

    // Get all staff
    const allStaff = JSON.parse(localStorage.getItem("staffData")) || [];

    // Update / Add
    const existingIndex = allStaff.findIndex(
      (s) => s.staffId === staffData.staffId
    );

    let updatedStaff;
    if (existingIndex !== -1) {
      allStaff[existingIndex] = staffData;
      updatedStaff = allStaff;
    } else {
      updatedStaff = [...allStaff, staffData];
    }

    // Remove invalid entries
    const cleanList = updatedStaff.filter((s) => s.staffId && s.name && s.email);

    // Save
    localStorage.setItem("staffData", JSON.stringify(cleanList));

    alert("✅ Staff details updated!");
  };

  if (!staffData) return <h3>Loading profile...</h3>;

  return (
    <div className="staff-profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <h2 className="profile-title">My Profile</h2>

        {/* LEFT SIDE */}
        <div className="profile-left">

          <div className="profile-row">
            <label>Staff ID</label>
            <input type="text" value={staffData.staffId} disabled />
          </div>

          <div className="profile-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={staffData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-row">
            <label>Contact Number</label>
            <input
              type="text"
              name="mobile"
              value={staffData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="profile-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={staffData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-row gender-row">
            <label>Gender</label>
            <div className="gender-options">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={staffData.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

          <div className="profile-row">
            <label>Address</label>
            <textarea
              name="address"
              value={staffData.address}
              onChange={handleChange}
            />
          </div>

          <div className="profile-row">
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              value={staffData.dob || ""}
              onChange={handleChange}
            />
          </div>

          <div className="profile-row">
            <label>Joining Date</label>
            <input
              type="text"
              value={formatDate(staffData.joiningDate)}
              disabled
            />
          </div>
        </div>

        <div className="update-btn-container">
          <button type="submit" className="update-btn">
            Update
          </button>
        </div>

      </form>
    </div>
  );
}
