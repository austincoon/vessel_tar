import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "./AuthContext";
import NavigationBar from "./components/navigationBar";
import "./AddPropertyForm.css";

const AddPropertyForm = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Watch fields for conditional rendering
  const watchPriceUponRequest = watch("price_upon_request");
  const watchIncentives = watch("incentives_offered");
  const watchSmartKitchen = watch("smart_kitchen");
  const watchAgent = watch("are_you_working_with_agent");
  const watchGarage = watch("garage");
  const watchFencedYard = watch("fenced_yard");
  const watchHomeOffice = watch("home_office_space");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Convert string numbers to numbers
    const totalBedrooms = data.total_bedrooms ? parseInt(data.total_bedrooms) : null;
    const totalBathrooms = data.total_bathrooms ? parseInt(data.total_bathrooms) : null;
    const yearBuilt = data.year_built ? parseInt(data.year_built) : null;
    const numberOfOffices = watchHomeOffice ? (data.number_of_offices ? parseInt(data.number_of_offices) : 0) : 0;
    const garageCapacity = watchGarage ? (data.garage_capacity ? parseInt(data.garage_capacity) : null) : null;

    const payload = {
      user_id: user.user_id,
      // STEP 1: Basic Property Information
      title: data.title,
      property_type: data.property_type,
      listing_type: data.listing_type,
      price: data.price_upon_request ? null : parseFloat(data.price) || null,
      price_upon_request: data.price_upon_request ? 1 : 0,
      property_status: data.property_status,
      price_negotiable: data.price_negotiable ? 1 : 0,
      address: data.address,
      property_size: data.property_size ? parseFloat(data.property_size) : null,
      lot_size: data.lot_size ? parseFloat(data.lot_size) : null,
      year_built: yearBuilt,
      zoning_type: data.zoning_type,
      // STEP 2: Buyer Preferences & Smart Pairing Questions
      ideal_buyer_type:
        data.ideal_buyer_type && data.ideal_buyer_type.trim() !== ""
          ? data.ideal_buyer_type
          : null,
      financing_options: data.financing_options ? 1 : 0,
      seller_financing: data.seller_financing ? 1 : 0,
      cryptocurrency_accepted: data.cryptocurrency_accepted ? 1 : 0,
      pre_inspection_report: data.pre_inspection_report ? 1 : 0,
      contingent_offers: data.contingent_offers ? 1 : 0,
      incentives: data.incentives_offered ? (data.incentives_details || "") : null,
      // STEP 3: Interior Features & Details
      total_bedrooms: totalBedrooms,
      total_bathrooms: totalBathrooms,
      primary_bedroom_location:
        data.primary_bedroom_location && data.primary_bedroom_location.trim() !== ""
          ? data.primary_bedroom_location
          : null,
      open_floor_plan: data.open_floor_plan ? 1 : 0,
      walk_in_closets: data.walk_in_closets ? 1 : 0,
      basement: data.basement || null,
      multiple_living_spaces: data.multiple_living_spaces ? 1 : 0,
      // Kitchen
      kitchen_countertop_material: data.kitchen_countertop_material || null,
      cabinet_type: data.cabinet_type || null,
      kitchen_appliances_included: data.kitchen_appliances_included ? 1 : 0,
      walk_in_pantry: data.walk_in_pantry ? 1 : 0,
      island_or_bar_seating: data.island_or_bar_seating ? 1 : 0,
      smart_kitchen_features:
        data.smart_kitchen && data.smart_kitchen_features
          ? data.smart_kitchen_features
          : null,
      // Bathrooms
      primary_bathroom_features: data.primary_bathroom_features || null,
      faucet_finish: data.faucet_finish || null,
      smart_mirrors_or_toilets: data.smart_mirrors_or_toilets ? 1 : 0,
      bidet_installed: data.bidet_installed ? 1 : 0,
      // Living Areas
      fireplace: data.fireplace || "None",
      flooring_type: data.flooring_type || null,
      smart_lighting: data.smart_lighting ? 1 : 0,
      pre_wired_surround_sound: data.pre_wired_surround_sound ? 1 : 0,
      ceiling_height: data.ceiling_height || null,
      windows: data.windows || null,
      built_in_shelving: data.built_in_shelving ? 1 : 0,
      home_office_spaces: numberOfOffices,
      // STEP 4: Exterior & Outdoor Features
      garage: data.garage ? 1 : 0,
      garage_capacity: garageCapacity,
      driveway_type: data.driveway_type || null,
      front_yard_landscaping: data.front_yard_landscaping || null,
      outdoor_living_spaces: data.outdoor_living_spaces || null,
      pool_or_hot_tub: data.pool_or_hot_tub ? 1 : 0,
      fenced_yard: data.fenced_yard ? 1 : 0,
      fence_type: watchFencedYard ? data.fence_type || null : null,
      outdoor_lighting: data.outdoor_lighting || "None",
      garden_greenhouse_orchard: data.garden_greenhouse_orchard ? 1 : 0,
      sprinkler_system: data.sprinkler_system ? 1 : 0,
      solar_panels: data.solar_panels ? 1 : 0,
      ev_charging_station: data.ev_charging_station ? 1 : 0,
      rooftop_deck: data.rooftop_deck ? 1 : 0,
      // STEP 5: Utilities & Systems
      heating_system: data.heating_system || null,
      cooling_system: data.cooling_system || null,
      water_heater_type: data.water_heater_type || null,
      smart_thermostat: data.smart_thermostat ? 1 : 0,
      security_system: data.security_system ? 1 : 0,
      security_features: data.security_features || null,
      fiber_internet: data.fiber_internet ? 1 : 0,
      backup_generator: data.backup_generator ? 1 : 0,
      septic_or_sewer: data.septic_or_sewer || null,
      // STEP 6: Neighborhood & Location Details
      school_district: data.school_district || null,
      nearby_public_transit: data.nearby_public_transit ? 1 : 0,
      walkability_score: data.walkability_score || null,
      bike_friendly: data.bike_friendly ? 1 : 0,
      hoa_fees: data.hoa_fees ? parseFloat(data.hoa_fees) : null,
      community_amenities: data.community_amenities || null,
      gated_community: data.gated_community ? 1 : 0,
      noise_level: data.noise_level || null,
      crime_rate: data.crime_rate || null,
      safety_features: data.safety_features || null,
      // STEP 7: Investment & Income Potential
      rental_income_property: data.rental_income_property ? 1 : 0,
      projected_monthly_rental_income: data.projected_monthly_rental_income
        ? parseFloat(data.projected_monthly_rental_income)
        : null,
      short_term_rental_allowed: data.short_term_rental_allowed ? 1 : 0,
      occupancy_status: data.occupancy_status || null,
      adu_or_guest_house: data.adu_or_guest_house ? 1 : 0,
      recently_appraised: data.recently_appraised ? 1 : 0,
      appraisal_value: data.appraisal_value ? parseFloat(data.appraisal_value) : null,
      // STEP 8: Media Uploads (Placeholder)
      media_photos: data.media_photos?.length
        ? Array.from(data.media_photos).map((file) => file.name)
        : null,
      media_video: data.media_video?.length ? data.media_video[0].name : null,
      media_floor_plans: data.media_floor_plans?.length ? data.media_floor_plans[0].name : null,
      media_3d_tour: data.media_3d_tour?.length ? data.media_3d_tour[0].name : null,
      // STEP 9: Final Details
      featured_listing: data.featured_listing ? 1 : 0,
      are_you_working_with_agent: data.are_you_working_with_agent ? 1 : 0,
      agent_name: watchAgent ? data.agent_name || null : null,
      agent_contact: watchAgent ? data.agent_contact || null : null,
      best_contact_method: data.best_contact_method || null,
      additional_notes: data.additional_notes || null,
      marketing_services_needed: data.marketing_services_needed ? 1 : 0,
    };

    try {
      await axios.post("http://localhost:8000/properties/", payload);
      setSuccess("Property created successfully!");
      reset();
      setStep(1);
    } catch (err) {
      console.error("Error creating property:", err);
      setError("Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    
    <div className="add-property-form">
      <NavigationBar />
      <h2>Add New Property</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: Basic Property Information */}
        {step === 1 && (
          <div className="form-step">
            <h3>1. Basic Property Information</h3>
            <label>
              Property Title <span className="required">*</span>
              <input {...register("title")} placeholder="e.g. Luxury Modern Home with Pool" required />
            </label>
            <label>
              Property Type <span className="required">*</span>
              <select {...register("property_type")} required>
                <option value="">Select Property Type</option>
                <option value="Single Family">Single Family</option>
                <option value="Multi-Family">Multi-Family</option>
                <option value="Townhome">Townhome</option>
                <option value="Condominium">Condominium</option>
                <option value="Manufactured Home">Manufactured Home</option>
                <option value="Luxury Estate">Luxury Estate</option>
                <option value="Fixer-Upper">Fixer-Upper</option>
                <option value="New Construction">New Construction</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                <option value="Mixed-Use">Mixed-Use</option>
              </select>
            </label>
            <label>
              Listing Type <span className="required">*</span>
              <select {...register("listing_type")} required>
                <option value="">Select Listing Type</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Lease-to-Own">Lease-to-Own</option>
                <option value="Off-Market">Off-Market</option>
                <option value="Auction">Auction</option>
              </select>
            </label>
            <label>
              <input type="checkbox" {...register("price_upon_request")} /> Price Upon Request?
            </label>
            {!watchPriceUponRequest && (
              <label>
                Exact Price <span className="required">*</span>
                <input {...register("price")} type="number" step="0.01" placeholder="Exact Price" />
              </label>
            )}
            <label>
              Property Status <span className="required">*</span>
              <select {...register("property_status")} required>
                <option value="">Select Property Status</option>
                <option value="New Listing">New Listing</option>
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
                <option value="Off-Market">Off-Market</option>
              </select>
            </label>
            <label>
              <input {...register("price_negotiable")} type="checkbox" /> Is the price negotiable?
            </label>
            <label>
              Property Address <span className="required">*</span>
              <input {...register("address")} placeholder="Property Address (Autofill w/ Google Maps)" required />
            </label>
            <label>
              Property Size (Sq Ft or Acres)
              <input {...register("property_size")} type="text" placeholder="Property Size" />
            </label>
            <label>
              Lot Size
              <input {...register("lot_size")} type="text" placeholder="Lot Size" />
            </label>
            <label>
              Year Built
              <input {...register("year_built")} type="number" placeholder="Year Built" />
            </label>
            <label>
              Zoning Type <span className="required">*</span>
              <select {...register("zoning_type")} required>
                <option value="">Select Zoning Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Mixed-Use">Mixed-Use</option>
              </select>
            </label>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 2: Buyer Preferences & Smart Pairing Questions */}
        {step === 2 && (
          <div className="form-step">
            <h3>2. Buyer Preferences & Smart Pairing Questions</h3>
            <label>
              Ideal Buyer Type:
              <select {...register("ideal_buyer_type")}>
                <option value="">Ideal Buyer Type</option>
                <option value="First-Time Homebuyer">First-Time Homebuyer</option>
                <option value="Family">Family</option>
                <option value="Investor">Investor</option>
                <option value="Luxury Buyer">Luxury Buyer</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Builder">Builder</option>
                <option value="Fix & Flip Investor">Fix & Flip Investor</option>
                <option value="Developer">Developer</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <input {...register("financing_options")} type="checkbox" /> Consider financing options?
            </label>
            <label>
              <input {...register("seller_financing")} type="checkbox" /> Open to seller financing?
            </label>
            <label>
              <input {...register("cryptocurrency_accepted")} type="checkbox" /> Accept cryptocurrency?
            </label>
            <label>
              <input {...register("pre_inspection_report")} type="checkbox" /> Pre-inspection report available?
            </label>
            <label>
              <input {...register("contingent_offers")} type="checkbox" /> Accept contingent offers?
            </label>
            <label>
              <input {...register("incentives_offered")} type="checkbox" /> Offer incentives?
            </label>
            {watchIncentives && (
              <label>
                Incentives Details:
                <textarea {...register("incentives_details")} placeholder="Describe any closing costs coverage, price reductions, etc." />
              </label>
            )}
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 3: Interior Features & Details */}
        {step === 3 && (
          <div className="form-step">
            <h3>3. Interior Features & Details</h3>
            <label>
              Total Bedrooms:
              <select {...register("total_bedrooms")}>
                <option value="">Total Bedrooms</option>
                {[...Array(11)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </label>
            <label>
              Total Bathrooms:
              <select {...register("total_bathrooms")}>
                <option value="">Total Bathrooms</option>
                {[...Array(11)].map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </label>
            <label>
              Primary Bedroom Location:
              <select {...register("primary_bedroom_location")}>
                <option value="">Primary Bedroom Location</option>
                <option value="Main Floor">Main Floor</option>
                <option value="Upper Floor">Upper Floor</option>
                <option value="Basement">Basement</option>
              </select>
            </label>
            <label>
              <input {...register("open_floor_plan")} type="checkbox" /> Open Floor Plan?
            </label>
            <label>
              <input {...register("walk_in_closets")} type="checkbox" /> Walk-in Closets?
            </label>
            <label>
              Basement:
              <select {...register("basement")}>
                <option value="">Is there a basement?</option>
                <option value="None">No</option>
                <option value="Finished">Finished</option>
                <option value="Unfinished">Unfinished</option>
              </select>
            </label>
            <label>
              <input {...register("multiple_living_spaces")} type="checkbox" /> Multiple living spaces?
            </label>
            <h4>Kitchen</h4>
            <label>
              Countertop Material:
              <select {...register("kitchen_countertop_material")}>
                <option value="">Countertop Material</option>
                <option value="Granite">Granite</option>
                <option value="Quartz">Quartz</option>
                <option value="Marble">Marble</option>
                <option value="Butcher Block">Butcher Block</option>
                <option value="Laminate">Laminate</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Cabinet Type:
              <select {...register("cabinet_type")}>
                <option value="">Cabinet Type</option>
                <option value="Shaker">Shaker</option>
                <option value="Flat-Panel">Flat-Panel</option>
                <option value="Glass-Front">Glass-Front</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <input {...register("kitchen_appliances_included")} type="checkbox" /> Kitchen Appliances Included?
            </label>
            <label>
              <input {...register("walk_in_pantry")} type="checkbox" /> Walk-In Pantry?
            </label>
            <label>
              <input {...register("island_or_bar_seating")} type="checkbox" /> Island or Bar Seating?
            </label>
            <label>
              <input {...register("smart_kitchen")} type="checkbox" /> Smart Kitchen? (Show features)
            </label>
            {watchSmartKitchen && (
              <label>
                Smart Kitchen Features:
                <textarea {...register("smart_kitchen_features")} placeholder="Describe any smart kitchen features" />
              </label>
            )}
            <h4>Bathrooms</h4>
            <label>
              Primary Bathroom Features:
              <textarea {...register("primary_bathroom_features")} placeholder="e.g. Double Vanity, Soaking Tub, Heated Floors" />
            </label>
            <label>
              Faucet Finish:
              <select {...register("faucet_finish")}>
                <option value="">Faucet Finish</option>
                <option value="Brushed Nickel">Brushed Nickel</option>
                <option value="Matte Black">Matte Black</option>
                <option value="Chrome">Chrome</option>
                <option value="Bronze">Bronze</option>
                <option value="Gold">Gold</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <input {...register("smart_mirrors_or_toilets")} type="checkbox" /> Smart Mirrors or Toilets?
            </label>
            <label>
              <input {...register("bidet_installed")} type="checkbox" /> Bidet Installed?
            </label>
            <h4>Living Areas</h4>
            <label>
              Fireplace:
              <select {...register("fireplace")}>
                <option value="None">No Fireplace</option>
                <option value="Gas">Gas</option>
                <option value="Wood Burning">Wood Burning</option>
              </select>
            </label>
            <label>
              Flooring Type:
              <select {...register("flooring_type")}>
                <option value="">Flooring Type</option>
                <option value="Hardwood">Hardwood</option>
                <option value="Tile">Tile</option>
                <option value="Carpet">Carpet</option>
                <option value="Vinyl">Vinyl</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <input {...register("smart_lighting")} type="checkbox" /> Smart Lighting?
            </label>
            <label>
              <input {...register("pre_wired_surround_sound")} type="checkbox" /> Pre-wired Surround Sound?
            </label>
            <label>
              Ceiling Height:
              <select {...register("ceiling_height")}>
                <option value="">Ceiling Height</option>
                <option value="Standard">Standard</option>
                <option value="High Ceilings">High Ceilings</option>
                <option value="Vaulted">Vaulted</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Windows (details):
              <input {...register("windows")} placeholder="e.g. Floor-to-Ceiling, Bay Windows, Skylights" />
            </label>
            <label>
              <input {...register("built_in_shelving")} type="checkbox" /> Built-in Shelving or Custom Millwork?
            </label>
            <label>
              <input {...register("home_office_space")} type="checkbox" /> Home Office Space?
            </label>
            {watchHomeOffice && (
              <label>
                Number of Offices:
                <input {...register("number_of_offices")} type="number" placeholder="Number of dedicated office spaces" />
              </label>
            )}
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 4: Exterior & Outdoor Features */}
        {step === 4 && (
          <div className="form-step">
            <h3>4. Exterior & Outdoor Features</h3>
            <label>
              <input {...register("garage")} type="checkbox" /> Garage?
            </label>
            {watchGarage && (
              <label>
                Garage Capacity:
                <input {...register("garage_capacity")} type="number" placeholder="Number of cars the garage fits" />
              </label>
            )}
            <label>
              Driveway Type:
              <select {...register("driveway_type")}>
                <option value="">Driveway Type</option>
                <option value="Concrete">Concrete</option>
                <option value="Paver">Paver</option>
                <option value="Gravel">Gravel</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Front Yard Landscaping:
              <select {...register("front_yard_landscaping")}>
                <option value="">Select Landscaping Type</option>
                <option value="Minimal">Minimal</option>
                <option value="Lush">Lush</option>
                <option value="Xeriscape">Xeriscape</option>
                <option value="Custom">Custom</option>
              </select>
            </label>
            <label>
              Outdoor Living Spaces:
              <input {...register("outdoor_living_spaces")} placeholder="e.g. Deck, Patio, etc." />
            </label>
            <label>
              <input {...register("pool_or_hot_tub")} type="checkbox" /> Pool or Hot Tub?
            </label>
            <label>
              <input {...register("fenced_yard")} type="checkbox" /> Fenced Yard?
            </label>
            {watchFencedYard && (
              <label>
                Fence Type:
                <input {...register("fence_type")} placeholder="Type of fence" />
              </label>
            )}
            <label>
              Outdoor Lighting:
              <select {...register("outdoor_lighting")}>
                <option value="None">No Outdoor Lighting</option>
                <option value="Standard">Standard</option>
                <option value="Smart">Smart</option>
              </select>
            </label>
            <label>
              <input {...register("garden_greenhouse_orchard")} type="checkbox" /> Garden/Greenhouse/Orchard?
            </label>
            <label>
              <input {...register("sprinkler_system")} type="checkbox" /> Sprinkler System Installed?
            </label>
            <label>
              <input {...register("solar_panels")} type="checkbox" /> Solar Panels Installed?
            </label>
            <label>
              <input {...register("ev_charging_station")} type="checkbox" /> EV Charging Station?
            </label>
            <label>
              <input {...register("rooftop_deck")} type="checkbox" /> Rooftop Deck?
            </label>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 5: Utilities & Systems */}
        {step === 5 && (
          <div className="form-step">
            <h3>5. Utilities & Systems</h3>
            <label>
              Heating System:
              <select {...register("heating_system")}>
                <option value="">Heating System</option>
                <option value="Forced Air">Forced Air</option>
                <option value="Radiant">Radiant</option>
                <option value="Geothermal">Geothermal</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Cooling System:
              <select {...register("cooling_system")}>
                <option value="">Cooling System</option>
                <option value="Central AC">Central AC</option>
                <option value="Mini-Split">Mini-Split</option>
                <option value="Evaporative">Evaporative</option>
                <option value="None">None</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Water Heater Type:
              <select {...register("water_heater_type")}>
                <option value="">Water Heater Type</option>
                <option value="Tank">Tank</option>
                <option value="Tankless">Tankless</option>
                <option value="Solar">Solar</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <input {...register("smart_thermostat")} type="checkbox" /> Smart Thermostat?
            </label>
            <label>
              <input {...register("security_system")} type="checkbox" /> Security System Installed?
            </label>
            <label>
              Security Features:
              <textarea {...register("security_features")} placeholder="e.g. cameras, motion sensors" />
            </label>
            <label>
              <input {...register("fiber_internet")} type="checkbox" /> Wired for Fiber Internet?
            </label>
            <label>
              <input {...register("backup_generator")} type="checkbox" /> Backup Generator or Battery Storage?
            </label>
            <label>
              Septic or Sewer:
              <select {...register("septic_or_sewer")}>
                <option value="">Septic or Sewer?</option>
                <option value="Septic">Septic</option>
                <option value="Sewer">Sewer</option>
                <option value="Unknown">Unknown</option>
              </select>
            </label>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 6: Neighborhood & Location Details */}
        {step === 6 && (
          <div className="form-step">
            <h3>6. Neighborhood & Location Details</h3>
            <label>
              School District & Nearby Schools:
              <input {...register("school_district")} placeholder="e.g. Central High" />
            </label>
            <label>
              <input {...register("nearby_public_transit")} type="checkbox" /> Nearby Public Transit?
            </label>
            <label>
              Walkability Score:
              <select {...register("walkability_score")}>
                <option value="">Walkability Score</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
            <label>
              <input {...register("bike_friendly")} type="checkbox" /> Bike-Friendly?
            </label>
            <label>
              HOA Fees:
              <input {...register("hoa_fees")} type="number" placeholder="Monthly HOA Fee" />
            </label>
            <label>
              Community Amenities:
              <textarea {...register("community_amenities")} placeholder="e.g. Pool, Clubhouse, Tennis" />
            </label>
            <label>
              <input {...register("gated_community")} type="checkbox" /> Gated Community?
            </label>
            <label>
              Noise Level:
              <select {...register("noise_level")}>
                <option value="">Noise Level</option>
                <option value="Quiet">Quiet</option>
                <option value="Medium">Medium</option>
                <option value="Busy Area">Busy Area</option>
              </select>
            </label>
            <label>
              Crime Rate:
              <select {...register("crime_rate")}>
                <option value="">Crime Rate</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label>
              Safety Features:
              <textarea {...register("safety_features")} placeholder="e.g. Security Patrols, Cameras" />
            </label>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 7: Investment & Income Potential */}
        {step === 7 && (
          <div className="form-step">
            <h3>7. Investment & Income Potential</h3>
            <label>
              <input {...register("rental_income_property")} type="checkbox" /> Rental Income Property?
            </label>
            <label>
              Projected Monthly Rental Income:
              <input {...register("projected_monthly_rental_income")} type="number" placeholder="e.g. 500" />
            </label>
            <label>
              <input {...register("short_term_rental_allowed")} type="checkbox" /> Short-Term Rental Allowed?
            </label>
            <label>
              Occupancy Status:
              <select {...register("occupancy_status")}>
                <option value="">Owner-Occupied or Tenant-Occupied?</option>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
                <option value="Vacant">Vacant</option>
              </select>
            </label>
            <label>
              <input {...register("adu_or_guest_house")} type="checkbox" /> ADU or Guest House?
            </label>
            <label>
              <input {...register("recently_appraised")} type="checkbox" /> Recently Appraised?
            </label>
            <label>
              Appraisal Value:
              <input {...register("appraisal_value")} type="number" placeholder="e.g. 120000" />
            </label>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 8: Media Uploads */}
        {step === 8 && (
          <div className="form-step">
            <h3>8. Media Uploads</h3>
            <label>
              Upload Photos (Multiple):
              <input {...register("media_photos")} type="file" multiple accept="image/*" />
            </label>
            <label>
              Upload Video Tour (Optional):
              <input {...register("media_video")} type="file" accept="video/*" />
            </label>
            <label>
              Upload Floor Plans (Optional):
              <input {...register("media_floor_plans")} type="file" accept="application/pdf,image/*" />
            </label>
            <label>
              Upload 3D Virtual Tour (Optional):
              <input {...register("media_3d_tour")} type="file" accept="video/*" />
            </label>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* STEP 9: Final Details */}
        {step === 9 && (
          <div className="form-step">
            <h3>9. Final Details</h3>
            <label>
              <input {...register("featured_listing")} type="checkbox" /> Feature this listing?
            </label>
            <label>
              <input {...register("are_you_working_with_agent")} type="checkbox" /> Working with an agent?
            </label>
            {watchAgent && (
              <>
                <label>
                  Agent Name:
                  <input {...register("agent_name")} placeholder="Agent Name" />
                </label>
                <label>
                  Agent Contact:
                  <input {...register("agent_contact")} placeholder="Agent Contact" />
                </label>
              </>
            )}
            <label>
              Best Contact Method <span className="required">*</span>
              <select {...register("best_contact_method")} required>
                <option value="">Select Contact Method</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Messenger">Messenger</option>
              </select>
            </label>
            <label>
              Additional Notes or Special Features:
              <textarea {...register("additional_notes")} placeholder="Additional Notes or Special Features" />
            </label>
            <label>
              <input {...register("marketing_services_needed")} type="checkbox" /> Need marketing services?
            </label>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm & Publish"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddPropertyForm;
