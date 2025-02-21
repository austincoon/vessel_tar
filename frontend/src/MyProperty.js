import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import MyPropertyList from "./MyPropertyList";
import "./MyProperty.css";
import { useAuth } from "./AuthContext";

const MyProperty = () => {
  const { user } = useAuth();

  return (
    <div className="my-property-page">
      <NavigationBar />
      <div className="my-property-content">
        <h1>My Property</h1>
        {/* Render the list of properties */}
        <MyPropertyList />
        {/* Button to navigate to the Add Property form on a separate page */}

      </div>
    </div>
  );
};

export default MyProperty;
