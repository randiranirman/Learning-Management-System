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
      console.log("Updated profile successfully");
      setShowEditProfile(false);
    } catch (error) {
      console.log(error, "Error updating details");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-6">
          <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
          <p className="text-white text-sm mt-1">Update your personal information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
              <Home size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
              <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

          {/* Action buttons */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition duration-200 shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setShowEditProfile(false)}
              className="w-full mt-3 bg-gray-100 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
  