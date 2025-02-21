import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import api from "./api";
import defaultPropertyImage from "./components/default_property.svg";
// Import the ProjectDetail.css so that the styles are shared between the two pages.
import "./ProjectDetail.css";
import { useAuth } from "./AuthContext";

// Define all property fields with display labels.
const propertyFields = [
  { key: "property_id", label: "Property ID" },
  { key: "user_id", label: "User ID" },
  { key: "title", label: "Title" },
  { key: "property_type", label: "Property Type" },
  { key: "listing_type", label: "Listing Type" },
  { key: "price", label: "Price" },
  { key: "price_negotiable", label: "Price Negotiable" },
  { key: "property_status", label: "Property Status" },
  { key: "address", label: "Address" },
  { key: "property_size", label: "Property Size (sqft)" },
  { key: "lot_size", label: "Lot Size" },
  { key: "year_built", label: "Year Built" },
  { key: "zoning_type", label: "Zoning Type" },
  { key: "ideal_buyer_type", label: "Ideal Buyer Type" },
  { key: "financing_options", label: "Financing Options" },
  { key: "seller_financing", label: "Seller Financing" },
  { key: "cryptocurrency_accepted", label: "Cryptocurrency Accepted" },
  { key: "pre_inspection_report", label: "Pre-Inspection Report" },
  { key: "contingent_offers", label: "Contingent Offers" },
  { key: "incentives", label: "Incentives" },
  { key: "incentives_offered", label: "Offer Incentives?" },
  { key: "total_bedrooms", label: "Total Bedrooms" },
  { key: "total_bathrooms", label: "Total Bathrooms" },
  { key: "primary_bedroom_location", label: "Primary Bedroom Location" },
  { key: "open_floor_plan", label: "Open Floor Plan" },
  { key: "walk_in_closets", label: "Walk-in Closets" },
  { key: "basement", label: "Basement" },
  { key: "multiple_living_spaces", label: "Multiple Living Spaces" },
  { key: "kitchen_countertop_material", label: "Kitchen Countertop Material" },
  { key: "cabinet_type", label: "Cabinet Type" },
  { key: "kitchen_appliances_included", label: "Kitchen Appliances Included" },
  { key: "walk_in_pantry", label: "Walk-in Pantry" },
  { key: "island_or_bar_seating", label: "Island or Bar Seating" },
  { key: "smart_kitchen", label: "Smart Kitchen?" },
  { key: "smart_kitchen_features", label: "Smart Kitchen Features" },
  { key: "primary_bathroom_features", label: "Primary Bathroom Features" },
  { key: "faucet_finish", label: "Faucet Finish" },
  { key: "smart_mirrors_or_toilets", label: "Smart Mirrors or Toilets" },
  { key: "bidet_installed", label: "Bidet Installed" },
  { key: "fireplace", label: "Fireplace" },
  { key: "flooring_type", label: "Flooring Type" },
  { key: "smart_lighting", label: "Smart Lighting" },
  { key: "pre_wired_surround_sound", label: "Pre-wired Surround Sound" },
  { key: "ceiling_height", label: "Ceiling Height" },
  { key: "windows", label: "Windows" },
  { key: "built_in_shelving", label: "Built-in Shelving" },
  { key: "home_office_space", label: "Home Office Space?" },
  { key: "home_office_spaces", label: "Home Office Spaces" },
  { key: "number_of_offices", label: "Number of Offices" },
  { key: "garage", label: "Garage" },
  { key: "garage_capacity", label: "Garage Capacity" },
  { key: "driveway_type", label: "Driveway Type" },
  { key: "front_yard_landscaping", label: "Front Yard Landscaping" },
  { key: "outdoor_living_spaces", label: "Outdoor Living Spaces" },
  { key: "pool_or_hot_tub", label: "Pool or Hot Tub" },
  { key: "fenced_yard", label: "Fenced Yard" },
  { key: "fence_type", label: "Fence Type" },
  { key: "outdoor_lighting", label: "Outdoor Lighting" },
  { key: "garden_greenhouse_orchard", label: "Garden/Greenhouse/Orchard" },
  { key: "sprinkler_system", label: "Sprinkler System" },
  { key: "solar_panels", label: "Solar Panels" },
  { key: "ev_charging_station", label: "EV Charging Station" },
  { key: "rooftop_deck", label: "Rooftop Deck" },
  { key: "heating_system", label: "Heating System" },
  { key: "cooling_system", label: "Cooling System" },
  { key: "water_heater_type", label: "Water Heater Type" },
  { key: "smart_thermostat", label: "Smart Thermostat" },
  { key: "security_system", label: "Security System" },
  { key: "security_features", label: "Security Features" },
  { key: "fiber_internet", label: "Fiber Internet" },
  { key: "backup_generator", label: "Backup Generator" },
  { key: "septic_or_sewer", label: "Septic or Sewer" },
  { key: "school_district", label: "School District" },
  { key: "nearby_public_transit", label: "Nearby Public Transit" },
  { key: "walkability_score", label: "Walkability Score" },
  { key: "bike_friendly", label: "Bike Friendly" },
  { key: "hoa_fees", label: "HOA Fees" },
  { key: "community_amenities", label: "Community Amenities" },
  { key: "gated_community", label: "Gated Community" },
  { key: "noise_level", label: "Noise Level" },
  { key: "crime_rate", label: "Crime Rate" },
  { key: "safety_features", label: "Safety Features" },
  { key: "rental_income_property", label: "Rental Income Property" },
  { key: "projected_monthly_rental_income", label: "Projected Monthly Rental Income" },
  { key: "short_term_rental_allowed", label: "Short Term Rental Allowed" },
  { key: "occupancy_status", label: "Occupancy Status" },
  { key: "adu_or_guest_house", label: "ADU or Guest House" },
  { key: "recently_appraised", label: "Recently Appraised" },
  { key: "appraisal_value", label: "Appraisal Value" },
  { key: "featured_listing", label: "Featured Listing" },
  { key: "are_you_working_with_agent", label: "Working with an Agent?" },
  { key: "agent_name", label: "Agent Name" },
  { key: "agent_contact", label: "Agent Contact" },
  { key: "best_contact_method", label: "Best Contact Method" },
  { key: "additional_notes", label: "Additional Notes" },
  { key: "marketing_services_needed", label: "Marketing Services Needed" },
  { key: "created_at", label: "Created At" }
];

const booleanFields = [
  "price_negotiable",
  "financing_options",
  "seller_financing",
  "cryptocurrency_accepted",
  "pre_inspection_report",
  "contingent_offers",
  "open_floor_plan",
  "walk_in_closets",
  "multiple_living_spaces",
  "kitchen_appliances_included",
  "walk_in_pantry",
  "island_or_bar_seating",
  "bidet_installed",
  "smart_lighting",
  "pre_wired_surround_sound",
  "built_in_shelving",
  "garage",
  "fenced_yard",
  "pool_or_hot_tub",
  "solar_panels",
  "ev_charging_station",
  "rooftop_deck",
  "smart_thermostat",
  "security_system",
  "fiber_internet",
  "backup_generator",
  "nearby_public_transit",
  "bike_friendly",
  "gated_community",
  "rental_income_property",
  "short_term_rental_allowed",
  "adu_or_guest_house",
  "recently_appraised",
  "featured_listing"
];

const mainFields = [
  { key: "title", label: "Title" },
  { key: "address", label: "Address" },
  { key: "property_type", label: "Property Type" },
  { key: "listing_type", label: "Listing Type" },
  { key: "price", label: "Price" },
  { key: "property_status", label: "Property Status" },
  { key: "property_size", label: "Property Size (sqft)" },
  { key: "year_built", label: "Year Built" }
];

const extraFields = propertyFields.filter(
  (field) => !mainFields.some((main) => main.key === field.key)
);

const formatValue = (value, key) => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (booleanFields.includes(key) && typeof value === "number") {
    return value === 1 ? "Yes" : "No";
  }
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  if (key === "price") {
    return `$${parseFloat(value).toLocaleString()}`;
  }
  return value;
};

const isTrue = (value) => {
  return value === true || value === "true" || value === 1 || value === "1";
};

const PropertyDetail = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [editedProperty, setEditedProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    api.get(`/property/${propertyId}`)
      .then((response) => {
        const data = { ...response.data };
        // Ensure all boolean fields have a default value
        booleanFields.forEach((key) => {
          if (data[key] === undefined) {
            data[key] = false;
          }
        });
        if (data.incentives === undefined) data.incentives_offered = false;
        if (data.smart_kitchen_features === undefined) data.smart_kitchen = false;
        if (data.home_office_spaces === undefined) data.home_office_space = false;
        setProperty(data);
        setEditedProperty(data);
      })
      .catch((err) => {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details.");
      });
  }, [propertyId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      await api.post(`/properties/${propertyId}/upload_images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const refreshed = await api.get(`/property/${propertyId}`);
      setProperty(refreshed.data);
      setEditedProperty(refreshed.data);
    } catch (err) {
      console.error("Error uploading images", err);
      alert("Error uploading images. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const { images, created_at, ...propertyData } = editedProperty;
      await api.put(`/properties/${propertyId}`, propertyData);
      const response = await api.get(`/property/${propertyId}`);
      setProperty(response.data);
      setEditedProperty(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedProperty(property);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/properties/${propertyId}`);
      navigate("/my-property");
    } catch (err) {
      console.error("Error deleting property:", err);
      alert("Failed to delete property. Please try again.");
    }
  };

  if (error) {
    return <div className="project-detail-error">{error}</div>;
  }

  if (!property) {
    return <div className="project-detail-loading">Loading property details...</div>;
  }

  return (
    <div className="project-detail-page">
      <NavigationBar />
      <div className="project-detail-container">
        {isEditing ? (
          <div className="project-edit-form">
            <h1>Edit Property</h1>
            <div className="upload-section">
              <label>Upload Property Images:</label>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className="project-edit-all">
              {propertyFields
                .filter(
                  (field) =>
                    field.key !== "property_id" &&
                    field.key !== "user_id" &&
                    field.key !== "created_at" &&
                    ![
                      "garage_capacity",
                      "fence_type",
                      "incentives_details",
                      "smart_kitchen_features",
                      "number_of_offices",
                      "agent_name",
                      "agent_contact"
                    ].includes(field.key)
                )
                .map((field) => {
                  if (booleanFields.includes(field.key)) {
                    return (
                      <div key={field.key} className="form-section">
                        <div className="checkbox-field">
                          <span>{field.label}</span>
                          <input
                            type="checkbox"
                            name={field.key}
                            checked={!!editedProperty[field.key]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={field.key} className="form-section">
                        <label>{field.label}:</label>
                        <input
                          type="text"
                          name={field.key}
                          value={editedProperty[field.key] || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    );
                  }
                })}
              {/* Inline Conditional Groups */}
              <div className="form-section">
                <div className="checkbox-field">
                  <span>Garage:</span>
                  <input
                    type="checkbox"
                    name="garage"
                    checked={!!editedProperty.garage}
                    onChange={handleInputChange}
                  />
                </div>
                {isTrue(editedProperty.garage) && (
                  <div className="conditional-field">
                    <label>Garage Capacity:</label>
                    <input
                      type="number"
                      name="garage_capacity"
                      value={editedProperty.garage_capacity || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className="form-section">
                <div className="checkbox-field">
                  <span>Fenced Yard:</span>
                  <input
                    type="checkbox"
                    name="fenced_yard"
                    checked={!!editedProperty.fenced_yard}
                    onChange={handleInputChange}
                  />
                </div>
                {isTrue(editedProperty.fenced_yard) && (
                  <div className="conditional-field">
                    <label>Fence Type:</label>
                    <input
                      type="text"
                      name="fence_type"
                      value={editedProperty.fence_type || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className="form-section">
                <div className="checkbox-field">
                  <span>Offer Incentives?</span>
                  <input
                    type="checkbox"
                    name="incentives_offered"
                    checked={!!editedProperty.incentives_offered}
                    onChange={handleInputChange}
                  />
                </div>
                {isTrue(editedProperty.incentives_offered) && (
                  <div className="conditional-field">
                    <label>Incentives Details:</label>
                    <input
                      type="text"
                      name="incentives_details"
                      value={editedProperty.incentives_details || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className="form-section">
                <div className="checkbox-field">
                  <span>Smart Kitchen?</span>
                  <input
                    type="checkbox"
                    name="smart_kitchen"
                    checked={!!editedProperty.smart_kitchen}
                    onChange={handleInputChange}
                  />
                </div>
                {isTrue(editedProperty.smart_kitchen) && (
                  <div className="conditional-field">
                    <label>Smart Kitchen Features:</label>
                    <input
                      type="text"
                      name="smart_kitchen_features"
                      value={editedProperty.smart_kitchen_features || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className="form-section">
                <div className="checkbox-field">
                  <span>Home Office Space?</span>
                  <input
                    type="checkbox"
                    name="home_office_space"
                    checked={!!editedProperty.home_office_space}
                    onChange={handleInputChange}
                  />
                </div>
                {isTrue(editedProperty.home_office_space) && (
                  <div className="conditional-field">
                    <label>Number of Offices:</label>
                    <input
                      type="number"
                      name="number_of_offices"
                      value={editedProperty.number_of_offices || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
              <div className="form-section">
                <div className="checkbox-field">
                  <span>Working with an Agent?</span>
                  <input
                    type="checkbox"
                    name="are_you_working_with_agent"
                    checked={!!editedProperty.are_you_working_with_agent}
                    onChange={handleInputChange}
                  />
                </div>
                {isTrue(editedProperty.are_you_working_with_agent) && (
                  <>
                    <div className="conditional-field">
                      <label>Agent Name:</label>
                      <input
                        type="text"
                        name="agent_name"
                        value={editedProperty.agent_name || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="conditional-field">
                      <label>Agent Contact:</label>
                      <input
                        type="text"
                        name="agent_contact"
                        value={editedProperty.agent_contact || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="form-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="project-detail-view">
            <div className="project-detail-header">
              <h1>{property.title}</h1>
              <p className="project-address">{property.address}</p>
            </div>
            <div className="project-detail-main">
              <div className="project-image-container">
                {property.images && property.images.length > 0 ? (
                  property.images.map((img) => (
                    <img
                      key={img.image_id}
                      src={img.image_url}
                      alt="Gallery"
                      className="project-detail-image"
                    />
                  ))
                ) : (
                  <img
                    src={defaultPropertyImage}
                    alt={property.title}
                    className="project-detail-image"
                  />
                )}
              </div>
              <div className="project-info-container">
                {mainFields.map((field) => (
                  <div key={field.key} className="project-info-item">
                    <span className="info-label">{field.label}:</span>
                    <span className="info-value">
                      {formatValue(property[field.key], field.key)}
                    </span>
                  </div>
                ))}
              </div>
              {showExtra && (
                <div className="project-info-extra">
                  {extraFields
                    .filter((field) => {
                      if (field.key === "garage_capacity" && !isTrue(property.garage))
                        return false;
                      if (field.key === "fence_type" && !isTrue(property.fenced_yard))
                        return false;
                      if (field.key === "incentives_details" && !isTrue(property.incentives_offered))
                        return false;
                      if (field.key === "smart_kitchen_features" && !isTrue(property.smart_kitchen))
                        return false;
                      if (field.key === "number_of_offices" && !isTrue(property.home_office_space))
                        return false;
                      if ((field.key === "agent_name" || field.key === "agent_contact") && !isTrue(property.are_you_working_with_agent))
                        return false;
                      return true;
                    })
                    .map((field) => (
                      <div key={field.key} className="project-info-row">
                        <span className="info-label">{field.label}:</span>
                        <span className="info-value">
                          {formatValue(property[field.key], field.key)}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="project-detail-actions">
              {user && property.user_id === user.user_id ? (
                <>
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    Edit Property
                  </button>
                  <button className="delete-btn" onClick={handleDelete}>
                    Delete Property
                  </button>
                  <button className="show-btn" onClick={() => setShowExtra((prev) => !prev)}>
                    {showExtra ? "Show Less" : "Show More"}
                  </button>
                </>
              ) : (
                <button className="show-btn" onClick={() => setShowExtra((prev) => !prev)}>
                  {showExtra ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
