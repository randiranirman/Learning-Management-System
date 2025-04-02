import React, { useState } from "react";
import { editAdminDetails } from "../../../utils/adminService";
import { User, Home, Phone } from "lucide-react";

const EditProfile = ({ setShowEditProfile }) => {
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editAdminDetails(updatedDetails);
      console.log("updated profile successfully");
      setShowEditProfile(false); 
    } catch (error) {
      console.log(error, "Error updating details");
    }
  };

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6">
            <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
            <p className="text-white text-sm mt-1">Update your personal information</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              {/* Name fields in a flex row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={updatedDetails.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-gray-50"
                      placeholder="Enter First Name"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedDetails.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-gray-50"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>

              {/* Address field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={updatedDetails.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-gray-50"
                    placeholder="Enter Address"
                  />
                </div>
              </div>

              {/* Contact field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="contactNumber"
                    value={updatedDetails.contactNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-gray-50"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full cursor-pointer bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="w-full mt-3 cursor-pointer bg-transparent border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
