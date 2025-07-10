import { Outlet } from "react-router-dom";
import StudentSideBar from "../StudentComponents/StudentSideBar";
import { useState } from "react";
const StudentLayout = () => {
   const [collapsed, setCollapsed] = useState(false);
  
    const sidebarWidth = collapsed ? 80 : 250; // match Ant Design collapsed width
  return (
    <div >
            <StudentSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
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

export default StudentLayout;
