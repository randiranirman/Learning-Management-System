import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import { getAdminDetails } from "../../../utils/adminService";

const Settings = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});

  const fetchAdminDetails = async () => {
    const id = localStorage.getItem("UserId");
    if (!id) {
      console.error("User ID not found in localStorage");
      return;
    }
    try {
      const details = await getAdminDetails(id);
      console.log("Admin Details:", details);
      setAdminDetails(details);
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  return (
    <>
      <div className="font-semibold text-2xl px-2">Settings</div>

      {/* Cards Container */}
      <div className="flex mt-4 gap-4 flex-wrap">
        {/* Card 1: Edit Profile */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex-1"
          style={{ maxWidth: "300px" }}
        >
          <div className="text-center">
          <div className="mb-4 text-left text-sm text-gray-700">
      <p><span className="font-medium">Name:</span> {adminDetails?.firstName   || "-"}</p>
      <p><span className="font-medium">Email:</span> {adminDetails?.email || "-"}</p>
      <p><span className="font-medium">Address:</span> {adminDetails?.address || "-"}</p>
      <p><span className="font-medium">Contact Number:</span> {adminDetails?.contactNumber || "-"}</p>
      <p><span className="font-medium">City:</span> {adminDetails?.city || "-"}</p>
      {/* Add more fields if needed */}
    </div>
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <button
              onClick={() => setShowEditProfile(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:scale-110 duration-200 transition font-semibold"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Card 2: Change Password */}
        <div
          className="bg-white p-6 rounded-lg shadow-md flex-1"
          style={{ maxWidth: "300px" }}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:scale-110 duration-200 transition font-semibold"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Render for EditProfile Modal */}
      {showEditProfile && (
        <EditProfile
          setShowEditProfile={setShowEditProfile}
          adminDetails={adminDetails}
        />
      )}
    </>
  );
};

export default Settings;
