import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Use the hook that provides { user, logout }
import "./header.css";
import logoImage from "./Vessel_Investor_Logo_2.png";
import menuImage from "./bars-light-1.png";

function Header() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { user, logout } = useAuth();  // replaced "token" with "user"
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page (or wherever you'd like)
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Vessel Investor" />
      </div>
      <div className="menu-icon" onClick={toggleDropdown}>
        <img src={menuImage} alt="Menu" />
      </div>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/profile")}>Profile</li>
            {user ? (
              <li onClick={handleLogout}>Logout</li>
            ) : (
              <li onClick={() => navigate("/login")}>Login</li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
