import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./AuthContext";
import NavigationBar from "./components/navigationBar";
import "./AddProjectForm.css";

const AddProjectForm = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Watch fields for conditional rendering
  const zoningSecured = watch("zoning_secured");
  const investorCapitalNeeded = watch("investor_capital_needed");
  const equityStructureAvailable = watch("equity_structure_available");
  const qualifiesForTaxIncentives = watch("qualifies_for_tax_incentives");
  const appraisalCompleted = watch("appraisal_completed");
  const financialProformaAvailable = watch("financial_proforma_available");
  const infrastructureAvailability = watch("infrastructure_availability");
  const environmentalSustainabilityFeatures = watch("environmental_sustainability_features");
  const seekingManagingPartner = watch("seeking_managing_partner");
  const seekingGeneralContractor = watch("seeking_general_contractor");
  const openToJointVenture = watch("open_to_joint_venture");
  const acceptInstitutionalInvestment = watch("accept_institutional_investment");
  const matchLongTermHoldInvestors = watch("match_long_term_hold_investors");
  const matchStructuredExitInvestors = watch("match_structured_exit_investors");

  // Step navigation handlers with per‑step validation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = [
        "project_name",
        "project_type",
        "project_city",
        "project_state",
        "project_zip",
        "short_summary",
        "current_development_stage",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["total_project_cost"];
    } else if (step === 6) {
      fieldsToValidate = ["project_owner_name", "preferred_contact_method"];
    }
    const valid = await trigger(fieldsToValidate);
    if (valid) {
      nextStep();
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Build payload with explicit type conversions
    const payload = {
      user_id: user.user_id,
      project_name: data.project_name,
      project_type: data.project_type,
      project_city: data.project_city,
      project_state: data.project_state,
      project_zip: data.project_zip,
      short_summary: data.short_summary,
      current_development_stage: data.current_development_stage,
      zoning_secured: !!data.zoning_secured,
      missing_approvals: data.missing_approvals || null,
      total_land_size: data.total_land_size ? parseFloat(data.total_land_size) : null,
      buildable_area: data.buildable_area ? parseFloat(data.buildable_area) : null,
      key_development_details: data.key_development_details || null,

      total_project_cost: data.total_project_cost ? parseFloat(data.total_project_cost) : 0,
      funding_secured: data.funding_secured ? parseFloat(data.funding_secured) : 0,
      capital_still_needed: data.capital_still_needed ? parseFloat(data.capital_still_needed) : null,
      investor_capital_needed: !!data.investor_capital_needed,
      investor_capital_amount: data.investor_capital_amount ? parseFloat(data.investor_capital_amount) : null,
      investor_capital_terms: data.investor_capital_terms || null,
      equity_structure_available: !!data.equity_structure_available,
      equity_structure_allocation: data.equity_structure_allocation || null,
      minimum_investment_ticket: data.minimum_investment_ticket || null,
      debt_vs_equity_structure: data.debt_vs_equity_structure || null,
      projected_irr: data.projected_irr || null,
      target_hold_period: data.target_hold_period || null,
      projected_annual_yield: data.projected_annual_yield ? parseFloat(data.projected_annual_yield) : null,
      qualifies_for_tax_incentives: !!data.qualifies_for_tax_incentives,
      tax_incentives_specifics: data.tax_incentives_specifics || null,
      appraisal_completed: !!data.appraisal_completed,
      appraisal_document: data.appraisal_document ? data.appraisal_document[0]?.name : null,
      financial_proforma_available: !!data.financial_proforma_available,
      financial_proforma_document: data.financial_proforma_document ? data.financial_proforma_document[0]?.name : null,

      construction_license: data.construction_license,
      contractor_secured: !!data.contractor_secured,
      total_buildable_area: data.total_buildable_area ? parseFloat(data.total_buildable_area) : null,
      planned_units: data.planned_units ? parseInt(data.planned_units) : null,
      construction_type: data.construction_type || null,
      land_acquisition_status: data.land_acquisition_status || null,
      infrastructure_availability: !!data.infrastructure_availability,
      missing_infrastructure: data.missing_infrastructure || null,
      environmental_sustainability_features: !!data.environmental_sustainability_features,
      sustainability_features: data.sustainability_features || null,
      planned_amenities: data.planned_amenities || null,
      project_strategy: data.project_strategy || null,
      projected_leaseup_period: data.projected_leaseup_period || null,

      seeking_managing_partner: !!data.seeking_managing_partner,
      managing_partner_responsibilities: data.managing_partner_responsibilities || null,
      seeking_general_contractor: !!data.seeking_general_contractor,
      general_contractor_requirements: data.general_contractor_requirements || null,
      open_to_joint_venture: !!data.open_to_joint_venture,
      joint_venture_terms: data.joint_venture_terms || null,
      accept_institutional_investment: !!data.accept_institutional_investment,
      institutional_investment_options: data.institutional_investment_options || null,
      match_long_term_hold_investors: !!data.match_long_term_hold_investors,
      desired_hold_period: data.desired_hold_period || null,
      match_structured_exit_investors: !!data.match_structured_exit_investors,
      exit_triggers: data.exit_triggers || null,

      vessel_promote_project: !!data.vessel_promote_project,
      custom_project_website: !!data.custom_project_website,
      schedule_investor_webinar: !!data.schedule_investor_webinar,

      upload_media_renderings: data.upload_media_renderings && data.upload_media_renderings.length > 0
        ? data.upload_media_renderings[0].name
        : null,
      upload_pitch_deck: data.upload_pitch_deck && data.upload_pitch_deck.length > 0
        ? data.upload_pitch_deck[0].name
        : null,
      virtual_tour_link: data.virtual_tour_link && data.virtual_tour_link.length > 0
        ? data.virtual_tour_link[0].name
        : null,
      upload_legal_documents: data.upload_legal_documents && data.upload_legal_documents.length > 0
        ? data.upload_legal_documents[0].name
        : null,

      project_owner_name: data.project_owner_name,
      company_name: data.company_name || null,
      preferred_contact_method: data.preferred_contact_method,
      automated_investor_inquiries: !!data.automated_investor_inquiries,
    };

    try {
      await axios.post("http://localhost:8000/projects/", payload);
      setSuccess("Project created successfully!");
      reset();
      setStep(1);
    } catch (err) {
      console.error("Error creating project:", err.response?.data || err);
      setError("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-project-form">
      <NavigationBar />
      <h2>Add New Project</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Project Overview */}
        {step === 1 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">1</div>
              <h3>Project Overview</h3>
            </div>
            <label>
              Project Name <span className="required">*</span>:
              <input {...register("project_name", { required: true })} placeholder="e.g., Skyline Tower - 250-Unit High-Rise in Miami" />
            </label>
            <label>
              Project Type <span className="required">*</span>:
              <select {...register("project_type", { required: true })}>
                <option value="">Select Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Mixed-Use">Mixed-Use</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Industrial">Industrial</option>
                <option value="Land Development">Land Development</option>
                <option value="Redevelopment">Redevelopment</option>
                <option value="Specialty Asset">Specialty Asset</option>
              </select>
            </label>
            <label>
              Project Location <span className="required">*</span>:
              <input {...register("project_city", { required: true })} placeholder="City" />
              <input {...register("project_state", { required: true })} placeholder="State" />
              <input {...register("project_zip", { required: true })} placeholder="ZIP Code" />
            </label>
            <label>
              Short Project Summary <span className="required">*</span> (max 250 characters):
              <textarea {...register("short_summary", { required: true, maxLength: 250 })} placeholder="Enter a concise overview" />
            </label>
            <label>
              Current Development Stage <span className="required">*</span>:
              <select {...register("current_development_stage", { required: true })}>
                <option value="">Select Stage</option>
                <option value="Pre-Development">Pre-Development</option>
                <option value="Permitting">Permitting</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Near Completion">Near Completion</option>
                <option value="Stabilized Asset">Stabilized Asset</option>
              </select>
            </label>
            <label>
              Has zoning and permitting been secured?:
              <input type="checkbox" {...register("zoning_secured")} />
            </label>
            {!zoningSecured && (
              <label>
                Missing Approvals:
                <select {...register("missing_approvals")}>
                  <option value="">Select missing approval</option>
                  <option value="Land Use">Land Use</option>
                  <option value="Building">Building</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            )}
            <label>
              Total Land Size (Acres):
              <input type="number" step="0.01" {...register("total_land_size")} placeholder="Acres" />
            </label>
            <label>
              Buildable Area (sqft):
              <input type="number" {...register("buildable_area")} placeholder="Square Feet" />
            </label>
            <label>
              Key Development Details:
              <select {...register("key_development_details")}>
                <option value="">Select Details</option>
                <option value="High-Rise">High-Rise</option>
                <option value="Mid-Rise">Mid-Rise</option>
                <option value="Subdivision">Subdivision</option>
                <option value="Office Tower">Office Tower</option>
                <option value="Retail Plaza">Retail Plaza</option>
                <option value="Hotel">Hotel</option>
                <option value="Industrial Park">Industrial Park</option>
              </select>
            </label>
            <div className="form-navigation">
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {/* Step 2: Financial & Investment Structure */}
        {step === 2 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">2</div>
              <h3>Financial & Investment Structure</h3>
            </div>
            <label>
              Total Project Cost ($USD) <span className="required">*</span>:
              <input type="number" step="0.01" {...register("total_project_cost", { required: true })} />
            </label>
            <label>
              Funding Secured to Date ($USD):
              <input type="number" step="0.01" {...register("funding_secured")} />
            </label>
            <label>
              Total Capital Still Needed:
              <input type="number" step="0.01" {...register("capital_still_needed")} placeholder="Auto-calculated" />
            </label>
            <label>
              Investor Capital Needed?:
              <input type="checkbox" {...register("investor_capital_needed")} />
            </label>
            {investorCapitalNeeded && (
              <>
                <label>
                  Investor Capital Amount:
                  <input type="number" step="0.01" {...register("investor_capital_amount")} />
                </label>
                <label>
                  Investor Capital Terms:
                  <input {...register("investor_capital_terms")} placeholder="Equity, Preferred Return %, Profit Split, etc." />
                </label>
              </>
            )}
            <label>
              Equity Structure Available for Investors?:
              <input type="checkbox" {...register("equity_structure_available")} />
            </label>
            {equityStructureAvailable && (
              <label>
                Equity Structure Allocation:
                <select {...register("equity_structure_allocation")}>
                  <option value="">Select Allocation</option>
                  <option value="Common Equity">Common Equity</option>
                  <option value="Preferred Equity">Preferred Equity</option>
                  <option value="Convertible Notes">Convertible Notes</option>
                </select>
              </label>
            )}
            <label>
              Minimum Investment Ticket Size:
              <select {...register("minimum_investment_ticket")}>
                <option value="">Select Option</option>
                <option value="$100k-$250k">$100k-$250k</option>
                <option value="$250k-$1M">$250k-$1M</option>
                <option value="$1M-$5M">$1M-$5M</option>
                <option value="$5M+">$5M+</option>
                <option value="Open to Syndication">Open to Syndication</option>
              </select>
            </label>
            <label>
              Debt vs. Equity Structure:
              <select {...register("debt_vs_equity_structure")}>
                <option value="">Select Option</option>
                <option value="Senior Debt">Senior Debt</option>
                <option value="Mezzanine">Mezzanine</option>
                <option value="Joint Venture">Joint Venture</option>
                <option value="Syndication">Syndication</option>
                <option value="No Preference">No Preference</option>
              </select>
            </label>
            <label>
              Projected IRR:
              <select {...register("projected_irr")}>
                <option value="">Select Option</option>
                <option value="8-12%">8-12%</option>
                <option value="12-18%">12-18%</option>
                <option value="18-25%">18-25%</option>
                <option value="25%+">25%+</option>
              </select>
            </label>
            <label>
              Target Hold Period:
              <select {...register("target_hold_period")}>
                <option value="">Select Option</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5-10 Years">5-10 Years</option>
                <option value="Open-Ended">Open-Ended</option>
                <option value="Immediate Exit Strategy Available">Immediate Exit Strategy Available</option>
              </select>
            </label>
            <label>
              Projected Annual Yield / Cash Flow (%):
              <input type="number" step="0.01" {...register("projected_annual_yield")} />
            </label>
            <label>
              Does the project qualify for tax incentives?:
              <input type="checkbox" {...register("qualifies_for_tax_incentives")} />
            </label>
            {qualifiesForTaxIncentives && (
              <label>
                Tax Incentives Specifics:
                <input {...register("tax_incentives_specifics")} placeholder="e.g., Opportunity Zone, Historic Tax Credits, etc." />
              </label>
            )}
            <label>
              Appraisal Completed?:
              <input type="checkbox" {...register("appraisal_completed")} />
            </label>
            {appraisalCompleted && (
              <label>
                Upload Appraisal Document:
                <input type="file" {...register("appraisal_document")} />
              </label>
            )}
            <label>
              Financial Proforma Available?:
              <input type="checkbox" {...register("financial_proforma_available")} />
            </label>
            {financialProformaAvailable && (
              <label>
                Upload Financial Proforma:
                <input type="file" {...register("financial_proforma_document")} />
              </label>
            )}
            <div className="form-navigation">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {/* Step 3: Development & Construction Details */}
        {step === 3 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">3</div>
              <h3>Development & Construction Details</h3>
            </div>
            <label>
              Construction License <span className="required">*</span>:
              <select {...register("construction_license", { required: true })}>
                <option value="">Select License</option>
                <option value="Residential License">Residential License</option>
                <option value="Commercial License">Commercial License</option>
                <option value="Both">Both</option>
                <option value="Neither">Neither</option>
              </select>
            </label>
            <label>
              Is a licensed general contractor secured?:
              <input type="checkbox" {...register("contractor_secured")} />
            </label>
            <label>
              Total Buildable Area:
              <input type="number" {...register("total_buildable_area")} placeholder="Buildable Area" />
            </label>
            <label>
              Planned Number of Units/Lots:
              <input type="number" {...register("planned_units")} placeholder="Units/Lots" />
            </label>
            <label>
              Construction Type:
              <select {...register("construction_type")}>
                <option value="">Select Type</option>
                <option value="New Development">New Development</option>
                <option value="Value-Add">Value-Add</option>
                <option value="Expansion">Expansion</option>
                <option value="Redevelopment">Redevelopment</option>
                <option value="Adaptive Reuse">Adaptive Reuse</option>
                <option value="Mixed-Use">Mixed-Use</option>
              </select>
            </label>
            <label>
              Land Acquisition Status:
              <select {...register("land_acquisition_status")}>
                <option value="">Select Status</option>
                <option value="Acquired">Acquired</option>
                <option value="Under Contract">Under Contract</option>
                <option value="Negotiating">Negotiating</option>
                <option value="Seeking Land">Seeking Land</option>
              </select>
            </label>
            <label>
              Infrastructure Availability:
              <input type="checkbox" {...register("infrastructure_availability")} />
            </label>
            {!infrastructureAvailability && (
              <label>
                Missing Infrastructure:
                <input {...register("missing_infrastructure")} placeholder="e.g., Roads, Water, Sewer, Fiber Optics" />
              </label>
            )}
            <label>
              Environmental & Sustainability Features:
              <input type="checkbox" {...register("environmental_sustainability_features")} />
            </label>
            {environmentalSustainabilityFeatures && (
              <label>
                Sustainability Features:
                <select {...register("sustainability_features")}>
                  <option value="">Select Feature</option>
                  <option value="LEED">LEED</option>
                  <option value="Net Zero">Net Zero</option>
                  <option value="Passive House">Passive House</option>
                  <option value="EV Chargers">EV Chargers</option>
                  <option value="Solar">Solar</option>
                  <option value="Smart Building Tech">Smart Building Tech</option>
                </select>
              </label>
            )}
            <label>
              Planned Amenities (comma-separated):
              <input {...register("planned_amenities")} placeholder="Concierge, Pool, Gym, Retail, Conference Spaces, Security" />
            </label>
            <label>
              Project Strategy:
              <select {...register("project_strategy")}>
                <option value="">Select Strategy</option>
                <option value="BTR">Build-to-Rent (BTR)</option>
                <option value="BTS">Build-to-Sell (BTS)</option>
                <option value="Condo Sales">Condo Sales</option>
                <option value="Mixed Strategy">Mixed Strategy</option>
              </select>
            </label>
            <label>
              Projected Lease-Up Period:
              <select {...register("projected_leaseup_period")}>
                <option value="">Select Period</option>
                <option value="Under 6 Months">Under 6 Months</option>
                <option value="6-12 Months">6-12 Months</option>
                <option value="12+ Months">12+ Months</option>
              </select>
            </label>
            <div className="form-navigation">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {/* Step 4: Partnership, Marketing & Contact */}
        {step === 4 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">4</div>
              <h3>Partnership, Marketing & Contact</h3>
            </div>
            <label>
              Are you seeking a Managing Partner?:
              <input type="checkbox" {...register("seeking_managing_partner")} />
            </label>
            {seekingManagingPartner && (
              <label>
                Managing Partner Responsibilities:
                <input {...register("managing_partner_responsibilities")} placeholder="e.g., Lead Developer, Asset Manager, etc." />
              </label>
            )}
            <label>
              Are you seeking a General Contractor or Developer?:
              <input type="checkbox" {...register("seeking_general_contractor")} />
            </label>
            {seekingGeneralContractor && (
              <label>
                General Contractor Requirements:
                <input {...register("general_contractor_requirements")} placeholder="e.g., Union/Non-Union, Local vs. National, etc." />
              </label>
            )}
            <label>
              Are you open to Joint Venture structures?:
              <input type="checkbox" {...register("open_to_joint_venture")} />
            </label>
            {openToJointVenture && (
              <label>
                Joint Venture Terms:
                <input {...register("joint_venture_terms")} placeholder="e.g., 50/50, 60/40, Minority Stake, etc." />
              </label>
            )}
            <label>
              Would you accept institutional investment?:
              <input type="checkbox" {...register("accept_institutional_investment")} />
            </label>
            {acceptInstitutionalInvestment && (
              <label>
                Institutional Investment Options:
                <input {...register("institutional_investment_options")} placeholder="e.g., Private Equity, REITs, Family Offices, etc." />
              </label>
            )}
            <label>
              Would you like to be matched with long-term hold investors?:
              <input type="checkbox" {...register("match_long_term_hold_investors")} />
            </label>
            {matchLongTermHoldInvestors && (
              <label>
                Desired Hold Period:
                <input {...register("desired_hold_period")} placeholder="e.g., 5-10 Years, 10-20 Years, Perpetual Hold" />
              </label>
            )}
            <label>
              Would you like to be matched with investors open to structured exits?:
              <input type="checkbox" {...register("match_structured_exit_investors")} />
            </label>
            {matchStructuredExitInvestors && (
              <label>
                Exit Triggers:
                <input {...register("exit_triggers")} placeholder="e.g., 5-Year Sale, Refinancing, Buyout Option, etc." />
              </label>
            )}
            <label>
              Do you want Vessel to promote this project?:
              <input type="checkbox" {...register("vessel_promote_project")} />
            </label>
            <label>
              Would you like a custom-built project website?:
              <input type="checkbox" {...register("custom_project_website")} />
            </label>
            <label>
              Would you like to schedule a live investor webinar?:
              <input type="checkbox" {...register("schedule_investor_webinar")} />
            </label>
            <div className="form-navigation">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {/* Step 5: Project Media & Documentation */}
        {step === 5 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">5</div>
              <h3>Project Media & Documentation</h3>
            </div>
            <label>
              Upload Renderings, Floor Plans, or Site Plans:
              <input type="file" {...register("upload_media_renderings")} />
            </label>
            <label>
              Upload Full Investor Pitch Deck:
              <input type="file" {...register("upload_pitch_deck")} />
            </label>
            <label>
              Link to Virtual Tour (if available):
              <input {...register("virtual_tour_link")} placeholder="URL to virtual tour" />
            </label>
            <label>
              Upload Legal & Regulatory Documents:
              <input type="file" {...register("upload_legal_documents")} />
            </label>
            <div className="form-navigation">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}
        {/* Step 6: Contact & Submission Details */}
        {step === 6 && (
          <div className="form-step">
            <div className="step-header">
              <div className="step-number">6</div>
              <h3>Contact & Submission Details</h3>
            </div>
            <label>
              Project Owner / Managing Partner Name <span className="required">*</span>:
              <input {...register("project_owner_name", { required: true })} />
            </label>
            <label>
              Company Name:
              <input {...register("company_name")} />
            </label>
            <label>
              Preferred Contact Method <span className="required">*</span>:
              <select {...register("preferred_contact_method", { required: true })}>
                <option value="">Select Contact Method</option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Direct Messages">Direct Messages</option>
              </select>
            </label>
            <label>
              Investor Inquiries - Automated Matching?:
              <input type="checkbox" {...register("automated_investor_inquiries")} />
            </label>
            <div className="form-navigation">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Project"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProjectForm;
