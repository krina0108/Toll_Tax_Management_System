// ✅ AdminDashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./dashboard.css";

import {
  FaUsers,
  FaCar,
  FaClipboardList,
  FaFileInvoice,
  FaTachometerAlt,
  FaIdCard,
  FaSearch,
  FaChartBar,
  FaPlus,
  FaListUl,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaSpinner,
} from "react-icons/fa";

import AddPassAdmin from "../Admin/add_new_pass";
import ViewPassAdmin from "../Admin/view_pass";
import ViewPassDetails from "../Admin/view_pass_details";
import ViewReceiptDetails from "../Admin/view_receipt_details_admin";

import SearchPass from "../Admin/search_pass";
import SearchReceipt from "../Admin/search_receipt";

import DatesReports from "../Admin/dates_reports";
import DatesReportsDetails from "../Admin/dates_reports_details";

import CountsDatesReports from "../Admin/counts_dates_reports";
import CountsReportsDetails from "../Admin/counts_reports_details";

const AdminDashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [loadingStaff, setLoadingStaff] = useState(true);
  const [animatedStaffCount, setAnimatedStaffCount] = useState(0);

  const [loadingPasses, setLoadingPasses] = useState(true);
  const [animatedPassCount, setAnimatedPassCount] = useState(0);

  const [loadingReceipts, setLoadingReceipts] = useState(true);
  const [animatedReceiptCount, setAnimatedReceiptCount] = useState(0);

  const [loadingTodayVehicles, setLoadingTodayVehicles] = useState(true);
  const [animatedTodayVehiclesCount, setAnimatedTodayVehiclesCount] = useState(0);

  const [loadingYesterdayVehicles, setLoadingYesterdayVehicles] = useState(true);
  const [animatedYesterdayVehiclesCount, setAnimatedYesterdayVehiclesCount] = useState(0);

  const [loadingLast7DaysVehicles, setLoadingLast7DaysVehicles] = useState(true);
  const [animatedLast7DaysVehiclesCount, setAnimatedLast7DaysVehiclesCount] = useState(0);

  /* ---------- WINDOW RESIZE ----------- */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- STAFF COUNT ----------- */
  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staffData")) || [];
    const validStaff = storedStaff.filter(
      (s) => s.staffId && s.name && s.name.trim() !== ""
    );
    const total = validStaff.length;
    setLoadingStaff(false);

    let current = 0;
    const inc = total > 0 ? Math.ceil(total / 50) : 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= total) {
        setAnimatedStaffCount(total);
        clearInterval(timer);
      } else setAnimatedStaffCount(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /* ---------- PASS COUNT ----------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("passData")) || [];
    const total = stored.length;
    setLoadingPasses(false);

    let current = 0;
    const inc = total > 0 ? Math.ceil(total / 50) : 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= total) {
        setAnimatedPassCount(total);
        clearInterval(timer);
      } else setAnimatedPassCount(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /* ---------- RECEIPT COUNT ----------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("receiptData")) || [];
    const total = stored.length;
    setLoadingReceipts(false);

    let current = 0;
    const inc = total > 0 ? Math.ceil(total / 50) : 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= total) {
        setAnimatedReceiptCount(total);
        clearInterval(timer);
      } else setAnimatedReceiptCount(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /* ---------- TODAY COUNT ----------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("receiptData")) || [];
    const today = new Date().toISOString().split("T")[0];

    const count = stored.filter((r) => {
      const rd = new Date(r.dateOfCreation || r.createdAt)
        .toISOString()
        .split("T")[0];
      return rd === today;
    }).length;

    setLoadingTodayVehicles(false);

    let current = 0;
    const inc = count > 0 ? Math.ceil(count / 50) : 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= count) {
        setAnimatedTodayVehiclesCount(count);
        clearInterval(timer);
      } else setAnimatedTodayVehiclesCount(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /* ---------- YESTERDAY COUNT ----------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("receiptData")) || [];
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yesterdayDate = y.toISOString().split("T")[0];

    const count = stored.filter((r) => {
      const rd = new Date(r.dateOfCreation || r.createdAt)
        .toISOString()
        .split("T")[0];
      return rd === yesterdayDate;
    }).length;

    setLoadingYesterdayVehicles(false);

    let current = 0;
    const inc = count > 0 ? Math.ceil(count / 50) : 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= count) {
        setAnimatedYesterdayVehiclesCount(count);
        clearInterval(timer);
      } else setAnimatedYesterdayVehiclesCount(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /* ---------- LAST 7 DAYS COUNT ----------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("receiptData")) || [];
    const s = new Date();
    s.setDate(s.getDate() - 7);

    const count = stored.filter((r) => {
      const rd = new Date(r.dateOfCreation || r.createdAt);
      return rd >= s;
    }).length;

    setLoadingLast7DaysVehicles(false);

    let current = 0;
    const inc = count > 0 ? Math.ceil(count / 50) : 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= count) {
        setAnimatedLast7DaysVehiclesCount(count);
        clearInterval(timer);
      } else setAnimatedLast7DaysVehiclesCount(current);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  /* -------- MENU HANDLERS ---------- */
  const toggleMenu = (m) => setOpenMenu(openMenu === m ? null : m);
  const toggleSidebar = () =>
    isMobile ? setShowSidebar(!showSidebar) : setCollapsed(!collapsed);

  const closeMobileSidebar = () => isMobile && setShowSidebar(false);

  const handleNavigation = (path) => {
    setShowProfileMenu(false);
    navigate(path);
    closeMobileSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  /* -------- ROUTING DISPLAY LOGIC ---------- */
  const needOutlet =
    location.pathname.includes("addstaff") ||
    location.pathname.includes("managestaff") ||
    location.pathname.includes("managevehiclecategory") ||
    location.pathname.includes("view_receipt_admin") ||
    location.pathname.includes("pass_sales_report") ||
    location.pathname.includes("pass_sales_report_details") ||
    location.pathname.includes("admin_profile") ||
    location.pathname.includes("admin_setting");

  const isAddPassPage = location.pathname.includes("add_new_pass");
  const isManagePassPage = location.pathname.includes("managepass");
  const isViewPassDetailsPage = location.pathname.includes("view_pass_details");
  const isViewReceiptDetailsPage =
    location.pathname.includes("view_receipt_details_admin");
  const isSearchPassPage = location.pathname.includes("searchpass");
  const isSearchReceiptPage = location.pathname.includes("searchreceipt");

  const isDatesReportsPage =
    location.pathname === "/admin/dashboard/reportspass/date";
  const isDatesReportsDetailsPage =
    location.pathname === "/admin/dashboard/reportspass/date/details";
  const isCountsDatesReportsPage =
    location.pathname === "/admin/dashboard/counts_dates_reports";
  const isCountsReportsDetailsPage =
    location.pathname === "/admin/dashboard/counts_dates_reports/details";

  /* ---------- CARD DATA ----------- */
  const data = [
    {
      id: 1,
      icon: <FaUsers />,
      count: loadingStaff ? <FaSpinner className="spinner" /> : animatedStaffCount,
      label: "Total Staffs",
      color: "#8e44ad",
    },
    {
      id: 3,
      icon: <FaFileInvoice />,
      count: loadingPasses ? <FaSpinner className="spinner" /> : animatedPassCount,
      label: "Total Passes",
      color: "#34495e",
    },
    {
      id: 4,
      icon: <FaCar />,
      count: loadingReceipts ? <FaSpinner className="spinner" /> : animatedReceiptCount,
      label: "Total Receipt",
      color: "#3498db",
    },
    {
      id: 5,
      icon: <FaCar />,
      count: loadingTodayVehicles ? <FaSpinner className="spinner" /> : animatedTodayVehiclesCount,
      label: "Today's Vehicles",
      color: "#9b59b6",
    },
    {
      id: 6,
      icon: <FaCar />,
      count: loadingYesterdayVehicles ? <FaSpinner className="spinner" /> : animatedYesterdayVehiclesCount,
      label: "Yesterday's Vehicles",
      color: "#e74c3c",
    },
    {
      id: 7,
      icon: <FaCar />,
      count: loadingLast7DaysVehicles ? <FaSpinner className="spinner" /> : animatedLast7DaysVehiclesCount,
      label: "Last 7 Days Vehicles",
      color: "#2980b9",
    },
  ];

  return (
    <div className="admin-main-container">
      {/* ✅ TOP NAV */}
      <nav className="admin-top-navbar">
        <div className="admin-navbar-left">
          <button className="admin-menu-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1 className="admin-navbar-title">TTMS</h1>
        </div>

        <div
          className="admin-navbar-icon"
          onClick={(e) => {
            e.stopPropagation();
            setShowProfileMenu(!showProfileMenu);
          }}
        >
          <FaUser />
        </div>

        {showProfileMenu && (
          <div
            className="admin-profile-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="profile-item"
              onClick={() => handleNavigation("/admin/dashboard/admin_profile")}
            >
              <FaUser /> Profile
            </div>

            <div
              className="profile-item"
              onClick={() => handleNavigation("/admin/dashboard/admin_setting")}
            >
              <FaClipboardList /> Settings
            </div>

            <div className="profile-item" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </div>
          </div>
        )}
      </nav>

      {/* ✅ SIDEBAR */}
      <aside
        className={`admin-sidebar ${collapsed ? "collapsed" : ""} ${
          showSidebar ? "show" : ""
        }`}
      >
        <div className="admin-sidebar-header">
          <h2 className="admin-sidebar-title">{!collapsed && "Menu"}</h2>
          {isMobile && (
            <button className="admin-toggle-btn" onClick={toggleSidebar}>
              ×
            </button>
          )}
        </div>

        <ul className="admin-sidebar-menu">
          <li onClick={() => handleNavigation("/admin/dashboard")}>
            <FaTachometerAlt /> {!collapsed && "Dashboard"}
          </li>

          {/* Staff */}
          <li onClick={() => toggleMenu("staff")} className="has-submenu">
            <FaUsers /> {!collapsed && "Staff"}
          </li>

          {openMenu === "staff" && !collapsed && (
            <ul className="admin-submenu">
              <li onClick={() => handleNavigation("/admin/dashboard/addstaff")}>
                <FaPlus /> Add Staff
              </li>
              <li
                onClick={() => handleNavigation("/admin/dashboard/managestaff")}
              >
                <FaListUl /> Manage Staff
              </li>
            </ul>
          )}

          {/* Pass */}
          <li onClick={() => toggleMenu("pass")} className="has-submenu">
            <FaIdCard /> {!collapsed && "Pass"}
          </li>

          {openMenu === "pass" && !collapsed && (
            <ul className="admin-submenu">
              <li
                onClick={() => handleNavigation("/admin/dashboard/add_new_pass")}
              >
                <FaPlus /> Add New Pass
              </li>
              <li
                onClick={() => handleNavigation("/admin/dashboard/managepass")}
              >
                <FaListUl /> Manage Pass
              </li>
            </ul>
          )}

          {/* Receipt */}
          <li
            onClick={() =>
              handleNavigation("/admin/dashboard/view_receipt_admin")
            }
          >
            <FaFileInvoice /> {!collapsed && "Details of Receipts"}
          </li>

          <li onClick={() => handleNavigation("/admin/dashboard/searchpass")}>
            <FaSearch /> {!collapsed && "Search Pass"}
          </li>

          <li onClick={() => handleNavigation("/admin/dashboard/searchreceipt")}>
            <FaSearch /> {!collapsed && "Search Receipt"}
          </li>

          {/* Reports */}
          <li onClick={() => toggleMenu("reportspass")} className="has-submenu">
            <FaChartBar /> {!collapsed && "Reports of Pass"}
          </li>

          {openMenu === "reportspass" && !collapsed && (
            <ul className="admin-submenu">
              <li
                onClick={() =>
                  handleNavigation("/admin/dashboard/reportspass/date")
                }
              >
                <FaListUl /> B/W Dates Reports
              </li>

              <li
                onClick={() =>
                  handleNavigation("/admin/dashboard/counts_dates_reports")
                }
              >
                <FaListUl /> Pass Count Reports
              </li>

              <li
                onClick={() =>
                  handleNavigation("/admin/dashboard/pass_sales_report")
                }
              >
                <FaListUl /> Sales From Pass
              </li>
            </ul>
          )}

          <li className="admin-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> {!collapsed && "Logout"}
          </li>
        </ul>
      </aside>

      {isMobile && showSidebar && (
        <div className="admin-overlay show" onClick={closeMobileSidebar}></div>
      )}

      {/* ✅ CONTENT */}
      <div className="admin-dashboard-container">
        {needOutlet ? (
          <Outlet />
        ) : isAddPassPage ? (
          <AddPassAdmin />
        ) : isManagePassPage ? (
          <ViewPassAdmin />
        ) : isViewPassDetailsPage ? (
          <ViewPassDetails />
        ) : isViewReceiptDetailsPage ? (
          <ViewReceiptDetails />
        ) : isSearchPassPage ? (
          <SearchPass />
        ) : isSearchReceiptPage ? (
          <SearchReceipt />
        ) : isDatesReportsPage ? (
          <DatesReports />
        ) : isDatesReportsDetailsPage ? (
          <DatesReportsDetails />
        ) : isCountsReportsDetailsPage ? (
          <CountsReportsDetails />
        ) : isCountsDatesReportsPage ? (
          <CountsDatesReports />
        ) : (
          <div className="admin-card-grid">
            {data.map((item) => (
              <div key={item.id} className="admin-card">
                <div
                  className="admin-card-icon"
                  style={{ background: item.color }}
                >
                  {item.icon}
                </div>
                <div className="admin-card-info">
                  <h2>{item.count}</h2>
                  <p>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="admin-dashboard-footer">
          Toll Tax Management System
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
