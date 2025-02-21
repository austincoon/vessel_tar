import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthContext";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./DashboardPage";
import UserDashboard from "./UserDashboard";
import SplashPage from "./SplashPage";
import MyProjects from "./MyProjects";
import AddProjectForm from "./AddProjectForm";
import Projects from "./Projects";
import ProjectDetail from "./ProjectDetail";
import MyProperty from "./MyProperty";
import Investors from "./Investors";
import UserProfile from "./UserProfile";
import AddPropertyForm from "./AddPropertyForm";
import Property from "./Property";
import PropertyDetail from "./PropertyDetail";




const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
            path="/add-project"
            element={
              <ProtectedRoute>
                <AddProjectForm />
              </ProtectedRoute>
            }
           />
           <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          }
        />
            <Route
              path="/my-projects"
              element={
                <ProtectedRoute>
                  <MyProjects />
                </ProtectedRoute>
              }
            />
            <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
            <Route
              path="/investors"
              element={
                <ProtectedRoute>
                  <Investors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/properties"
              element={
                <ProtectedRoute>
                  <Property />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-property"
              element={
                <ProtectedRoute>
                  <MyProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-property"
              element={
                <ProtectedRoute>
                  <AddPropertyForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            {/* New route for property details */}
            <Route
              path="/property/:propertyId"
              element={
                <ProtectedRoute>
                  <PropertyDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
