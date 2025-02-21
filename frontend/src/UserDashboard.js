import React, { useState, useEffect } from "react";
import NavigationBar from "./components/navigationBar";
import Profile from "./components/profile";
import Details from "./components/details";
import { useProfileData } from "./hooks/useProfileData";
import { useProfileDetails } from "./hooks/useProfileDetails";
import "./UserDashboard.css";
import { useAuth } from "./AuthContext";
import api from "./api";

const backendURL = "http://localhost:8000";


function UserDashboard() {
  const { user, logout } = useAuth();
  const { data: profileData, isLoading, isError } = useProfileData(user?.user_id);
  const { data: profileDetails, isLoading: isLoadingDetails, isError: isErrorDetails } = useProfileDetails(user?.user_id);

  // Local state for toggling edit mode and storing edited values.
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [editedDetails, setEditedDetails] = useState({});

  // Synchronize fetched data into our local state when it changes.
  useEffect(() => {
    if (profileData) {
      setEditedProfile(profileData);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileDetails) {
      setEditedDetails(profileDetails);
    }
  }, [profileDetails]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Update main profile data.
      await api.put(`/user/${user.user_id}`, editedProfile);
      // Update profile details.
      await api.put(`/user/${user.user_id}/details`, editedDetails);
      setIsEditing(false);
      // Refresh the page.
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };
  

  const handleCancel = () => {
    // Reset our edited state to the fetched data.
    setEditedProfile(profileData);
    setEditedDetails(profileDetails);
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;
    try {
      // Delete the user account.
      await api.delete(`/user/${user.user_id}`);
      logout();
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post(
        `/user/${user.user_id}/upload_profile_image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update editedProfile with the new image URL
      setEditedProfile((prev) => ({
        ...prev,
        profileImage: response.data.profileImage,
      }));
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };
  

  if (isLoading || isLoadingDetails) return <p>Loading user data...</p>;
  if (isError || isErrorDetails) return <p>Failed to load user data.</p>;

  return (
    <div className="user-dashboard">
      
      <NavigationBar />
      <div className="user-dashboard-content">
        {isEditing ? (
          <div className="edit-profile">


            <div className="edit-section">
              <label>Profile Image:</label>
              {editedProfile.profileImage && (
                <div className="current-profile-image">
                  <img
                    src={
                      editedProfile.profileImage.startsWith("http")
                        ? editedProfile.profileImage
                        : `${backendURL}${editedProfile.profileImage}`
                    }
                    alt="Current Profile"
                    style={{ maxWidth: "150px", borderRadius: "50%" }}
                  />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleProfileImageChange} />
            </div>

            <h2>Edit Profile</h2>
            <div className="edit-section">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={editedProfile.firstName || ""}
                onChange={handleProfileChange}
              />
            </div>
            <div className="edit-section">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={editedProfile.lastName || ""}
                onChange={handleProfileChange}
              />
            </div>
            <div className="edit-section">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedProfile.email || ""}
                onChange={handleProfileChange}
              />
            </div>
            {/* New City and State fields */}
            <div className="edit-section">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={editedProfile.city || ""}
                onChange={handleProfileChange}
              />
            </div>
            <div className="edit-section">
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={editedProfile.state || ""}
                onChange={handleProfileChange}
              />
            </div>
            {/* End of new fields */}
            <h3>Profile Details</h3>
            <div className="edit-section">
              <label>Bio:</label>
              <textarea
                name="bio"
                value={editedDetails.bio || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Education:</label>
              <textarea
                name="education"
                value={editedDetails.education || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Experience:</label>
              <textarea
                name="experience"
                value={editedDetails.experience || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Investment Interests:</label>
              <textarea
                name="investmentInterests"
                value={editedDetails.investmentInterests || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Portfolio Overview:</label>
              <textarea
                name="portfolioOverview"
                value={editedDetails.portfolioOverview || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Investment Strategy:</label>
              <textarea
                name="investmentStrategy"
                value={editedDetails.investmentStrategy || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Testimonials:</label>
              <textarea
                name="testimonials"
                value={editedDetails.testimonials || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-section">
              <label>Media:</label>
              <textarea
                name="media"
                value={editedDetails.media || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div className="edit-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <Profile profile={profileData} />
            <Details details={profileDetails} />
            <div className="dashboard-actions">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button className="delete-btn"
                onClick={handleDeleteAccount}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
