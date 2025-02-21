import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import api from "./api";
import defaultProjectImage from "./components/default_property.svg";
import "./ProjectDetail.css";
import { useAuth } from "./AuthContext";

// Define all project fields with display labels.
const projectFields = [
  { key: "project_id", label: "Project ID" },
  { key: "user_id", label: "User ID" },
  { key: "project_name", label: "Project Name" },
  { key: "project_type", label: "Project Type" },
  { key: "project_city", label: "City" },
  { key: "project_state", label: "State" },
  { key: "project_zip", label: "ZIP Code" },
  { key: "short_summary", label: "Summary" },
  { key: "current_development_stage", label: "Development Stage" },
  { key: "zoning_secured", label: "Zoning Secured" },
  { key: "missing_approvals", label: "Missing Approvals" },
  { key: "total_land_size", label: "Total Land Size" },
  { key: "buildable_area", label: "Buildable Area" },
  { key: "key_development_details", label: "Development Details" },
  { key: "total_project_cost", label: "Total Project Cost" },
  { key: "funding_secured", label: "Funding Secured" },
  { key: "capital_still_needed", label: "Capital Still Needed" },
  { key: "investor_capital_needed", label: "Investor Capital Needed" },
  { key: "investor_capital_amount", label: "Investor Capital Amount" },
  { key: "investor_capital_terms", label: "Investor Capital Terms" },
  { key: "equity_structure_available", label: "Equity Structure Available" },
  { key: "equity_structure_allocation", label: "Equity Structure Allocation" },
  { key: "minimum_investment_ticket", label: "Minimum Investment Ticket" },
  { key: "debt_vs_equity_structure", label: "Debt vs. Equity Structure" },
  { key: "projected_irr", label: "Projected IRR" },
  { key: "target_hold_period", label: "Target Hold Period" },
  { key: "projected_annual_yield", label: "Projected Annual Yield" },
  { key: "qualifies_for_tax_incentives", label: "Qualifies for Tax Incentives" },
  { key: "tax_incentives_specifics", label: "Tax Incentives Specifics" },
  { key: "appraisal_completed", label: "Appraisal Completed" },
  { key: "appraisal_document", label: "Appraisal Document" },
  { key: "financial_proforma_available", label: "Financial Proforma Available" },
  { key: "financial_proforma_document", label: "Financial Proforma Document" },
  { key: "construction_license", label: "Construction License" },
  { key: "contractor_secured", label: "Contractor Secured" },
  { key: "total_buildable_area", label: "Total Buildable Area" },
  { key: "planned_units", label: "Planned Units" },
  { key: "construction_type", label: "Construction Type" },
  { key: "land_acquisition_status", label: "Land Acquisition Status" },
  { key: "infrastructure_availability", label: "Infrastructure Availability" },
  { key: "missing_infrastructure", label: "Missing Infrastructure" },
  { key: "environmental_sustainability_features", label: "Environmental Sustainability Features" },
  { key: "sustainability_features", label: "Sustainability Features" },
  { key: "planned_amenities", label: "Planned Amenities" },
  { key: "project_strategy", label: "Project Strategy" },
  { key: "projected_leaseup_period", label: "Projected Lease-Up Period" },
  { key: "seeking_managing_partner", label: "Seeking Managing Partner" },
  { key: "managing_partner_responsibilities", label: "Managing Partner Responsibilities" },
  { key: "seeking_general_contractor", label: "Seeking General Contractor" },
  { key: "general_contractor_requirements", label: "General Contractor Requirements" },
  { key: "open_to_joint_venture", label: "Open to Joint Venture" },
  { key: "joint_venture_terms", label: "Joint Venture Terms" },
  { key: "accept_institutional_investment", label: "Accept Institutional Investment" },
  { key: "institutional_investment_options", label: "Institutional Investment Options" },
  { key: "match_long_term_hold_investors", label: "Match Long-Term Hold Investors" },
  { key: "desired_hold_period", label: "Desired Hold Period" },
  { key: "match_structured_exit_investors", label: "Match Structured Exit Investors" },
  { key: "exit_triggers", label: "Exit Triggers" },
  { key: "vessel_promote_project", label: "Vessel Promote Project" },
  { key: "custom_project_website", label: "Custom Project Website" },
  { key: "schedule_investor_webinar", label: "Schedule Investor Webinar" },
  { key: "upload_media_renderings", label: "Media Renderings" },
  { key: "upload_pitch_deck", label: "Pitch Deck" },
  { key: "virtual_tour_link", label: "Virtual Tour Link" },
  { key: "upload_legal_documents", label: "Legal Documents" },
  { key: "project_owner_name", label: "Project Owner Name" },
  { key: "company_name", label: "Company Name" },
  { key: "preferred_contact_method", label: "Preferred Contact Method" },
  { key: "automated_investor_inquiries", label: "Automated Investor Inquiries" },
  { key: "submitted_at", label: "Submitted At" }
];

const booleanFields = [
  "zoning_secured",
  "investor_capital_needed",
  "equity_structure_available",
  "qualifies_for_tax_incentives",
  "appraisal_completed",
  "financial_proforma_available",
  "contractor_secured",
  "infrastructure_availability",
  "environmental_sustainability_features",
  "seeking_managing_partner",
  "seeking_general_contractor",
  "open_to_joint_venture",
  "accept_institutional_investment",
  "match_long_term_hold_investors",
  "vessel_promote_project",
  "custom_project_website",
  "schedule_investor_webinar",
  "automated_investor_inquiries"
];

const mainFields = [
  { key: "project_name", label: "Project Name" },
  { key: "project_type", label: "Project Type" },
  { key: "project_city", label: "City" },
  { key: "project_state", label: "State" },
  { key: "project_zip", label: "ZIP Code" },
  { key: "short_summary", label: "Summary" },
  { key: "current_development_stage", label: "Development Stage" },
  { key: "total_project_cost", label: "Total Project Cost" }
];

const extraFields = projectFields.filter(
  (field) => !mainFields.some((main) => main.key === field.key)
);

const formatValue = (value, key) => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (value === null || value === undefined || value === "") {
    if (booleanFields.includes(key)) return "No";
    return "N/A";
  }
  if (["total_project_cost", "funding_secured", "capital_still_needed", "projected_annual_yield"].includes(key)) {
    return `$${parseFloat(value).toLocaleString()}`;
  }
  return value;
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [showExtra, setShowExtra] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    api.get(`/project/${projectId}`)
      .then((response) => {
        console.log("Fetched project:", response.data);
        setProject(response.data);
      })
      .catch((err) => {
        console.error("Error fetching project details:", err.response?.data || err);
        setError("Failed to load project details.");
      });
  }, [projectId]);

  // Delete handler for project
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/project/${projectId}`); // use plural "projects" to match the backend
      navigate("/my-projects");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
    }
  };
  

  if (error) {
    return <div className="project-detail-error">{error}</div>;
  }

  if (!project) {
    return <div className="project-detail-loading">Loading project details...</div>;
  }

  const projectImage = project.upload_media_renderings ? project.upload_media_renderings : defaultProjectImage;

  return (
    <div className="project-detail-page">
      <NavigationBar />
      <div className="project-detail-container">
        <div className="project-detail-header">
          <h1>{project.project_name}</h1>
          <p className="project-address">
            {project.project_city}, {project.project_state} {project.project_zip}
          </p>
        </div>
        <div className="project-detail-main">
          <div className="project-image-container">
            <img
              src={projectImage}
              alt={project.project_name}
              className="project-detail-image"
            />
          </div>
          <div className="project-info-container">
            {mainFields.map((field) => (
              <div key={field.key} className="project-info-item">
                <span className="info-label">{field.label}:</span>
                <span className="info-value">{formatValue(project[field.key], field.key)}</span>
              </div>
            ))}
          </div>
          {showExtra && (
            <div className="project-info-extra">
              {extraFields.map((field) => (
                <div key={field.key} className="project-info-row">
                  <span className="info-label">{field.label}:</span>
                  <span className="info-value">{formatValue(project[field.key], field.key)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="project-detail-actions">
          {user && project.user_id === user.user_id && (
            <>
              <button className="edit-btn" onClick={() => navigate(`/project/${projectId}/edit`)}>
                Edit Project
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete Project
              </button>
            </>
          )}
          <button className="show-btn" onClick={() => setShowExtra((prev) => !prev)}>
            {showExtra ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
