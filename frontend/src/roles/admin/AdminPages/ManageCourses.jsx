import { useState } from "react";
import AddCoursePopup from "../AdminComponents/AddCoursePopup";

const ManageCourses = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div >
        <h1>Manage Courses</h1>
        <button
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
