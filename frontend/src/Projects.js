import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./Projects.css"; // Ensure you have this file styled as desired
import defaultProjectImage from "./components/default_property.svg"; // Placeholder image

const Projects = () => {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all projects and filter out those owned by the logged-in user
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8000/all-projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filter out projects where project.user_id === logged-in user id
      const filteredProjects = response.data.filter(
        (project) => project.user_id !== user.user_id
      );
      setProjects(filteredProjects);
      setError("");
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchProjects();
    }
  }, [token, user]);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="projects-page">
      <NavigationBar />
      <div className="projects-content">
        <h2>All Projects</h2>
        {error && <p className="error">{error}</p>}
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.project_id}
                className="project-card"
                onClick={() => handleProjectClick(project.project_id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={defaultProjectImage}
                  alt={project.project_name}
                  className="project-image"
                />
                <div className="project-details">
                  <h2>{project.project_name}</h2>
                  <p>
                    {project.project_city}, {project.project_state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
