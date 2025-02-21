import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import "./Investors.css";
import { useAuth } from "./AuthContext";
import api from "./api";
import defaultImage from "./components/default_image.webp";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Set your backend URL (adjust as needed)
const backendURL = "http://localhost:8000";

const Investors = () => {
  const { user: loggedInUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch investors (excluding logged-in user)
  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user.user_id !== loggedInUser.user_id
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [loggedInUser]);

  // Geocode unique cities
  useEffect(() => {
    const geocodeCity = async (city, state) => {
      const query = `${city}, ${state}`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
      return null;
    };
  
    const fetchLocations = async () => {
      setIsLoading(true);
      const unique = {};
      users.forEach((u) => {
        if (u.city && u.state) {
          const key = `${u.city.trim().toLowerCase()}-${u.state.trim().toLowerCase()}`;
          if (!unique[key]) unique[key] = { city: u.city, state: u.state };
        }
      });
  
      const uniqueCities = Object.values(unique);
      const locationPromises = uniqueCities.map(({ city, state }) =>
        geocodeCity(city, state).then((coords) => (coords ? { ...coords, city, state } : null))
      );
  
      const results = await Promise.all(locationPromises);
      // Filter out any null results.
      setLocations(results.filter((result) => result !== null));
      setIsLoading(false);
    };
  
    if (users.length > 0) {
      fetchLocations();
    }
  }, [users]);
  

  const handleInvestorClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleClearFilter = () => {
    setSelectedLocation(null);
  };

  // Filter by selected city/state
  const displayedUsers = selectedLocation
    ? users.filter(
        (u) =>
          u.city?.trim().toLowerCase() === selectedLocation.city.trim().toLowerCase() &&
          u.state?.trim().toLowerCase() === selectedLocation.state.trim().toLowerCase()
      )
    : users;

  const center =
    locations.length > 0 ? [locations[0].lat, locations[0].lng] : [39.8283, -98.5795];

  return (
    <div className="investors-page">
      <NavigationBar />
      <div className="investors-content">
        <h1>Investors</h1>

        {selectedLocation && (
          <div className="filter-info">
            <p>
              Filtering by:{" "}
              <strong>
                {selectedLocation.city}, {selectedLocation.state}
              </strong>
            </p>
            <button onClick={handleClearFilter}>Clear Filter</button>
          </div>
        )}

        {/* Horizontal slider of investor cards */}
        <div className="investors-slider-container">
          <div className="investors-slider">
            {isLoading ? (
              <p>Loading investors...</p>
            ) : (
              displayedUsers.map((user) => {
                // Determine the image source.
                const imageSrc = user.profileImage
                  ? user.profileImage.startsWith("http")
                    ? user.profileImage
                    : `${backendURL}${user.profileImage}`
                  : defaultImage;
                return (
                  <div
                    key={user.user_id}
                    className="investor-card"
                    onClick={() => handleInvestorClick(user.user_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={imageSrc}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="profile-image"
                    />
                    <div className="user-details">
                      <h2>
                        {user.firstName} {user.lastName}
                      </h2>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Role:</strong> {user.role}
                      </p>
                      <p>
                        <strong>City:</strong> {user.city}, {user.state}
                      </p>
                      <p>
                        <strong>Phone:</strong> {user.phoneNumber}
                      </p>
                      <p>
                        <strong>Rating:</strong> {user.vesselRating}
                      </p>
                      <p>
                        <strong>Joined:</strong>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Map */}
        <div className="investor-map-container">
          <h2>Investor Locations</h2>
          <MapContainer
            center={center}
            zoom={4}
            style={{ height: "600px", width: "100%" }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
            />
            {locations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.lat, loc.lng]}
                eventHandlers={{
                  click: () => {
                    if (
                      selectedLocation &&
                      selectedLocation.city.trim().toLowerCase() ===
                        loc.city.trim().toLowerCase() &&
                      selectedLocation.state.trim().toLowerCase() ===
                        loc.state.trim().toLowerCase()
                    ) {
                      setSelectedLocation(null);
                    } else {
                      setSelectedLocation({ city: loc.city, state: loc.state });
                    }
                  },
                }}
              >
                <Popup>
                  {loc.city}, {loc.state}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Investors;
