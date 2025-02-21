import React from "react";
import NavigationBar from "./components/navigationBar";
import "./DashboardPage.css";
import { useAuth } from "./AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
  
      <NavigationBar />
      <div className="dashboard-content">

        <h2>SMART PAIRING</h2>
          <p>
            This dashboard is a preview of how the Vessel Dashboard will
            revolutionize real estate investing, offering unparalleled
            transparency, insights, and control over your investments.
          </p>

        <div className="dashboard-text dashboard-text-columns">
          <p>
            Your all-in-one hub for managing real estate investments, tracking
            projects, and exploring new opportunities.
          </p>
          <h3>4. My Investments</h3>
          <p>
            For investors, this section provides detailed performance data on
            your investments, helping you maximize your returns. Track
            historical growth, current standing, and future potential with
            clarity.
          </p>
          <p>
            The Vessel Dashboard is designed to cater to everyone in the real
            estate ecosystem—whether you're an investor seeking high-growth
            opportunities, a managing partner looking for investments, or a
            regular buyer or seller navigating the market. Our user-friendly
            tools provide insights, transparency, and accessibility for all your
            real estate needs.
          </p>
          <h3>5. Explore Opportunities</h3>
          <p>Our Explore section is designed for everyone:</p>
          <ul>
            <li>
              <strong>Projects:</strong> Discover new developments or investment
              opportunities tailored to your preferences.
            </li>
            <li>
              <strong>Properties:</strong> Browse a curated list of homes,
              vacation rentals, investments, or commercial properties for sale
              or rent.
            </li>
            <li>
              <strong>Managing Investors:</strong> For those seeking partners,
              find like-minded individuals to team up with on bigger opportunities.
            </li>
          </ul>
          <p>
            Whether you're a managing investor, limited investor, a buyer, or a
            seller, the Explore feature connects you to opportunities that match
            your goals.
          </p>
          <h3>Key Features of Your Dashboard</h3>
          <h4>1. Smart Metrics at a Glance</h4>
          <p>
            When you log in, you'll see a comprehensive overview of your real
            estate activity. Our real-time metrics and insights cover:
          </p>
          <ul>
            <li>Investment performance and market trends.</li>
            <li>Project investment tracking.</li>
            <li>
              Personalized recommendations with our Smart Pairing feature,
              helping investors, buyers, and sellers find the best matches.
            </li>
          </ul>
          <p>
            Stay informed and in control with a dashboard designed to simplify
            decision-making.
          </p>
          <h4>2. My Projects</h4>
          <p>
            This section is where projects connect with potential investors.
            Whether you're a developer seeking funding or an investor looking for
            opportunities, this feature bridges the gap. Explore active projects,
            track progress, and access critical details that make collaboration
            seamless and transparent. It's your hub for fostering partnerships and
            driving real estate success.
          </p>
          <h4>6. Contact & Collaboration</h4>
          <p>
            Effortlessly connect with the right people through our Contact section.
            Buyers can reach out to sellers, investors can connect with managing
            partners, and property owners can engage with potential tenants or
            collaborators. This ensures that no matter your role, you're always
            just a click away from your next opportunity.
          </p>
          <h4>3. My Properties</h4>
          <p>
            This section showcases the properties you currently have for sale.
            Whether you're a homeowner listing your property, a developer
            marketing a project, or an investor looking to sell your shares, you
            can easily manage your active listings here. Get detailed insights on
            views, inquiries, and potential buyers, all in one place, to streamline
            your selling process.
          </p>
          <h2>Discover the Smart Pairing Feature</h2>
          <p>
            Our revolutionary Smart Pairing tool ensures that everyone—from buyers
            and sellers to limited investors and managing investors—gets matched
            with the perfect opportunity. For buyers and sellers, it simplifies the
            process by suggesting the best properties or buyers based on very
            specific preferences. For investors, it identifies projects and partners
            that align with your goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
