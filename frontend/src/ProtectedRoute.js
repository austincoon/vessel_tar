// ProtectedRoute.js
import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, checkedAuth } = useAuth();

  console.log("ProtectedRoute: checkedAuth:", checkedAuth, "user:", user);

  if (!checkedAuth) {
    console.log("ProtectedRoute: Auth check in progress...");
    // Optionally, add a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute: No user found. Redirecting to /login.");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: User authenticated. Rendering protected component.");
  return children;
}

export default ProtectedRoute;
