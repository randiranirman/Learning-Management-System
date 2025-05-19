import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminComponents/AdminSideBar";
import { useState } from "react";
const AdminLayout = () => {
   const [collapsed, setCollapsed] = useState(false);
  
    const sidebarWidth = collapsed ? 80 : 250; // match Ant Design collapsed width
  return (
    <div >
            <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div 
       style={{
          marginLeft: sidebarWidth,
          padding: '1rem',
          transition: 'margin-left 0.2s ease-in-out',
        }}
     >
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
