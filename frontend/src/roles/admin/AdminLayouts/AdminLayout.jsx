import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminComponents/AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
            <AdminSideBar />
      <div className="ml-[350px] flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
