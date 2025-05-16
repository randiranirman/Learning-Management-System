import { Outlet } from "react-router-dom";
import TeacherFullHeader from "../TeacherComponents/TeacherFullHeader";
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
