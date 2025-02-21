# models.py
from sqlalchemy import (
    Column, Integer, String, Enum, DECIMAL, TIMESTAMP, ForeignKey, Text, Boolean
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from passlib.context import CryptContext
from database import Base

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


class User(Base):
    __tablename__ = "USERS"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    first_name = Column(String(50))
    last_name = Column(String(50))
    role = Column(Enum("Property Owner", "Managing Partner", "Investor"))
    profile_image = Column(String(255))
    phone_number = Column(String(20))
    city = Column(String(100))
    state = Column(String(50))
    vessel_rating = Column(DECIMAL(3, 2))
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())

    # Set passive_deletes=True so that deletion cascades are handled by the DB
    profile = relationship("UserProfile", back_populates="user", uselist=False, passive_deletes=True)
    properties = relationship("Property", back_populates="user") 
    projects = relationship("Project", back_populates="user")




class UserProfile(Base):
    __tablename__ = "USER_PROFILES"
    profile_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("USERS.user_id", ondelete="CASCADE"), nullable=False)
    bio = Column(Text, nullable=True)
    education = Column(Text, nullable=True)
    experience = Column(Text, nullable=True)
    investment_interests = Column(Text, nullable=True)
    portfolio_overview = Column(Text, nullable=True)
    investment_strategy = Column(Text, nullable=True)
    testimonials = Column(Text, nullable=True)
    media = Column(Text, nullable=True)

    user = relationship("User", back_populates="profile")



class Property(Base):
    __tablename__ = "PROPERTIES"
    property_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("USERS.user_id"), nullable=False)
    title = Column(String(100), nullable=False)
    property_type = Column(String(50), nullable=False)
    listing_type = Column(String(50), nullable=False)
    price = Column(DECIMAL(12, 2))
    price_negotiable = Column(Integer, default=0)
    property_status = Column(String(50), nullable=False)
    address = Column(String(255), nullable=False)
    property_size = Column(DECIMAL(10, 2))
    lot_size = Column(DECIMAL(10, 2))
    year_built = Column(Integer)
    zoning_type = Column(String(50), nullable=False)
    ideal_buyer_type = Column(String(50))
    financing_options = Column(Integer, default=0)
    seller_financing = Column(Integer, default=0)
    cryptocurrency_accepted = Column(Integer, default=0)
    pre_inspection_report = Column(Integer, default=0)
    contingent_offers = Column(Integer, default=0)
    incentives = Column(Text)
    total_bedrooms = Column(Integer)
    total_bathrooms = Column(Integer)
    primary_bedroom_location = Column(String(50))
    open_floor_plan = Column(Integer, default=0)
    walk_in_closets = Column(Integer, default=0)
    basement = Column(String(50))
    multiple_living_spaces = Column(Integer, default=0)
    kitchen_countertop_material = Column(String(50))
    cabinet_type = Column(String(50))
    kitchen_appliances_included = Column(Integer, default=0)
    walk_in_pantry = Column(Integer, default=0)
    island_or_bar_seating = Column(Integer, default=0)
    smart_kitchen_features = Column(Text)
    primary_bathroom_features = Column(Text)
    faucet_finish = Column(String(50))
    smart_mirrors_or_toilets = Column(Integer, default=0)
    bidet_installed = Column(Integer, default=0)
    fireplace = Column(String(50))
    flooring_type = Column(String(50))
    smart_lighting = Column(Integer, default=0)
    pre_wired_surround_sound = Column(Integer, default=0)
    ceiling_height = Column(String(50))
    windows = Column(Text)
    built_in_shelving = Column(Integer, default=0)
    home_office_spaces = Column(Integer)
    garage = Column(Integer, default=0)
    garage_capacity = Column(Integer)
    driveway_type = Column(String(50))
    front_yard_landscaping = Column(String(50))
    outdoor_living_spaces = Column(Text)
    pool_or_hot_tub = Column(Integer, default=0)
    fenced_yard = Column(Integer, default=0)
    fence_type = Column(String(100))
    outdoor_lighting = Column(String(50))
    garden_greenhouse_orchard = Column(Integer, default=0)
    sprinkler_system = Column(Integer, default=0)
    solar_panels = Column(Integer, default=0)
    ev_charging_station = Column(Integer, default=0)
    rooftop_deck = Column(Integer, default=0)
    heating_system = Column(String(50))
    cooling_system = Column(String(50))
    water_heater_type = Column(String(50))
    smart_thermostat = Column(Integer, default=0)
    security_system = Column(Integer, default=0)
    security_features = Column(Text)
    fiber_internet = Column(Integer, default=0)
    backup_generator = Column(Integer, default=0)
    septic_or_sewer = Column(String(50))
    school_district = Column(String(255))
    nearby_public_transit = Column(Integer, default=0)
    walkability_score = Column(String(50))
    bike_friendly = Column(Integer, default=0)
    hoa_fees = Column(DECIMAL(10, 2))
    community_amenities = Column(Text)
    gated_community = Column(Integer, default=0)
    noise_level = Column(String(50))
    crime_rate = Column(String(50))
    safety_features = Column(Text)
    rental_income_property = Column(Integer, default=0)
    projected_monthly_rental_income = Column(DECIMAL(10, 2))
    short_term_rental_allowed = Column(Integer, default=0)
    occupancy_status = Column(String(50))
    adu_or_guest_house = Column(Integer, default=0)
    recently_appraised = Column(Integer, default=0)
    appraisal_value = Column(DECIMAL(12, 2))
    featured_listing = Column(Integer, default=0)
    agent_name = Column(String(100))
    agent_contact = Column(String(100))
    best_contact_method = Column(String(50))
    additional_notes = Column(Text)
    marketing_services_needed = Column(Integer, default=0)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())

    # Relationship to User
    user = relationship("User", back_populates="properties")
    # Relationship to PropertyImage; cascades deletes to images when a property is deleted
    images = relationship("PropertyImage", back_populates="property", cascade="all, delete", passive_deletes=True)

# Define the PropertyImage model corresponding to PROPERTY_IMAGES table
class PropertyImage(Base):
    __tablename__ = "PROPERTY_IMAGES"
    image_id = Column(Integer, primary_key=True, autoincrement=True)
    property_id = Column(Integer, ForeignKey("PROPERTIES.property_id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(255), nullable=False)

    # Relationship back to Property
    property = relationship("Property", back_populates="images")


class Project(Base):
    __tablename__ = "PROJECTS"

    project_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("USERS.user_id", ondelete="CASCADE"), nullable=False)
    project_name = Column(String(255), nullable=False)
    project_type = Column(Enum("Residential", "Commercial", "Mixed-Use", "Hospitality", "Industrial", "Land Development", "Redevelopment", "Specialty Asset"), nullable=False)
    project_city = Column(String(100), nullable=False)
    project_state = Column(String(50), nullable=False)
    project_zip = Column(String(20), nullable=False)
    short_summary = Column(String(250), nullable=False)
    current_development_stage = Column(Enum("Pre-Development", "Permitting", "Under Construction", "Near Completion", "Stabilized Asset"), nullable=False)
    zoning_secured = Column(Boolean)
    missing_approvals = Column(String(100))
    total_land_size = Column(DECIMAL(10,2))
    buildable_area = Column(DECIMAL(10,2))
    key_development_details = Column(Enum("High-Rise", "Mid-Rise", "Subdivision", "Office Tower", "Retail Plaza", "Hotel", "Industrial Park"))
    
    total_project_cost = Column(DECIMAL(15,2), nullable=False)
    funding_secured = Column(DECIMAL(15,2))
    capital_still_needed = Column(DECIMAL(15,2))
    investor_capital_needed = Column(Boolean)
    investor_capital_amount = Column(DECIMAL(15,2))
    investor_capital_terms = Column(String(255))
    equity_structure_available = Column(Boolean)
    equity_structure_allocation = Column(Enum("Common Equity", "Preferred Equity", "Convertible Notes"))
    minimum_investment_ticket = Column(Enum("$100k-$250k", "$250k-$1M", "$1M-$5M", "$5M+", "Open to Syndication"))
    debt_vs_equity_structure = Column(Enum("Senior Debt", "Mezzanine", "Joint Venture", "Syndication", "No Preference"))
    projected_irr = Column(Enum("8-12%", "12-18%", "18-25%", "25%+"))
    target_hold_period = Column(Enum("1-3 Years", "3-5 Years", "5-10 Years", "Open-Ended", "Immediate Exit Strategy Available"))
    projected_annual_yield = Column(DECIMAL(5,2))
    qualifies_for_tax_incentives = Column(Boolean)
    tax_incentives_specifics = Column(String(255))
    appraisal_completed = Column(Boolean)
    appraisal_document = Column(String(255))
    financial_proforma_available = Column(Boolean)
    financial_proforma_document = Column(String(255))
    
    construction_license = Column(Enum("Residential License", "Commercial License", "Both", "Neither"))
    contractor_secured = Column(Boolean)
    total_buildable_area = Column(DECIMAL(10,2))
    planned_units = Column(Integer)
    construction_type = Column(Enum("New Development", "Value-Add", "Expansion", "Redevelopment", "Adaptive Reuse", "Mixed-Use"))
    land_acquisition_status = Column(Enum("Acquired", "Under Contract", "Negotiating", "Seeking Land"))
    infrastructure_availability = Column(Boolean)
    missing_infrastructure = Column(String(255))
    environmental_sustainability_features = Column(Boolean)
    sustainability_features = Column(String(255))
    planned_amenities = Column(String(255))
    project_strategy = Column(Enum("BTR", "BTS", "Condo Sales", "Mixed Strategy"))
    projected_leaseup_period = Column(Enum("Under 6 Months", "6-12 Months", "12+ Months"))
    
    seeking_managing_partner = Column(Boolean)
    managing_partner_responsibilities = Column(String(255))
    seeking_general_contractor = Column(Boolean)
    general_contractor_requirements = Column(String(255))
    open_to_joint_venture = Column(Boolean)
    joint_venture_terms = Column(String(255))
    accept_institutional_investment = Column(Boolean)
    institutional_investment_options = Column(String(255))
    match_long_term_hold_investors = Column(Boolean)
    desired_hold_period = Column(String(50))
    match_structured_exit_investors = Column(Boolean)
    exit_triggers = Column(String(255))
    
    vessel_promote_project = Column(Boolean)
    custom_project_website = Column(Boolean)
    schedule_investor_webinar = Column(Boolean)
    
    upload_media_renderings = Column(String(255))
    upload_pitch_deck = Column(String(255))
    virtual_tour_link = Column(String(255))
    upload_legal_documents = Column(String(255))
    
    project_owner_name = Column(String(100), nullable=False)
    company_name = Column(String(100))
    preferred_contact_method = Column(Enum("Email", "Phone", "Direct Messages"))
    automated_investor_inquiries = Column(Boolean)
    
    submitted_at = Column(TIMESTAMP, server_default=func.current_timestamp())

    user = relationship("User", back_populates="projects")