
-- MariaDB SQL Script for Vessel Schema
USE vessel_db;

CREATE TABLE USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role ENUM('Property Owner', 'Managing Partner', 'Investor'),
    profile_image VARCHAR(255),
    phone_number VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(50),
    vessel_rating DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE USER_PROFILES (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bio TEXT,
    education TEXT,
    experience TEXT,
    investment_interests TEXT,
    portfolio_overview TEXT,
    investment_strategy TEXT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    testimonials TEXT,
    media TEXT
) ENGINE=InnoDB;

CREATE TABLE PROPERTIES (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    property_type ENUM(
        'Single Family', 'Multi-Family', 'Townhome', 'Condominium', 
        'Manufactured Home', 'Luxury Estate', 'Fixer-Upper', 
        'New Construction', 'Commercial', 'Land', 'Mixed-Use'
    ) NOT NULL,
    listing_type ENUM('For Sale', 'For Rent', 'Lease-to-Own', 'Off-Market', 'Auction') NOT NULL,
    price DECIMAL(12, 2),
    price_negotiable BOOLEAN DEFAULT FALSE,
    property_status ENUM('New Listing', 'Available', 'Pending', 'Sold', 'Off-Market') NOT NULL,
    address VARCHAR(255) NOT NULL,
    property_size DECIMAL(10, 2), -- In Sq Ft or Acres
    lot_size DECIMAL(10, 2), -- In Sq Ft or Acres
    year_built INT,
    zoning_type ENUM('Residential', 'Commercial', 'Agricultural', 'Mixed-Use') NOT NULL,
    ideal_buyer_type ENUM(
        'First-Time Homebuyer', 'Family', 'Investor', 'Luxury Buyer', 
        'Business Owner', 'Builder', 'Fix & Flip Investor', 'Developer', 'Other'
    ),
    financing_options BOOLEAN DEFAULT FALSE,
    seller_financing BOOLEAN DEFAULT FALSE,
    cryptocurrency_accepted BOOLEAN DEFAULT FALSE,
    pre_inspection_report BOOLEAN DEFAULT FALSE,
    contingent_offers BOOLEAN DEFAULT FALSE,
    incentives TEXT, -- Details about incentives (e.g., closing costs, price reductions)
    total_bedrooms INT,
    total_bathrooms INT,
    primary_bedroom_location ENUM('Main Floor', 'Upper Floor', 'Basement'),
    open_floor_plan BOOLEAN DEFAULT FALSE,
    walk_in_closets BOOLEAN DEFAULT FALSE,
    basement ENUM('None', 'Finished', 'Unfinished'),
    multiple_living_spaces BOOLEAN DEFAULT FALSE,
    kitchen_countertop_material ENUM('Granite', 'Quartz', 'Marble', 'Butcher Block', 'Laminate', 'Other'),
    cabinet_type ENUM('Shaker', 'Flat-Panel', 'Glass-Front', 'Other'),
    kitchen_appliances_included BOOLEAN DEFAULT FALSE,
    walk_in_pantry BOOLEAN DEFAULT FALSE,
    island_or_bar_seating BOOLEAN DEFAULT FALSE,
    smart_kitchen_features TEXT, -- List of smart kitchen features
    primary_bathroom_features TEXT, -- List of features (e.g., Double Vanity, Walk-In Shower, Soaking Tub)
    faucet_finish ENUM('Brushed Nickel', 'Matte Black', 'Chrome', 'Bronze', 'Gold', 'Other'),
    smart_mirrors_or_toilets BOOLEAN DEFAULT FALSE,
    bidet_installed BOOLEAN DEFAULT FALSE,
    fireplace ENUM('None', 'Gas', 'Wood Burning'),
    flooring_type ENUM('Hardwood', 'Tile', 'Carpet', 'Vinyl', 'Other'),
    smart_lighting BOOLEAN DEFAULT FALSE,
    pre_wired_surround_sound BOOLEAN DEFAULT FALSE,
    ceiling_height ENUM('Standard', 'High Ceilings', 'Vaulted', 'Other'),
    windows TEXT, -- List of window features (e.g., Floor-to-Ceiling, Bay Windows, Skylights)
    built_in_shelving BOOLEAN DEFAULT FALSE,
    home_office_spaces INT,
    garage BOOLEAN DEFAULT FALSE,
    garage_capacity INT, -- Number of cars it fits
    driveway_type ENUM('Concrete', 'Paver', 'Gravel', 'Other'),
    front_yard_landscaping ENUM('Minimal', 'Lush', 'Xeriscape', 'Custom'),
    outdoor_living_spaces TEXT, -- List of outdoor spaces (e.g., Deck, Patio, Balcony, Outdoor Kitchen)
    pool_or_hot_tub BOOLEAN DEFAULT FALSE,
    fenced_yard BOOLEAN DEFAULT FALSE,
    fence_type VARCHAR(100), -- Type of fence if applicable
    outdoor_lighting ENUM('None', 'Standard', 'Smart'),
    garden_greenhouse_orchard BOOLEAN DEFAULT FALSE,
    sprinkler_system BOOLEAN DEFAULT FALSE,
    solar_panels BOOLEAN DEFAULT FALSE,
    ev_charging_station BOOLEAN DEFAULT FALSE,
    rooftop_deck BOOLEAN DEFAULT FALSE,
    heating_system ENUM('Forced Air', 'Radiant', 'Geothermal', 'Other'),
    cooling_system ENUM('Central AC', 'Mini-Split', 'Evaporative', 'None', 'Other'),
    water_heater_type ENUM('Tank', 'Tankless', 'Solar', 'Other'),
    smart_thermostat BOOLEAN DEFAULT FALSE,
    security_system BOOLEAN DEFAULT FALSE,
    security_features TEXT, -- List of security features
    fiber_internet BOOLEAN DEFAULT FALSE,
    backup_generator BOOLEAN DEFAULT FALSE,
    septic_or_sewer ENUM('Septic', 'Sewer', 'Unknown'),
    school_district VARCHAR(255),
    nearby_public_transit BOOLEAN DEFAULT FALSE,
    walkability_score ENUM('High', 'Medium', 'Low'),
    bike_friendly BOOLEAN DEFAULT FALSE,
    hoa_fees DECIMAL(10, 2), -- Monthly HOA fee
    community_amenities TEXT, -- List of amenities (e.g., Pool, Clubhouse, Tennis Courts)
    gated_community BOOLEAN DEFAULT FALSE,
    noise_level ENUM('Quiet', 'Medium', 'Busy Area'),
    crime_rate ENUM('Low', 'Medium', 'High'),
    safety_features TEXT, -- List of safety features (e.g., Gated Community, Security Patrols, Cameras)
    rental_income_property BOOLEAN DEFAULT FALSE,
    projected_monthly_rental_income DECIMAL(10, 2),
    short_term_rental_allowed BOOLEAN DEFAULT FALSE,
    occupancy_status ENUM('Owner', 'Tenant', 'Vacant'),
    adu_or_guest_house BOOLEAN DEFAULT FALSE,
    recently_appraised BOOLEAN DEFAULT FALSE,
    appraisal_value DECIMAL(12, 2),
    featured_listing BOOLEAN DEFAULT FALSE,
    agent_name VARCHAR(100),
    agent_contact VARCHAR(100),
    best_contact_method ENUM('Phone', 'Email', 'Messenger'),
    additional_notes TEXT,
    marketing_services_needed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PROPERTY_IMAGES (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PROJECTS (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    project_type ENUM('Residential', 'Commercial', 'Mixed-Use', 'Hospitality', 'Industrial', 'Land Development', 'Redevelopment', 'Specialty Asset') NOT NULL,
    project_city VARCHAR(100) NOT NULL,
    project_state VARCHAR(50) NOT NULL,
    project_zip VARCHAR(20) NOT NULL,
    short_summary VARCHAR(250) NOT NULL,
    current_development_stage ENUM('Pre-Development', 'Permitting', 'Under Construction', 'Near Completion', 'Stabilized Asset') NOT NULL,
    zoning_secured BOOLEAN,
    missing_approvals VARCHAR(100), -- if zoning/permitting not secured
    total_land_size DECIMAL(10,2),
    buildable_area DECIMAL(10,2),
    key_development_details ENUM('High-Rise', 'Mid-Rise', 'Subdivision', 'Office Tower', 'Retail Plaza', 'Hotel', 'Industrial Park'),
    
    total_project_cost DECIMAL(15,2) NOT NULL,
    funding_secured DECIMAL(15,2),
    capital_still_needed DECIMAL(15,2),
    investor_capital_needed BOOLEAN,
    investor_capital_amount DECIMAL(15,2),
    investor_capital_terms VARCHAR(255),
    equity_structure_available BOOLEAN,
    equity_structure_allocation ENUM('Common Equity', 'Preferred Equity', 'Convertible Notes'),
    minimum_investment_ticket ENUM('$100k-$250k', '$250k-$1M', '$1M-$5M', '$5M+', 'Open to Syndication'),
    debt_vs_equity_structure ENUM('Senior Debt', 'Mezzanine', 'Joint Venture', 'Syndication', 'No Preference'),
    projected_irr ENUM('8-12%', '12-18%', '18-25%', '25%+'),
    target_hold_period ENUM('1-3 Years', '3-5 Years', '5-10 Years', 'Open-Ended', 'Immediate Exit Strategy Available'),
    projected_annual_yield DECIMAL(5,2),
    qualifies_for_tax_incentives BOOLEAN,
    tax_incentives_specifics VARCHAR(255),
    appraisal_completed BOOLEAN,
    appraisal_document VARCHAR(255), -- URL/path to uploaded file
    financial_proforma_available BOOLEAN,
    financial_proforma_document VARCHAR(255),

    construction_license ENUM('Residential License', 'Commercial License', 'Both', 'Neither'),
    contractor_secured BOOLEAN,
    total_buildable_area DECIMAL(10,2),
    planned_units INT,
    construction_type ENUM('New Development', 'Value-Add', 'Expansion', 'Redevelopment', 'Adaptive Reuse', 'Mixed-Use'),
    land_acquisition_status ENUM('Acquired', 'Under Contract', 'Negotiating', 'Seeking Land'),
    infrastructure_availability BOOLEAN,
    missing_infrastructure VARCHAR(255),
    environmental_sustainability_features BOOLEAN,
    sustainability_features VARCHAR(255),
    planned_amenities VARCHAR(255),  -- e.g., comma-separated list
    project_strategy ENUM('BTR', 'BTS', 'Condo Sales', 'Mixed Strategy'),
    projected_leaseup_period ENUM('Under 6 Months', '6-12 Months', '12+ Months'),
    
    seeking_managing_partner BOOLEAN,
    managing_partner_responsibilities VARCHAR(255),
    seeking_general_contractor BOOLEAN,
    general_contractor_requirements VARCHAR(255),
    open_to_joint_venture BOOLEAN,
    joint_venture_terms VARCHAR(255),
    accept_institutional_investment BOOLEAN,
    institutional_investment_options VARCHAR(255),
    match_long_term_hold_investors BOOLEAN,
    desired_hold_period VARCHAR(50),
    match_structured_exit_investors BOOLEAN,
    exit_triggers VARCHAR(255),
    
    vessel_promote_project BOOLEAN,
    custom_project_website BOOLEAN,
    schedule_investor_webinar BOOLEAN,
    
    upload_media_renderings VARCHAR(255),
    upload_pitch_deck VARCHAR(255),
    virtual_tour_link VARCHAR(255),
    upload_legal_documents VARCHAR(255),
    
    project_owner_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    preferred_contact_method ENUM('Email', 'Phone', 'Direct Messages'),
    automated_investor_inquiries BOOLEAN,
    
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE INVESTMENTS (
    investment_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    investor_id INT NOT NULL,
    amount_invested DECIMAL(12,2),
    equity_share DECIMAL(5,2),
    investment_date DATE,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE,
    FOREIGN KEY (investor_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE MESSAGES (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE DOCUMENTS (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    document_type VARCHAR(50),
    document_url VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE DASHBOARD_METRICS (
    metric_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_investments INT,
    expected_roi DECIMAL(12,2),
    cash_available DECIMAL(12,2),
    active_projects INT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE REVIEWS (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    rating DECIMAL(3,2),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE SMART_PAIRING (
    pairing_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    project_id INT NOT NULL,
    match_score DECIMAL(5,2),
    status ENUM('Pending', 'Accepted', 'Declined'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PROJECT_MILESTONES (
    milestone_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    milestone_title VARCHAR(100),
    description TEXT,
    due_date DATE,
    completion_status ENUM('Pending', 'Completed'),
    completion_date DATE NULL,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE FUNDING_TRACKER (
    funding_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(12,2),
    funding_date DATE,
    funding_type ENUM('Investor', 'Managing Partner Contribution'),
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE NOTIFICATIONS (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT,
    link VARCHAR(255) NULL,
    status ENUM('Unread', 'Read'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE WATCHLIST (
    watchlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NULL,
    project_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE GROUP_INVESTMENTS (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    managing_partner_id INT NOT NULL,
    total_investors INT,
    total_funding_raised DECIMAL(12,2),
    status ENUM('Active', 'Completed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE,
    FOREIGN KEY (managing_partner_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE SUCCESS_STORIES (
    story_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100),
    content TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE FAQs (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    user_role ENUM('Property Owner', 'Managing Partner', 'Investor'),
    question TEXT,
    answer TEXT
) ENGINE=InnoDB;

CREATE TABLE ANALYTICS (
    analytics_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    metric_type ENUM('Views', 'Inquiries', 'Engagement'),
    metric_value INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE DOCUMENT_VERSION_CONTROL (
    version_id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT NOT NULL,
    version_number INT,
    changes_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES DOCUMENTS(document_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE LANGUAGE_SUPPORT (
    language_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    preferred_language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PAYMENT_TRANSACTIONS (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(12,2),
    transaction_type ENUM('Investment', 'Subscription'),
    payment_method VARCHAR(50),
    transaction_status ENUM('Pending', 'Completed'),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE SUBSCRIPTION_PLANS (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(50),
    price DECIMAL(10,2),
    description TEXT,
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE SUPPORT_TICKETS (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(100),
    description TEXT,
    status ENUM('Open', 'In Progress', 'Resolved'),
    priority ENUM('Low', 'Medium', 'High'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE REFERRAL_PROGRAM (
    referral_id INT AUTO_INCREMENT PRIMARY KEY,
    referrer_id INT NOT NULL,
    referred_user_id INT NOT NULL,
    referral_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    referral_status ENUM('Pending', 'Approved'),
    reward_amount DECIMAL(10,2),
    FOREIGN KEY (referrer_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (referred_user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE EMAIL_CAMPAIGNS (
    campaign_id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_name VARCHAR(100),
    target_audience ENUM('New Users', 'Managing Partners'),
    content TEXT,
    status ENUM('Draft', 'Sent'),
    sent_at TIMESTAMP NULL
) ENGINE=InnoDB;

CREATE TABLE TAX_DOCUMENTS (
    tax_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    document_type ENUM('1099-DIV', 'K-1'),
    document_url VARCHAR(255),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PERFORMANCE_REPORTS (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    metrics JSON,
    report_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE MARKET_TRENDS (
    trend_id INT AUTO_INCREMENT PRIMARY KEY,
    sector VARCHAR(50),
    region VARCHAR(50),
    trend_summary TEXT,
    trend_date DATE
) ENGINE=InnoDB;

CREATE TABLE USER_ACTIVITY_LOG (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action_type ENUM('Login', 'Investment Made', 'Document Downloaded'),
    action_details TEXT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE SITE_SETTINGS (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_name VARCHAR(50),
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE USER_FEEDBACK (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE THIRD_PARTY_INTEGRATIONS (
    integration_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100),
    api_key VARCHAR(255),
    status ENUM('Active', 'Inactive'),
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE SECURITY_SETTINGS (
    security_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    two_factor_enabled BOOLEAN,
    last_password_change DATE,
    login_attempts INT,
    account_locked BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PROPERTY_AUCTIONS (
    auction_id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    starting_bid DECIMAL(12,2),
    current_bid DECIMAL(12,2),
    bid_end_time TIMESTAMP,
    status ENUM('Active', 'Completed'),
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE FUND_TRANSFER_HISTORY (
    transfer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    transfer_type ENUM('Deposit', 'Withdrawal'),
    amount DECIMAL(12,2),
    method ENUM('Bank Transfer', 'Credit Card'),
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Completed'),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PAYMENT_GATEWAYS (
    gateway_id INT AUTO_INCREMENT PRIMARY KEY,
    gateway_name VARCHAR(50),
    status ENUM('Active', 'Inactive'),
    api_key VARCHAR(255),
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE SYSTEM_LOGS (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    event_type ENUM('Login', 'Error', 'Data Update'),
    user_id INT NULL,
    description TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    severity ENUM('Info', 'Warning', 'Critical'),
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE PROPERTY_DOCUMENTS (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    document_type ENUM('Deed', 'Inspection Report', 'Lease Agreement'),
    document_url VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE INVESTOR_PORTFOLIOS (
    portfolio_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_investment DECIMAL(12,2),
    roi DECIMAL(5,2),
    active_projects INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PERFORMANCE_METRICS (
    metric_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    metric_name VARCHAR(50),
    value DECIMAL(12,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PROPERTY_MAINTENANCE (
    maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    issue_description TEXT,
    status ENUM('Pending', 'In Progress', 'Resolved'),
    assigned_to VARCHAR(50),
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE CLIENT_FEEDBACK (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NULL,
    feedback_text TEXT,
    rating DECIMAL(2,1),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES PROJECTS(project_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE USER_ACTIVITY_TRACKING (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type ENUM('Viewed Project', 'Made Investment', 'Logged In'),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE INVESTMENT_HISTORY (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    investment_id INT NOT NULL,
    action ENUM('Initial Investment', 'Additional Contribution', 'Withdrawal'),
    amount DECIMAL(12,2),
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT NULL,
    FOREIGN KEY (investment_id) REFERENCES INVESTMENTS(investment_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE INSURANCE_POLICIES (
    policy_id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    provider_name VARCHAR(100),
    policy_number VARCHAR(50),
    coverage_details TEXT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (property_id) REFERENCES PROPERTIES(property_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE FRAUD_PREVENTION (
    fraud_check_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    check_type ENUM('Identity Verification', 'Unusual Activity Detection'),
    status ENUM('Passed', 'Failed'),
    details TEXT,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE USER_NOTES (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_by VARCHAR(50),
    note_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE PLATFORM_AUDIT (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    audit_type ENUM('Security Audit', 'Performance Audit'),
    findings TEXT,
    recommendations TEXT,
    audited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE MULTI_CURRENCY_SUPPORT (
    currency_id INT AUTO_INCREMENT PRIMARY KEY,
    currency_code VARCHAR(3),
    exchange_rate DECIMAL(12,6),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
