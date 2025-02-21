import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import "./Property.css"; // Ensure you have appropriate styles for this page
import { useAuth } from "./AuthContext";
import api from "./api";
import defaultPropertyImage from "./components/default_property.svg";

const Property = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Call the new endpoint that returns all properties except the current user's
    api.get("/properties")
      .then((response) => {
        console.log("Properties data:", response.data);
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="property-page">
      <NavigationBar />
      <div className="property-content">
        <h1>Properties</h1>
        <div className="property-grid">
          {properties.map((property) => (
            <div
              key={property.property_id}
              className="property-card"
              onClick={() => handlePropertyClick(property.property_id)}
              style={{ cursor: "pointer" }} // Visual feedback that the card is clickable
            >
              <img
                src={
                  property.media_photos && property.media_photos.length > 0
                    ? property.media_photos[0]
                    : defaultPropertyImage
                }
                alt={property.title}
                className="property-image"
              />
              <div className="property-details">
                <h2>{property.title}</h2>
                <p><strong>Address:</strong> {property.address}</p>
                <p>
                  {property.property_type} - {property.listing_type} - $
                  {property.price || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Property;
