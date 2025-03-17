import { useState, useEffect } from "react";
import AddCoursePopup from "../AdminComponents/AddCoursePopup";
import AllCourses from "../AdminComponents/AllCourses.jsx";
import subjectApi from '../../../api/subjects.js';

const ManageCourses = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [subjectTitle, setSubjectTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await subjectApi.get("/teacherSubject"); 
        console.log(response.data);
        setAllSubjects(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newSubject = {
      title: subjectTitle,
      grade: parseInt(grade, 10),
    };
    console.log(newSubject);

    try {
      console.log("Teacher ID before request:", teacherId);
      const response = await subjectApi.post(`/subjects?assignTeacherId=${teacherId}`, newSubject);

      console.log(response.data);
      
      setAllSubjects([...allSubjects, response.data]);

      setSubjectTitle("");
      setGrade("");
      setTeacherId("");

      setShowPopup(false);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Manage Courses</h1>
        <button
          className="bg-primary text-white font-semibold rounded-lg px-4 py-2 cursor-pointer duration-200 hover:scale-120"
          onClick={() => setShowPopup(true)}
        >
          Add course
        </button>
      </div>

      <div>
        <AllCourses subjectDetails={allSubjects} />
      </div>

      {showPopup && (
        <AddCoursePopup
          onClose={() => setShowPopup(false)}
          subjectTitle={subjectTitle}
          setSubjectTitle={setSubjectTitle}
          grade={grade}
          setGrade={setGrade}
          teacherId={teacherId}
          setTeacherId={setTeacherId}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ManageCourses;
