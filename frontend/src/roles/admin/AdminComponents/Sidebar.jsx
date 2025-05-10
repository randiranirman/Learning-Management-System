import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../utils/authService";
import Swal from "sweetalert2";

const Sidebar = () => {
  const handleLogOut = async () => {
    

    logout();
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Users", path: "/admin/manage-users" },
    { name: "Manage Assignments", path: "/admin/manage-assignments" },
    { name: "Manage Courses", path: "/admin/manage-courses" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const menuItemStyles =
    "text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2 active:text-primary active:bg-secondary";

  return (
    <div className="bg-primary h-screen w-[350px] flex flex-col gap-y-8 p-6 fixed left-0 top-0">
      <h2 className="text-white font-semibold text-2xl text-center">Admin Panel</h2>

      <ul className="flex flex-col gap-y-4">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <li className={menuItemStyles}>{item.name}</li>
          </Link>
        ))}
      </ul>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Log out button */}
      <button
        onClick={handleLogOut}
        className="text-white font-semibold text-xl text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
