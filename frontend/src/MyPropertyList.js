import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./MyPropertyList.css"; // Ensure the path is correct
import defaultPropertyImage from "./components/default_property.svg";

const MyPropertyList = () => {
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8000/properties/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProperties();
    }
  }, [token]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleAddProperty = () => {
    navigate("/add-property");
  };

  return (
    <div className="property-page">
      <div className="property-content">
        <h2>My Properties</h2>
        {error && <p className="error">{error}</p>}
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <div
                key={property.property_id}
                className="property-card"
                onClick={() => handlePropertyClick(property.property_id)}
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
                  <p>
                    <strong>Address:</strong> {property.address}
                  </p>
                  <p>
                    {property.property_type} - {property.listing_type} - $
                    {property.price || "N/A"}
                  </p>
                </div>
              </div>
            ))}
            {/* Add New Property Card */}
            <div className="property-card add-property-card" onClick={handleAddProperty}>
              <div className="add-property-content">
                <span className="plus-icon">+</span>
                <h2>Add New Property</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPropertyList;
