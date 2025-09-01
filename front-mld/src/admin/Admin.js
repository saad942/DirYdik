import React, { useState } from "react";
import { FaCalendarAlt, FaUsers, FaBroom, FaThLarge, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

const ProSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && <div className="sidebar-overlay" onClick={closeMobileMenu}></div>}

      {/* Sidebar */}
      <div className={`pro-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="pro-sidebar-header">
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="pro-sidebar-menu">
          <li>
            <a href="/dashboard" onClick={closeMobileMenu}>
              <FaThLarge className="pro-icon" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/Apoin" onClick={closeMobileMenu}>
              <FaCalendarAlt className="pro-icon" />
              <span>Appointments</span>
            </a>
          </li>
          <li>
            <a href="/user" onClick={closeMobileMenu}>
              <FaUsers className="pro-icon" />
              <span>User Management</span>
            </a>
          </li>
          <li>
            <a href="/cleaners" onClick={closeMobileMenu}>
              <FaBroom className="pro-icon" />
              <span>Cleaner Management</span>
            </a>
          </li>
          <li>
            <a href="/logout" className="logout" onClick={closeMobileMenu}>
              <FaSignOutAlt className="pro-icon" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProSidebar;