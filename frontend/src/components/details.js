// src/components/details.js
import React from "react";
import "./details.css";

// Import icons if using them (optional)
// import bioIcon from "../assets/icons/bio.png";
// import educationIcon from "../assets/icons/education.png";
// import experienceIcon from "../assets/icons/experience.png";
// import investmentIcon from "../assets/icons/investment.png";
// import portfolioIcon from "../assets/icons/portfolio.png";
// import strategyIcon from "../assets/icons/strategy.png";
// import testimonialsIcon from "../assets/icons/testimonials.png";
// import mediaIcon from "../assets/icons/media.png";

function Details({ details }) {
  // If no profile data, show a placeholder
  if (!details) return <p className="no-details">No details available.</p>;

  return (
    <div className="details-container">
      <h2 className="details-title">Profile Details</h2>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={bioIcon} alt="Bio Icon" className="section-icon" /> */}
          Bio:
        </h3>
        <p className="section-content">{details.bio || "No bio available"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={educationIcon} alt="Education Icon" className="section-icon" /> */}
          Education:
        </h3>
        <p className="section-content">{details.education || "No education details"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={experienceIcon} alt="Experience Icon" className="section-icon" /> */}
          Experience:
        </h3>
        <p className="section-content">{details.experience || "No experience information"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={investmentIcon} alt="Investment Icon" className="section-icon" /> */}
          Investment Interests:
        </h3>
        <p className="section-content">{details.investmentInterests || "No investment interests"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={portfolioIcon} alt="Portfolio Icon" className="section-icon" /> */}
          Portfolio Overview:
        </h3>
        <p className="section-content">{details.portfolioOverview || "No portfolio overview"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={strategyIcon} alt="Strategy Icon" className="section-icon" /> */}
          Investment Strategy:
        </h3>
        <p className="section-content">{details.investmentStrategy || "No investment strategy"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={testimonialsIcon} alt="Testimonials Icon" className="section-icon" /> */}
          Testimonials:
        </h3>
        <p className="section-content">{details.testimonials || "No testimonials available"}</p>
      </div>

      <div className="details-section">
        <h3 className="section-heading">
          {/* <img src={mediaIcon} alt="Media Icon" className="section-icon" /> */}
          Media:
        </h3>
        <p className="section-content">{details.media || "No media mentions"}</p>
      </div>
    </div>
  );
}

export default Details;
