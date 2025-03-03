import { Link } from "react-router-dom";

const Sidebar = ({ setShowLogOut }) => {
  return (
    
    <div className="bg-primary w-1/5">
      <div>
        <div className="text-white font-bold text-3xl mx-2 my-2">
          <h1>Welcome Admin!</h1>
        </div>

        <nav className="mt-4 space-y-4 max-h-50">
          <ul className="mt-4 space-y-4 gap-4">
            <Link to="/admin">
              <li className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
                Dashboard
              </li>
            </Link>
            <Link to="/admin/manage-users">
              <li className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
                Manage Users
              </li>
            </Link>
            <Link to="/admin/manage-assignments">
              <li className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
                Manage Assignments
              </li>
            </Link>
            <Link to="/admin/manage-courses">
              <li className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
                Manage Courses
              </li>
            </Link>
            <Link to="/admin/analytics">
              <li className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
                Analytics
              </li>
            </Link>
            <Link to="/admin/settings">
              <li className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
                Settings
              </li>
            </Link>
          </ul>
        </nav>

        <div className="hover:bg-secondary transition duration-300 hover:text-primary text-white px-4 py-4 cursor-pointer">
          <button onClick={() => setShowLogOut(true)}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
