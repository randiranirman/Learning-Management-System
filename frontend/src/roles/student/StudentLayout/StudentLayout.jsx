import { Outlet } from "react-router-dom";
import StudentFullHeader from "../StudentComponents/StudentFullHeader";

const StudentLayout = () => {
  return (
    <>
    <div>
      <StudentFullHeader   />
    </div>
    <div>
      <Outlet /> 
    </div>
    </>
  );
};

export default StudentLayout;
