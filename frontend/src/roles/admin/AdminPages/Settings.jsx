import {  useState } from "react";
import EditProfile from "./EditProfile";


const Settings = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  
  

  return (
    <>
      <div className="font-semibold text-2xl px-2">Settings</div>

      {/* Cards Container */}
      <div className="flex mt-4 gap-4">
        {/* Card 1: Edit Profile */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg flex-1"
          style={{ maxWidth: "300px" }}
        >
          <div className="text-center">
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
      {showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} />}
    </>
  );
};

export default Settings;