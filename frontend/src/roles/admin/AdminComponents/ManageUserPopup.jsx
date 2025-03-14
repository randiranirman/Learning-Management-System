import React from "react";

const ManageUserPopup = ({ setShowUserPopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg bg-opacity-10 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-medium">Role</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-medium">Username</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded-lg focus:ring focus:ring-primary outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              className="bg-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
