import React from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import Profile from "./components/profile";
import Details from "./components/details";
import { useProfileData } from "./hooks/useProfileData";
import { useProfileDetails } from "./hooks/useProfileDetails";
import "./UserProfile.css";
import { useAuth } from "./AuthContext";

function UserProfile() {
  const { userId } = useParams();
  const { data: profileData, isLoading: isLoadingProfile, isError: isErrorProfile } = useProfileData(userId);
  const { data: profileDetails, isLoading: isLoadingDetails, isError: isErrorDetails } = useProfileDetails(userId);
  const { user } = useAuth();

  // Debugging: Log the fetched data
  console.log("Profile Data:", profileData);
  console.log("Profile Details:", profileDetails);

  if (isLoadingProfile || isLoadingDetails) return <p>Loading user data...</p>;
  if (isErrorProfile || isErrorDetails) return <p>Failed to load user data.</p>;

  return (
    <div className="user-dashboard">

      <NavigationBar />

      <div className="user-dashboard-content">
        {/* Pass the fetched profileData as props */}
        <Profile profile={profileData} />
        <Details details={profileDetails} />
      </div>
    </div>
  );
}

export default UserProfile;