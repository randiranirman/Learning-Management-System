import Sidebar from "../AdminComponents/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-[350px] flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
