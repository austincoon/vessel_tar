import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./navigationBar.css";
import defaultImage from "./default_image.webp";
import { useAuth } from "../AuthContext";
import homeIcon from "./home-icon.png";

const backendURL = "http://localhost:8000"; // adjust if needed

function NavigationBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate("/user-dashboard");
  };

  const imageSrc =
    user && user.profileImage
      ? user.profileImage.startsWith("http")
        ? user.profileImage
        : `${backendURL}${user.profileImage}`
      : defaultImage;

  return (
    <div className="navigation-bar">
      <div className="profile-section">
        <img
          src={imageSrc}
          alt="Profile"
          className="profile-image"
          onClick={handleProfileClick}
        />
        <h4 className="user-name">
          {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
        </h4>
      </div>

      <h5>MENU</h5>
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <img src={homeIcon} alt="Home Icon" className="nav-icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-projects"
              className={() =>
                location.pathname.startsWith("/my-projects") ||
                location.pathname.startsWith("/add-project")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              My Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-property"
              className={() =>
                location.pathname.startsWith("/my-property") ||
                location.pathname.startsWith("/add-property")
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              My Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/investors"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Investments
            </NavLink>
          </li>
        </ul>
      </nav>

      <h5>EXPLORE</h5>
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/properties"
              className={() =>
                // If the route is active OR if the path starts with "/property" (but not "/my-property")
                (location.pathname.startsWith("/properties"))
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Property
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/investors"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Investors
            </NavLink>
          </li>
        </ul>
      </nav>

      <h5>SETTINGS</h5>
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Logout
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Go Back
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;
