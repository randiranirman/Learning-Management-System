
import { useState } from "react";
import AddCoursePopup from "../Components/AddCoursePopup";
const ManageCourses = () => {

    const [showPopup , setShowwPopup ]=  useState(false);

  return (
    <>
      <div className="container flex flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-semibold">Manage Courses</h1>
        <button onClick={() => setShowwPopup(true)} className="text-2xl bg-primary rounded-md text-white p-3 hover:scale-125 transition-transform duration-300">
          Add course
        </button>
        {showPopup && <AddCoursePopup onClose={() => setShowwPopup(false)} />}
      </div>
    </>
  );
}

export default ManageCourses;
