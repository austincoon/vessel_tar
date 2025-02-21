import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./MyProjects.css"; // Ensure this file is styled as desired
import defaultProjectImage from "./components/default_property.svg"; // Placeholder image

const MyProjects = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to fetch projects for the current user
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8000/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  // When a project card is clicked, navigate to the project detail page
  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  // When the "Add New Project" card is clicked, navigate to the add-project form
  const handleAddProject = () => {
    navigate("/add-project");
  };

  return (
    <div className="project-page">
      <NavigationBar />
      <div className="project-content">
        <h2>My Projects</h2>
        {error && <p className="error">{error}</p>}
        {projects.length === 0 && <p>No projects found.</p>}
        <div className="project-grid">
          {projects.map((project) => (
            <div
              key={project.project_id}
              className="project-card"
              onClick={() => handleProjectClick(project.project_id)}
              style={{ cursor: "pointer" }} // Ensures the pointer cursor appears
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
          {/* "Add New Project" Card */}
          <div
            className="project-card add-project-card"
            onClick={handleAddProject}
            style={{ cursor: "pointer" }}
          >
            <div className="add-project-content">
              <span className="plus-icon">+</span>
              <h2>Add New Project</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
