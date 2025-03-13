import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-primary h-screen w-[280px] flex flex-col gap-y-8 p-4">
      <h2 className="text-white font-semibold text-2xl text-center">Admin Panel</h2>

      <ul className="flex flex-col gap-y-4">
        <Link to="/admin/dashboard">
          <li className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2">
            Dashboard
          </li>
        </Link>

        <Link to="/admin/manage-users">
          <li className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2">
            Manage Users
          </li>
        </Link>

        <Link to="/admin/manage-assignments">
          <li className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2">
            Manage Assignments
          </li>
        </Link>

        <Link to="/admin/manage-courses">
          <li className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2 ">
            Manage Courses
          </li>
        </Link>

        <Link to="/admin/analytics">
          <li className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2">
            Analytics
          </li>
        </Link>

        <Link to="/admin/settings">
          <li className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2">
            Settings
          </li>
        </Link>

        {/* Log Out Button */}
        <button className="text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2 w-full">
          Log Out
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
