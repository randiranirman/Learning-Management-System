import { Outlet } from "react-router-dom";
import TeacherFullHeader from "../TeacherComponents/TeacherFullHeader";

const TeacherLayout = () => {
  return (
    <>
    <div>
      <TeacherFullHeader />
    </div>
    <div>
      <Outlet /> 
    </div>
    </>
  );
};

export default TeacherLayout;
