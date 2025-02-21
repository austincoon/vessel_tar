# schemas.py
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserResponse(BaseModel):
    user_id: int
    email: str
    firstName: Optional[str] = ""
    lastName: Optional[str] = ""
    profileImage: Optional[str] = ""
    role: Optional[str] = ""
    phoneNumber: Optional[str] = ""  # Ensure this field is included
    city: Optional[str] = ""
    state: Optional[str] = ""
    vesselRating: Optional[float] = None
    createdAt: Optional[str] = ""

    class Config:
        orm_mode = True

class UserProfileResponse(BaseModel):
    bio: Optional[str] = ""
    education: Optional[str] = ""
    experience: Optional[str] = ""
    investmentInterests: Optional[str] = ""
    portfolioOverview: Optional[str] = ""
    investmentStrategy: Optional[str] = ""
    testimonials: Optional[str] = ""
    media: Optional[str] = ""

    class Config:
        orm_mode = True



class UserUpdate(BaseModel):
    email: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    profileImage: Optional[str] = None
    phoneNumber: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    vesselRating: Optional[float] = None

class UserProfileUpdate(BaseModel):
    bio: Optional[str] = None
    education: Optional[str] = None
    experience: Optional[str] = None
    investmentInterests: Optional[str] = None
    portfolioOverview: Optional[str] = None
    investmentStrategy: Optional[str] = None
    testimonials: Optional[str] = None
    media: Optional[str] = None


class PropertyCreate(BaseModel):
    user_id: int
    title: str
    property_type: str
    listing_type: str
    price: Optional[float] = None
    price_negotiable: bool = False
    property_status: str
    address: str
    property_size: Optional[float] = None
    lot_size: Optional[float] = None
    year_built: Optional[int] = None
    zoning_type: str
    ideal_buyer_type: Optional[str] = None
    financing_options: bool = False
    seller_financing: bool = False
    cryptocurrency_accepted: bool = False
    pre_inspection_report: bool = False
    contingent_offers: bool = False
    incentives: Optional[str] = None
    total_bedrooms: Optional[int] = None
    total_bathrooms: Optional[int] = None
    primary_bedroom_location: Optional[str] = None
    open_floor_plan: bool = False
    walk_in_closets: bool = False
    basement: Optional[str] = None
    multiple_living_spaces: bool = False
    kitchen_countertop_material: Optional[str] = None
    cabinet_type: Optional[str] = None
    kitchen_appliances_included: bool = False
    walk_in_pantry: bool = False
    island_or_bar_seating: bool = False
    smart_kitchen_features: Optional[str] = None
    primary_bathroom_features: Optional[str] = None
    faucet_finish: Optional[str] = None
    smart_mirrors_or_toilets: bool = False
    bidet_installed: bool = False
    fireplace: Optional[str] = None
    flooring_type: Optional[str] = None
    smart_lighting: bool = False
    pre_wired_surround_sound: bool = False
    ceiling_height: Optional[str] = None
    windows: Optional[str] = None
    built_in_shelving: bool = False
    home_office_spaces: Optional[int] = None
    garage: bool = False
    garage_capacity: Optional[int] = None
    driveway_type: Optional[str] = None
    front_yard_landscaping: Optional[str] = None
    outdoor_living_spaces: Optional[str] = None
    pool_or_hot_tub: bool = False
    fenced_yard: bool = False
    fence_type: Optional[str] = None
    outdoor_lighting: Optional[str] = None
    garden_greenhouse_orchard: bool = False
    sprinkler_system: bool = False
    solar_panels: bool = False
    ev_charging_station: bool = False
    rooftop_deck: bool = False
    heating_system: Optional[str] = None
    cooling_system: Optional[str] = None
    water_heater_type: Optional[str] = None
    smart_thermostat: bool = False
    security_system: bool = False
    security_features: Optional[str] = None
    fiber_internet: bool = False
    backup_generator: bool = False
    septic_or_sewer: Optional[str] = None
    school_district: Optional[str] = None
    nearby_public_transit: bool = False
    walkability_score: Optional[str] = None
    bike_friendly: bool = False
    hoa_fees: Optional[float] = None
    community_amenities: Optional[str] = None
    gated_community: bool = False
    noise_level: Optional[str] = None
    crime_rate: Optional[str] = None
    safety_features: Optional[str] = None
    rental_income_property: bool = False
    projected_monthly_rental_income: Optional[float] = None
    short_term_rental_allowed: bool = False
    occupancy_status: Optional[str] = None
    adu_or_guest_house: bool = False
    recently_appraised: bool = False
    appraisal_value: Optional[float] = None
    featured_listing: bool = False
    agent_name: Optional[str] = None
    agent_contact: Optional[str] = None
    best_contact_method: Optional[str] = None
    additional_notes: Optional[str] = None
    marketing_services_needed: bool = False


class PropertyImageResponse(BaseModel):
    image_id: int
    image_url: str

    class Config:
        orm_mode = True

class PropertyResponse(BaseModel):
    property_id: int
    user_id: int
    title: str
    property_type: str
    listing_type: str
    price: Optional[float] = None
    price_negotiable: bool = False
    property_status: str
    address: str
    property_size: Optional[float] = None
    lot_size: Optional[float] = None
    year_built: Optional[int] = None
    zoning_type: str
    ideal_buyer_type: Optional[str] = None
    financing_options: bool = False
    seller_financing: bool = False
    cryptocurrency_accepted: bool = False
    pre_inspection_report: bool = False
    contingent_offers: bool = False
    incentives: Optional[str] = None
    total_bedrooms: Optional[int] = None
    total_bathrooms: Optional[int] = None
    primary_bedroom_location: Optional[str] = None
    open_floor_plan: bool = False
    walk_in_closets: bool = False
    basement: Optional[str] = None
    multiple_living_spaces: bool = False
    kitchen_countertop_material: Optional[str] = None
    cabinet_type: Optional[str] = None
    kitchen_appliances_included: bool = False
    walk_in_pantry: bool = False
    island_or_bar_seating: bool = False
    smart_kitchen_features: Optional[str] = None
    primary_bathroom_features: Optional[str] = None
    faucet_finish: Optional[str] = None
    smart_mirrors_or_toilets: bool = False
    bidet_installed: bool = False
    fireplace: Optional[str] = None
    flooring_type: Optional[str] = None
    smart_lighting: bool = False
    pre_wired_surround_sound: bool = False
    ceiling_height: Optional[str] = None
    windows: Optional[str] = None
    built_in_shelving: bool = False
    home_office_spaces: Optional[int] = None
    garage: bool = False
    garage_capacity: Optional[int] = None
    driveway_type: Optional[str] = None
    front_yard_landscaping: Optional[str] = None
    outdoor_living_spaces: Optional[str] = None
    pool_or_hot_tub: bool = False
    fenced_yard: bool = False
    fence_type: Optional[str] = None
    outdoor_lighting: Optional[str] = None
    garden_greenhouse_orchard: bool = False
    sprinkler_system: bool = False
    solar_panels: bool = False
    ev_charging_station: bool = False
    rooftop_deck: bool = False
    heating_system: Optional[str] = None
    cooling_system: Optional[str] = None
    water_heater_type: Optional[str] = None
    smart_thermostat: bool = False
    security_system: bool = False
    security_features: Optional[str] = None
    fiber_internet: bool = False
    backup_generator: bool = False
    septic_or_sewer: Optional[str] = None
    school_district: Optional[str] = None
    nearby_public_transit: bool = False
    walkability_score: Optional[str] = None
    bike_friendly: bool = False
    hoa_fees: Optional[float] = None
    community_amenities: Optional[str] = None
    gated_community: bool = False
    noise_level: Optional[str] = None
    crime_rate: Optional[str] = None
    safety_features: Optional[str] = None
    rental_income_property: bool = False
    projected_monthly_rental_income: Optional[float] = None
    short_term_rental_allowed: bool = False
    occupancy_status: Optional[str] = None
    adu_or_guest_house: bool = False
    recently_appraised: bool = False
    appraisal_value: Optional[float] = None
    featured_listing: bool = False
    agent_name: Optional[str] = None
    agent_contact: Optional[str] = None
    best_contact_method: Optional[str] = None
    additional_notes: Optional[str] = None
    marketing_services_needed: bool = False
    created_at: Optional[datetime] = None
    images: List[PropertyImageResponse] = []
    
    class Config:
        orm_mode = True


class PropertyImageCreate(BaseModel):
    image_url: str



class ProjectCreate(BaseModel):
    user_id: int
    project_name: str
    project_type: str
    project_city: str
    project_state: str
    project_zip: str
    short_summary: str
    current_development_stage: str
    zoning_secured: bool = False
    missing_approvals: Optional[str] = None
    total_land_size: Optional[float] = None
    buildable_area: Optional[float] = None
    key_development_details: Optional[str] = None

    total_project_cost: float
    funding_secured: Optional[float] = 0.0
    capital_still_needed: Optional[float] = None
    investor_capital_needed: bool = False
    investor_capital_amount: Optional[float] = None
    investor_capital_terms: Optional[str] = None
    equity_structure_available: bool = False
    equity_structure_allocation: Optional[str] = None
    minimum_investment_ticket: Optional[str] = None
    debt_vs_equity_structure: Optional[str] = None
    projected_irr: Optional[str] = None
    target_hold_period: Optional[str] = None
    projected_annual_yield: Optional[float] = None
    qualifies_for_tax_incentives: bool = False
    tax_incentives_specifics: Optional[str] = None
    appraisal_completed: bool = False
    appraisal_document: Optional[str] = None
    financial_proforma_available: bool = False
    financial_proforma_document: Optional[str] = None

    construction_license: str
    contractor_secured: bool = False
    total_buildable_area: Optional[float] = None
    planned_units: Optional[int] = None
    construction_type: Optional[str] = None
    land_acquisition_status: Optional[str] = None
    infrastructure_availability: bool = False
    missing_infrastructure: Optional[str] = None
    environmental_sustainability_features: bool = False
    sustainability_features: Optional[str] = None
    planned_amenities: Optional[str] = None
    project_strategy: Optional[str] = None
    projected_leaseup_period: Optional[str] = None

    seeking_managing_partner: bool = False
    managing_partner_responsibilities: Optional[str] = None
    seeking_general_contractor: bool = False
    general_contractor_requirements: Optional[str] = None
    open_to_joint_venture: bool = False
    joint_venture_terms: Optional[str] = None
    accept_institutional_investment: bool = False
    institutional_investment_options: Optional[str] = None
    match_long_term_hold_investors: bool = False
    desired_hold_period: Optional[str] = None
    match_structured_exit_investors: bool = False
    exit_triggers: Optional[str] = None

    vessel_promote_project: bool = False
    custom_project_website: bool = False
    schedule_investor_webinar: bool = False

    upload_media_renderings: Optional[str] = None
    upload_pitch_deck: Optional[str] = None
    virtual_tour_link: Optional[str] = None
    upload_legal_documents: Optional[str] = None

    project_owner_name: str
    company_name: Optional[str] = None
    preferred_contact_method: str
    automated_investor_inquiries: bool = False

class ProjectResponse(BaseModel):
    project_id: int
    user_id: int
    project_name: str
    project_type: str
    project_city: str
    project_state: str
    project_zip: str
    short_summary: str
    current_development_stage: str
    zoning_secured: bool
    missing_approvals: Optional[str] = None
    total_land_size: Optional[float] = None
    buildable_area: Optional[float] = None
    key_development_details: Optional[str] = None

    total_project_cost: float
    funding_secured: Optional[float] = None
    capital_still_needed: Optional[float] = None
    investor_capital_needed: bool
    investor_capital_amount: Optional[float] = None
    investor_capital_terms: Optional[str] = None
    equity_structure_available: bool
    equity_structure_allocation: Optional[str] = None
    minimum_investment_ticket: Optional[str] = None
    debt_vs_equity_structure: Optional[str] = None
    projected_irr: Optional[str] = None
    target_hold_period: Optional[str] = None
    projected_annual_yield: Optional[float] = None
    qualifies_for_tax_incentives: bool
    tax_incentives_specifics: Optional[str] = None
    appraisal_completed: bool
    appraisal_document: Optional[str] = None
    financial_proforma_available: bool
    financial_proforma_document: Optional[str] = None

    construction_license: str
    contractor_secured: bool
    total_buildable_area: Optional[float] = None
    planned_units: Optional[int] = None
    construction_type: Optional[str] = None
    land_acquisition_status: Optional[str] = None
    infrastructure_availability: bool
    missing_infrastructure: Optional[str] = None
    environmental_sustainability_features: bool
    sustainability_features: Optional[str] = None
    planned_amenities: Optional[str] = None
    project_strategy: Optional[str] = None
    projected_leaseup_period: Optional[str] = None

    seeking_managing_partner: bool
    managing_partner_responsibilities: Optional[str] = None
    seeking_general_contractor: bool
    general_contractor_requirements: Optional[str] = None
    open_to_joint_venture: bool
    joint_venture_terms: Optional[str] = None
    accept_institutional_investment: bool
    institutional_investment_options: Optional[str] = None
    match_long_term_hold_investors: bool
    desired_hold_period: Optional[str] = None
    match_structured_exit_investors: bool
    exit_triggers: Optional[str] = None

    vessel_promote_project: bool
    custom_project_website: bool
    schedule_investor_webinar: bool

    # Mark these fields as optional so they can be None
    upload_media_renderings: Optional[str] = None
    upload_pitch_deck: Optional[str] = None
    virtual_tour_link: Optional[str] = None
    upload_legal_documents: Optional[str] = None

    project_owner_name: str
    company_name: Optional[str] = None
    preferred_contact_method: str
    automated_investor_inquiries: bool

    submitted_at: Optional[datetime] = None

    class Config:
        orm_mode = True