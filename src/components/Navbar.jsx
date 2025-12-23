// Maintained by benyao
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="#3B82F6" />
              <path
                d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z"
                fill="white"
              />
              <circle cx="20" cy="20" r="3" fill="#60A5FA" />
              <path
                d="M18 18l4 4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>Profina</span>
          </div>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger-menu ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/resume/new" className="navbar-link">
            New Resume
          </Link>
          <Link to="/templates" className="navbar-link">
            Templates
          </Link>
          <Link to="/pricing" className="navbar-link pricing-link">
            Pricing
          </Link>

          <div className="navbar-user">
            <span className="user-name">
              {user?.displayName || user?.email}
            </span>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <div className="mobile-menu-backdrop" onClick={closeMenu}></div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-content">
            <Link
              to="/dashboard"
              className="mobile-navbar-link"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/resume/new"
              className="mobile-navbar-link"
              onClick={closeMenu}
            >
              New Resume
            </Link>
            <Link
              to="/templates"
              className="mobile-navbar-link"
              onClick={closeMenu}
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="mobile-navbar-link pricing-link"
              onClick={closeMenu}
            >
              Pricing
            </Link>

            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <span className="mobile-user-name">
                  {user?.displayName || user?.email}
                </span>
              </div>
              <button onClick={handleSignOut} className="mobile-sign-out-btn">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
