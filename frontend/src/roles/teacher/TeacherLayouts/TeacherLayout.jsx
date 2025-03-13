import { Outlet } from "react-router-dom";
import TeacherSidebar from "../TeacherComponents/TeacherSidebar";

const TeacherLayout = () => {
  return (
    <>
      <TeacherSidebar />
      <Outlet /> 
    </>
  );
};

export default TeacherLayout;
