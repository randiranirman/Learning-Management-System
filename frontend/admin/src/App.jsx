import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageAssignments from "./pages/ManageAssignments";
import ManageCourses from "./pages/ManageCourses";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="flex h-screen">
      
      <Sidebar />

      
      <div className="flex-1 bg-gray-100 p-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manange-assignments" element={<ManageAssignments />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>

    </div>

  );
};

export default App;
