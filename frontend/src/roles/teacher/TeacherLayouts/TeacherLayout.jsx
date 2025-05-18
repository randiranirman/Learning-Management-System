import { Outlet } from "react-router-dom";
import TeacherSideBar from "../TeacherComponents/TeacherSideBar";

const TeacherLayout = () => {
  return (
    <>
    <div>
      <TeacherSideBar />
    </div>
    <div>
      <Outlet /> 
    </div>
    </>
  );
};

export default TeacherLayout;
