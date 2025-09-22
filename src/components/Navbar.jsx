import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
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

        <div className="navbar-menu">
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
      </div>
    </nav>
  );
};

export default Navbar;
