import React, { useState, useEffect } from "react";
import "./update_category_admin.css"; // new CSS file
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateCategoryAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const existingCategory = location.state?.category || "";

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (existingCategory) setCategory(existingCategory);
  }, [existingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) return alert("Please enter a vehicle category");

    const storedCategories = JSON.parse(localStorage.getItem("vehicleCategories")) || [];
    const storedMeta = JSON.parse(localStorage.getItem("vehicleCategoriesMeta")) || {};

    const currentDateTime = new Date().toISOString().slice(0, 16).replace("T", " "); // current date & time

    if (existingCategory) {
      // Edit existing category
      const updatedCategories = storedCategories.map((cat) =>
        cat === existingCategory ? category : cat
      );
      localStorage.setItem("vehicleCategories", JSON.stringify(updatedCategories));

      // Keep original creation date
      if (storedMeta[existingCategory]) {
        storedMeta[category] = storedMeta[existingCategory];
        delete storedMeta[existingCategory];
        localStorage.setItem("vehicleCategoriesMeta", JSON.stringify(storedMeta));
      }

      // Update receipts using this category
      const receipts = JSON.parse(localStorage.getItem("receiptData")) || [];
      const updatedReceipts = receipts.map((r) =>
        r.vehicleCategory === existingCategory
          ? { ...r, vehicleCategory: category }
          : r
      );
      localStorage.setItem("receiptData", JSON.stringify(updatedReceipts));

      alert(`Category has been updated to "${category}"`);
    } else {
      // Add new category
      storedCategories.push(category);
      storedMeta[category] = currentDateTime; // current date & time
      localStorage.setItem("vehicleCategories", JSON.stringify(storedCategories));
      localStorage.setItem("vehicleCategoriesMeta", JSON.stringify(storedMeta));

      alert(`Category "${category}" has been added`);
    }

    setCategory("");
    navigate("/admin/dashboard/managevehiclecategory");
  };

  return (
    <div className="aouc-container">
      <div className="aouc-box">
        <h2 className="aouc-title">
          {existingCategory ? "Update Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="aouc-form">
          <label htmlFor="vehicleCategory" className="aouc-label">
            Vehicle Category
          </label>
          <input
            id="vehicleCategory"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter vehicle category"
            className="aouc-input"
          />
          <button type="submit" className="aouc-btn">
            {existingCategory ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}