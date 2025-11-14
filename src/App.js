import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌐 Public
import Home from "./home";

// 👨‍💼 Admin
import AdminLogin from "./Admin/login";
import AdminDashboardLayout from "./Admin/dashboard";
import AddStaff from "./Admin/addstaff";
import ManageStaffAdmin from "./Admin/manage_staff_admin";
import UpdateStaffInfo from "./Admin/update_staff_info";
// import AddCategoryAdmin from "./Admin/add_category_admin";
// import ManageCategoryAdmin from "./Admin/manage_category_admin";
// import UpdateCategoryAdmin from "./Admin/update_category_admin";
import AddPassAdmin from "./Admin/add_new_pass";

import ViewReceiptAdmin from "./Admin/view_receipt_admin";
import ViewReceiptDetails from "./Admin/view_receipt_details_admin";

// ✅ New
import SearchPass from "./Admin/search_pass";
import SearchReceipt from "./Admin/search_receipt";

import DatesReports from "./Admin/dates_reports";
import DatesReportsDetails from "./Admin/dates_reports_details";

// ✅ Pass Count Reports
import CountsDatesReports from "./Admin/counts_dates_reports";
import CountsReportsDetails from "./Admin/counts_reports_details";

// ✅ ✅ ✅ NEW IMPORT for pass sales report
import PassSalesReport from "./Admin/pass_sales_report";

// ✅ ✅ ✅ NEW IMPORT for pass sales report details
import PassSalesReportDetails from "./Admin/pass_sales_report_details";

// ✅ ✅ ✅ NEW IMPORT for admin profile
import AdminProfile from "./Admin/admin_profile";

// ✅ ✅ ✅ NEW IMPORT for admin settings
import AdminSetting from "./Admin/admin_setting";

// 👷 Staff
import StaffLogin from "./Staff/staff_login";
import StaffDashboard from "./Staff/staff_dashboard";
import StaffProfile from "./Staff/profile";
import ManageReceipt from "./Staff/manage_receipt";
import ViewPass from "./Staff/view";
import AddReceipt from "./Staff/add_receipt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard/*" element={<AdminDashboardLayout />}>
          
          {/* Staff Management */}
          <Route path="addstaff" element={<AddStaff />} />
          <Route path="managestaff" element={<ManageStaffAdmin />} />

          {/* Vehicle Category */}
          {/* <Route path="addvehiclecategory" element={<AddCategoryAdmin />} /> */}
          {/* <Route path="managevehiclecategory" element={<ManageCategoryAdmin />} /> */}
          {/* <Route path="updatecategoryadmin" element={<UpdateCategoryAdmin />} /> */}

          <Route path="add_new_pass" element={<AddPassAdmin />} />

          <Route path="searchpass" element={<SearchPass />} />
          <Route path="searchreceipt" element={<SearchReceipt />} />

          <Route path="view_receipt_admin" element={<ViewReceiptAdmin />} />
          <Route path="view_receipt_details_admin" element={<ViewReceiptDetails />} />

          {/* ✅ Date reports */}
          <Route path="reportspass/date" element={<DatesReports />} />
          <Route path="reportspass/date/details" element={<DatesReportsDetails />} />

          {/* ✅ Pass Count Reports */}
          <Route path="counts_dates_reports" element={<CountsDatesReports />} />
          <Route path="counts_dates_reports/details" element={<CountsReportsDetails />} />

          {/* ✅ ✅ ✅ New Pass Sales Report */}
          <Route path="pass_sales_report" element={<PassSalesReport />} />

          {/* ✅ ✅ ✅ New Pass Sales Report Details */}
          <Route path="pass_sales_report_details" element={<PassSalesReportDetails />} />

          {/* ✅ ✅ ✅ New Admin Profile */}
          <Route path="admin_profile" element={<AdminProfile />} />

          {/* ✅ ✅ ✅ New Admin Settings */}
          <Route path="admin_setting" element={<AdminSetting />} />

          {/* Default */}
          <Route
            index
            element={<div style={{ padding: "20px" }}>Welcome to Admin Dashboard</div>}
          />
        </Route>

        <Route path="/admin/update-staff-info" element={<UpdateStaffInfo />} />

        {/* Staff */}
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/staff/add-receipt" element={<AddReceipt />} />
        <Route path="/staff/manage-receipt" element={<ManageReceipt />} />
        <Route path="/staff/view-pass" element={<ViewPass />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;