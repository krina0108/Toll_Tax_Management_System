import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileInvoice,
  FaPlus,
  FaListUl,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaWrench,
  FaBars,
  FaIdCard, // Added for Pass icon
} from "react-icons/fa";
import StaffProfile from "./profile"; // ✅ Profile form
import Settings from "./setting"; // ✅ Settings form
import AddReceipt from "./add_receipt"; // ✅ Add Receipt form
import ManageReceipt from "./manage_receipt"; // ✅ NEW — Manage Receipt page
import "./staff_dashboard.css";
import SearchReceipt from "./search_receipt";

// ✅ Added Pass-related components (same as Admin)
import AddPassAdmin from "../Admin/add_new_pass"; // Assuming path is correct; adjust if needed
import ViewPassAdmin from "../Admin/view_pass"; // Assuming path is correct; adjust if needed
import SearchPass from "../Admin/search_pass"; // Assuming path is correct; adjust if needed

export default function StaffDashboardLayout() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const toggleSidebar = () => {
    if (isMobile) setShowSidebar(!showSidebar);
    else setCollapsed(!collapsed);
  };

  const closeMobileSidebar = () => {
    if (isMobile) setShowSidebar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/staff");
  };

  // ✅ Profile
  const handleProfileClick = () => {
    setActivePage("profile");
    setShowProfile(false);
  };

  // ✅ Settings
  const handleSettingsClick = () => {
    setActivePage("settings");
    setShowProfile(false);
  };

  // ✅ Dashboard
  const handleDashboardClick = () => {
    setActivePage("dashboard");
  };

  // ✅ Add Receipt
  const handleAddReceiptClick = () => {
    setActivePage("add-receipt");
    setShowSidebar(false);
  };

  // ✅ Manage Receipt (open inside dashboard)
  const handleManageReceiptClick = () => {
    setActivePage("manage-receipt");
    setShowSidebar(false);
  };

  // ✅ Search Receipt
  const handleSearchReceiptClick = () => {
    setActivePage("search_receipt");
    setShowSidebar(false);
  };

  // ✅ Added Pass handlers
  const handleAddPassClick = () => {
    setActivePage("add-pass");
    setShowSidebar(false);
  };

  const handleManagePassClick = () => {
    setActivePage("manage-pass");
    setShowSidebar(false);
  };

  const handleSearchPassClick = () => {
    setActivePage("search-pass");
    setShowSidebar(false);
  };

  return (
    <div className="staff-main-container">
      {/* 🌿 Top Navbar */}
      <nav className="staff-top-navbar">
        <div className="staff-navbar-left">
          <button className="staff-menu-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h1 className="staff-navbar-title">TTMS</h1>
        </div>

        <div className="staff-navbar-right">
          <div
            className="staff-navbar-icon"
            onClick={() => setShowProfile(!showProfile)}
          >
            <FaUser />
          </div>

          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-item" onClick={handleProfileClick}>
                <FaUser /> <span>Profile</span>
              </div>
              <div className="profile-item" onClick={handleSettingsClick}>
                <FaWrench /> <span>Settings</span>
              </div>
              <div className="profile-item" onClick={handleLogout}>
                <FaSignOutAlt /> <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 🌸 Sidebar */}
      <aside
        className={`staff-sidebar ${collapsed ? "collapsed" : ""} ${showSidebar ? "show" : ""
          }`}
      >
        <div className="staff-sidebar-header">
          <h2 className="staff-sidebar-title">{!collapsed && "Menu"}</h2>
          {isMobile && (
            <button className="staff-toggle-btn" onClick={toggleSidebar}>
              ×
            </button>
          )}
        </div>

        <ul className="staff-sidebar-menu">
          <li
            className={`staff-sidebar-item ${activePage === "dashboard" ? "active" : ""
              }`}
            onClick={handleDashboardClick}
          >
            <FaTachometerAlt /> {!collapsed && <span>Dashboard</span>}
          </li>

          {/* ✅ Added Pass Menu */}
          <li
            className={`staff-sidebar-item ${openMenu === "pass" ? "active" : ""
              }`}
            onClick={() => toggleMenu("pass")}
          >
            <FaIdCard /> {!collapsed && <span>Pass</span>}
          </li>

          {openMenu === "pass" && !collapsed && (
            <ul className="staff-submenu">
              <li
                className={`staff-submenu-item ${activePage === "add-pass" ? "active" : ""
                  }`}
                onClick={handleAddPassClick}
              >
                <FaPlus /> <span>Add New Pass</span>
              </li>
              <li
                className={`staff-submenu-item ${activePage === "manage-pass" ? "active" : ""
                  }`}
                onClick={handleManagePassClick}
              >
                <FaListUl /> <span>Manage Pass</span>
              </li>
            </ul>
          )}

          <li
            className={`staff-sidebar-item ${openMenu === "receipt" ? "active" : ""
              }`}
            onClick={() => toggleMenu("receipt")}
          >
            <FaFileInvoice /> {!collapsed && <span>Receipt</span>}
          </li>

          {openMenu === "receipt" && !collapsed && (
            <ul className="staff-submenu">
              <li
                className={`staff-submenu-item ${activePage === "add-receipt" ? "active" : ""
                  }`}
                onClick={handleAddReceiptClick}
              >
                <FaPlus /> <span>Add Receipt</span>
              </li>
              <li
                className={`staff-submenu-item ${activePage === "manage-receipt" ? "active" : ""
                  }`}
                onClick={handleManageReceiptClick}
              >
                <FaListUl /> <span>Manage Receipt</span>
              </li>
            </ul>
          )}

          {/* ✅ Added Search Pass */}
          <li className="staff-sidebar-item" onClick={handleSearchPassClick}>
            <FaSearch /> {!collapsed && <span>Search Pass</span>}
          </li>

          <li className="staff-sidebar-item" onClick={handleSearchReceiptClick}>
            <FaSearch /> {!collapsed && <span>Search Receipt</span>}
          </li>
        </ul>
      </aside>

      {isMobile && showSidebar && (
        <div className="staff-overlay show" onClick={closeMobileSidebar}></div>
      )}

      {/* 🌸 Main Content */}
      <main className="staff-dashboard-content">
        {activePage === "dashboard" && (
          <>
            <div className="welcome-section">
              <h2 className="welcome-text">Welcome test staff !!!</h2>
            </div>
            <Outlet />
          </>
        )}

        {activePage === "profile" && <StaffProfile />}
        {activePage === "settings" && <Settings />}
        {activePage === "add-receipt" && <AddReceipt />}
        {activePage === "manage-receipt" && <ManageReceipt />}
        {activePage === "search_receipt" && <SearchReceipt />}

        {/* ✅ Added Pass page renderings */}
        {activePage === "add-pass" && <AddPassAdmin />}
        {activePage === "manage-pass" && <ViewPassAdmin />}
        {activePage === "search-pass" && <SearchPass />}

        <footer className="staff-dashboard-footer">
          Toll Tax Management System
        </footer>
      </main>
    </div>
  );
}