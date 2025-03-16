import React, { useState } from "react";

const ManageUserPopup = ({ setShowUserPopup }) => {
  const [formData, setFormData] = useState({
    role: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7265/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      console.log("User created:", result);

      setShowUserPopup(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg bg-opacity-10 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
              required
            />
          </div>

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
