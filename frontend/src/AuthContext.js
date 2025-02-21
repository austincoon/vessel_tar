import React, { createContext, useState, useEffect, useContext } from "react";
import api from "./api"; // Your Axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [checkedAuth, setCheckedAuth] = useState(false);

  // On mount, check if there's a valid token and fetch user data
  useEffect(() => {
    console.log("AuthProvider: Checking authentication on mount...");
    if (token) {
      api.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          console.log("AuthProvider: Auth check response:", res.data);
          setUser({
            ...res.data,
            id: res.data.user_id,  // Map 'user_id' to 'id'
          });
          console.log("AuthProvider: User set to:", res.data || null);
        })
        .catch((err) => {
          console.error("AuthProvider: Auth check error:", err);
          setUser(null); // Ensure user is set to null on error
        })
        .finally(() => {
          setCheckedAuth(true);
          console.log("AuthProvider: Auth check completed.");
        });
    } else {
      setCheckedAuth(true);
    }
  }, [token]);

  const login = (newToken, onSuccessNavigate) => {
    console.log("AuthProvider: Login called with token:", newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    api.get("/api/user", {
      headers: { Authorization: `Bearer ${newToken}` }
    })
      .then((res) => {
        console.log("AuthProvider: User data fetched after login:", res.data);
        setUser({
          ...res.data,
          id: res.data.user_id,  // Map 'user_id' to 'id'
        });
        if (onSuccessNavigate) {
          console.log("AuthProvider: Calling onSuccessNavigate callback");
          onSuccessNavigate();
        }
      })
      .catch((err) => {
        console.error("AuthProvider: Error fetching user after login:", err);
        setUser(null); // Ensure user is set to null on error
      });
  };

  const logout = () => {
    console.log("AuthProvider: Logging out.");
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, checkedAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
