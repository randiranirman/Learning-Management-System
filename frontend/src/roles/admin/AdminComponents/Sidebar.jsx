import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ setShowLogOut }) => {
  return (
    <div className="bg-primary text-white w-64 flex flex-col h-[calc(100vh-4rem)] p-5">
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
        <li>
          <button
            className="block w-full text-left hover:bg-secondary hover:text-primary transition-all duration-200 p-2 rounded cursor-pointer"
            onClick={() => setShowLogOut(true)}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  setShowLogOut: PropTypes.func.isRequired,
};

export default Sidebar;
