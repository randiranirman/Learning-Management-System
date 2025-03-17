import Sidebar from "../AdminComponents/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
