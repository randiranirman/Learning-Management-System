// components/Sidebar.jsx

import { Link } from "react-router-dom";

const Sidebar = () => {
     const choiceFunction = () => {
     confirm("Are you sure you want to log out?");
    }
  return (
    <div className="bg-primary text-white w-64 flex flex-col h-[calc(100vh-4rem)]  justi p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/manage-users"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/manage-assignments"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Manage Assignments
          </Link>
        </li>
        <li>
          <Link
            to="/manage-courses"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Manage Courses
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Settings
          </Link>
        </li>
        <li onClick={choiceFunction}>
          <Link
            to="/login"
            className="block hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
          >
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
