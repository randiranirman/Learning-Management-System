import { useState } from "react";
import AddCoursePopup from "../AdminComponents/AddCoursePopup";

const ManageCourses = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div  className="flex justify-between">
        <h1 className="font-semibold text-2xl">Manage Courses</h1>
        <button className="bg-primary text-white font-semibold rounded-lg px-4 py-2 cursor-pointer duration-200 hover:scale-120"
          onClick={() => setShowPopup(true)}
          
        >
          Add course
        </button>
        {showPopup && <AddCoursePopup onClose={() => setShowPopup(false)} />}
      </div>
    </>
  );
};

export default ManageCourses;
