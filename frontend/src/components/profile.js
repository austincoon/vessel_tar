import React from "react";
import "./profile.css";
import stockPhoto from "./default_image.webp"; // Adjust path based on your structure
import phoneIcon from "./mobile-light.png";
import locationIcon from "./location-crosshairs-light.png";
import emailIcon from "./envelope-light.png";
import badgeIcon from "./badge.png";

import { formatPhoneNumber } from "./formatPhoneNumber"; // Ensure this utility exists

// Define your backend URL (adjust as needed)
const backendURL = "http://localhost:8000";

function Profile({ profile }) {
  // If profile is null or undefined, show a placeholder
  if (!profile) {
    return <p>No profile data available.</p>;
  }

  // If profile.profileImage exists and doesn't start with 'http', prepend backendURL.
  const imageSrc = profile.profileImage 
    ? (profile.profileImage.startsWith("http")
         ? profile.profileImage
         : `${backendURL}${profile.profileImage}`)
    : stockPhoto;

  return (
    <div className="profile">
      <h1 className="user-name">{profile.firstName || "No Name"} {profile.lastName || ""}</h1>

      <div className="profile-image-container">
        <img
          src={imageSrc}
          alt="Profile"
          className="profile-photo" // Ensure class name matches CSS
        />

        <div className="badges">
          <span className="badge">Residential</span>
          <span className="badge">Retail</span>
        </div>
      </div>

      <div className="rating-contact-container">
        <div className="rating">
          <div className="rating-circle">
            <h3>
              {profile.vesselRating ? `${profile.vesselRating}%` : "N/A"}
            </h3>
            <span>Vessel Rating</span>
          </div>
        </div>

        <div className="contact">
          <div className="phone-number">
            <img src={phoneIcon} alt="phone icon" className="phone-icon" />
            <p>{profile.phoneNumber ? formatPhoneNumber(profile.phoneNumber) : "No Phone"}</p>
          </div>
          <div className="location">
            <img src={locationIcon} alt="location icon" className="location-icon" />
            <p>{profile.city || "No City"}, {profile.state || "No State"}</p>
          </div>
          <div className="email">
            <img src={emailIcon} alt="email icon" className="email-icon" />
            <p>{profile.email || "No Email"}</p>
          </div>
        </div>
      </div>

      <div className="projects-funded">
        <h3 className="projects-funded-number">0</h3>
        <p>Funded Projects</p>
      </div>
    </div>
  );
}

export default Profile;
