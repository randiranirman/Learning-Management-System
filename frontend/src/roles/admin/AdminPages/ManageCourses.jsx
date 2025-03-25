import { useState, useEffect } from "react";
import AddCoursePopup from "../AdminComponents/AddCoursePopup";
import AllCourses from "../AdminComponents/AllCourses.jsx";
import subjectApi from "../../../api/subjects.js";
import EditCoursePopUp from "../AdminComponents/EditCoursePopUp.jsx";
import DeleteAlert from "../AdminComponents/DeleteAlert.jsx";

const ManageCourses = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [showEditSubjectPopup, setShowEditSubjectPopup] = useState(false);
  const [showDeleteSubjectPopup, setShowDeleteSubjectPopup] = useState(false);

  const [subjectCode, setSubjectCode] = useState("");
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
      const response = await subjectApi.post(
        `/subjects?assignTeacherId=${teacherId}`,
        newSubject
      );

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

  const handleDelete = async (Code) => {
    try {
      await subjectApi.delete(`/subjects/${Code}`);

      const response = await subjectApi.get("/teacherSubject");
      setAllSubjects(response.data);

      setShowDeleteSubjectPopup(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (Code) => {
    const updatedSubjectBody = {
      title: subjectTitle,
      grade: grade,
      assignedTeacherId: teacherId
    }
    try {
      const response = await subjectApi.put(`/subjects/${Code}`, updatedSubjectBody);
      const newSubjectList = await subjectApi.get("/teacherSubject");
      setAllSubjects(newSubjectList);
      setShowEditSubjectPopup(false);
      setSubjectTitle('');
      setTeacherId('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-2 mx-2 max-w-[90%]">
        <h1 className="font-semibold text-2xl">Manage Courses</h1>
        <button
          className="bg-primary text-white font-semibold rounded-lg px-4 py-2 cursor-pointer duration-200 hover:scale-120"
          onClick={() => setShowPopup(true)}
        >
          Add course
        </button>
      </div>

      <div className="p-10">
        <AllCourses
          subjectDetails={allSubjects}
          showEditPopup={() => setShowEditSubjectPopup(true)}
          showDeletePopup={() => setShowDeleteSubjectPopup(true)}
          setSubjectCode={(newSubjectCode) => setSubjectCode(newSubjectCode)}
        />
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

      {showEditSubjectPopup && (
        <EditCoursePopUp
          handleEdit={handleEdit}
          onClose={() => setShowEditSubjectPopup(false)}
          subjectCode={subjectCode}
          subjectTitle={subjectTitle}
          setSubjectTitle={setSubjectTitle}
          grade={grade}
          setGrade={setGrade}
          teacherId={teacherId}
          setTeacherId={setTeacherId}
        />
      )}

      {showDeleteSubjectPopup && (
        <DeleteAlert 
          onClose={() => setShowDeleteSubjectPopup(false)} 
          subjectCode={subjectCode}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ManageCourses;
