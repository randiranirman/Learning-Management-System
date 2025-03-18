import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutPopUp from "./LogOutPopUp";

const Sidebar = () => {
  const [showLogOutPopup, setShowLogOutPopup]= useState("false");
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Users", path: "/admin/manage-users" },
    { name: "Manage Assignments", path: "/admin/manage-assignments" },
    { name: "Manage Courses", path: "/admin/manage-courses" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const menuItemStyles =
    "text-white font-semibold text-xl cursor-pointer text-center hover:bg-secondary hover:text-primary rounded-xl transition duration-300 py-2 active:text-primary active:bg-secondary ";

  return (
    <div className="bg-primary h-screen w-[280px] flex flex-col gap-y-8 p-4">
      <h2 className="text-white font-semibold text-2xl text-center">Admin Panel</h2>

      <ul className="flex flex-col gap-y-4">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <li className={menuItemStyles}>{item.name}</li>
          </Link>
        ))}

        {/* Log Out Button */}
        <button onClick={() => setShowLogOutPopup(true)} className={`${menuItemStyles} w-full`}>Log Out</button>

      </ul>
      {showLogOutPopup && <LogOutPopUp setShowLogOutPopup={setShowLogOutPopup} /> }
    </div>
  );
};

export default Sidebar;
