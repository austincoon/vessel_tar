import React from "react";
import { useNavigate } from "react-router-dom";
import "./SplashPage.css";
import VesselLogo from "./components/Vessel_Investor_Logo_2.png";
import DefaultImage from "./components/default_image.webp";

function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="splash-dark">
      <header className="splash-header">
        <div className="header-logo">
          <img src={VesselLogo} alt="Vessel Logo" />
        </div>
        <nav className="nav-bar">
          <ul>
            <li>Services</li>
            <li>Process</li>
            <li>Team</li>
            <li>Pricing</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="explore-button">
          <button onClick={() => navigate("/dashboard")}>
            Explore Platform
          </button>
        </div>
      </header>
      <main className="splash-main">
        <div className="content-wrapper">
          <h1 className="main-title">Vessel Investor</h1>
          <p className="subtitle">
            We connect buyers, property owners, managing partners, and investors in real estate.
          </p>
          <div className="cta-buttons">
            <button className="primary-button">Our Services</button>
            <button className="secondary-button">Contact Us</button>
          </div>
          <div className="investor-info">
            <p>Over 15,000+ Investors</p>
            <div className="investor-avatars">
              <img src={DefaultImage} alt="Investor 1" />
              <img src={DefaultImage} alt="Investor 2" />
              <img src={DefaultImage} alt="Investor 3" />
            </div>
          </div>
          <h1 className="get-in-touch-title">
            We're Vessel. We make connections in the world of real estate easy.
          </h1>
          <button className="primary-button">Get in Touch</button>
        </div>
      </main>
      {/* "What We Do" Section */}
      <section className="what-we-do">
        <h2>What We Do</h2>
        <div className="what-we-do-columns">
          <div className="column">
            <h3>Smart Pairing: Machine-Driven Connections</h3>
            <p>
              At Vessel, our Smart Pairing feature revolutionizes the real estate experience by using machine-driven technology to seamlessly connect buyers, sellers, investors, and managing partners based on their unique preferences and needs. Unlike traditional platforms like Zillow, which rely on manual searches and broad listings, Smart Pairing ensures that each user is matched with the most relevant opportunities, enhancing efficiency and satisfaction.
            </p>
            <p>
              <strong>Personalized Matches:</strong> Our system analyzes user behavior, preferences, and market trends to provide tailored recommendations.
            </p>
            <p>
              <strong>Enhanced Efficiency:</strong> Receive instant, targeted matches that reduce search time.
            </p>
            <p>
              <strong>Continuous Learning:</strong> Our platform continuously learns to improve match accuracy.
            </p>
            <p>
              <strong>Optimized Investments:</strong> Investors are paired with projects that best fit their goals.
            </p>
          </div>
          <div className="column">
            <h3>Post Investment Opportunities</h3>
            <p>
              Discover a curated selection of high-potential real estate projects tailored to your investment goals. Vessel showcases diverse opportunities across various sectors, ensuring you find the perfect match for your portfolio.
            </p>
            <p>
              <strong>Curated Listings:</strong> Browse vetted projects tailored to your criteria.
            </p>
            <p>
              <strong>Easy Commitments:</strong> Invest seamlessly with secure payment methods.
            </p>
            <p>
              <strong>Portfolio Management:</strong> Track your investments in a centralized dashboard.
            </p>
            <p>
              <strong>Transparent Returns:</strong> Access detailed ROI projections and performance data.
            </p>
            <p>
              <strong>Diverse Investments:</strong> Diversify with various property types.
            </p>
          </div>
        </div>
      </section>
      {/* "The Process" Section */}
      <section className="three-column-section">
        <h2>The Process</h2>
        <div className="three-columns">
          <div className="column">
            <h3>
              <span className="red-text">01</span> Sign Up
            </h3>
            <p>
              Sign up for free, then choose your primary user type—Property Owner, Managing Investor/Developer, or Investor. Complete a brief profile so Vessel can personalize recommendations and resources for you.
            </p>
          </div>
          <div className="column">
            <h3>
              <span className="red-text">02</span> Explore or Post
            </h3>
            <p>
              <strong>Property Owners:</strong> List your property at no cost, add photos and details, and optionally mark it “Open to Group Project.”
            </p>
            <p>
              <strong>Managing Partners:</strong> Subscribe to unlock project-funding features. Post a new project with funding goals, timelines, and your proforma.
            </p>
            <p>
              Investors: Browse curated opportunities, filter by location and ROI, then save or follow the deals that match your goals.
            </p>
          </div>
          <div className="column">
            <h3>
              <span className="red-text">03</span> Connect
            </h3>
            <p>
              Use Vessel’s messaging tools to chat with owners, partners, or other investors. Monitor your dashboard for new deals, offers, or inquiries. Complete the necessary steps (sign documents, commit funds, or accept offers) directly within the platform.
            </p>
          </div>
        </div>
      </section>
      {/* "Who We Serve" Section */}
      <section className="three-column-services">
        <h2>Who We Serve</h2>
        <div className="three-columns">
          <div className="column">
            <h3>Property Owners</h3>
            <p>
              Vessel empowers property owners to list, manage, and sell their properties with ease. Our platform offers comprehensive tools to showcase your real estate, attract investors, and facilitate smooth transactions.
            </p>
            <p>
              <strong>Free Listings:</strong> Post your properties at no cost and reach a wide audience.
            </p>
            <p>
              <strong>Enhanced Visibility:</strong> Boost your listings to gain more exposure.
            </p>
            <p>
              <strong>Comprehensive Profiles:</strong> Provide detailed property information, including photos, descriptions, and key metrics.
            </p>
            <p>
              <strong>Investor Access:</strong> Connect directly with interested investors and managing partners.
            </p>
            <p>
              <strong>Secure Transactions:</strong> Handle all aspects of the sale process safely.
            </p>
          </div>
          <div className="column">
            <h3>Investors</h3>
            <p>
              For investors, Vessel offers a curated selection of vetted real estate opportunities, ensuring you find investments that align with your financial goals and risk preferences. Our platform simplifies the investment process, making it easy to commit funds and monitor your portfolio.
            </p>
            <p>
              <strong>Curated Opportunities:</strong> Browse a wide range of vetted projects tailored to your investment criteria.
            </p>
            <p>
              <strong>Easy Commitments:</strong> Invest seamlessly with secure payment methods.
            </p>
            <p>
              <strong>Portfolio Management:</strong> Track all your investments in one centralized dashboard, with real-time updates on performance.
            </p>
            <p>
              <strong>Transparent Returns:</strong> Access detailed ROI projections and performance data.
            </p>
            <p>
              <strong>Diverse Investments:</strong> Diversify your portfolio with various property types.
            </p>
          </div>
          <div className="column">
            <h3>Managing Investors</h3>
            <p>
              Managing Partners leverage Vessel to lead and manage real estate investments effectively. Our platform provides the tools needed to secure funding, collaborate with investors, and oversee project milestones, ensuring successful outcomes for all parties involved.
            </p>
            <p>
              <strong>Project Creation:</strong> Easily post and manage multiple investment projects, detailing funding requirements and timelines.
            </p>
            <p>
              <strong>Investor Matching:</strong> Utilize our machine-driven matching to connect with investors who are the best fit for your projects.
            </p>
            <p>
              <strong>Funding Management:</strong> Track and manage capital raised to meet your funding goals efficiently.
            </p>
            <p>
              <strong>Milestone Tracking:</strong> Monitor key milestones and progress indicators to keep projects on schedule.
            </p>
            <p>
              <strong>Custom Branding:</strong> Personalize your project pages to reflect your brand and attract the right investors.
            </p>
            <p>
              <strong>Comprehensive Reports:</strong> Generate detailed reports on project performance, funding status, and investor contributions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SplashPage;
