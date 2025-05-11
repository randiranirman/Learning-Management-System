/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { registerUser } from "../../../utils/authService";

const ManageUserPopup = ({ setShowUserPopup,onUserAdded  }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
   
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!value) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      } else if (!validateEmail(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address" }));
      return;
    }

    try {
      const newUser = await registerUser(formData);
      setUser(newUser);
      
      
      onUserAdded(newUser)
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, general: error.response?.data?.message || "Registration failed" }));
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg bg-opacity-10 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
              required
            />
          </div>

         

          {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={() => setShowUserPopup(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
              disabled={errors.email !== ""}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageUserPopup;
