import axios from "axios";

import swal from "sweetalert2";


const REGISTER_API_URL = "https://localhost:7293/api/StudentRegistration/register"; // Updated API URL

export const registerStudent = async (studentData) => {
  const studentId = parseInt(localStorage.getItem("UserId"));
  console.log("Student ID from localStorage:", studentId);

  // Prepare the request body to match the backend DTO
  const requestBody = {
    
    studentId: studentId,
    classId: studentData.classId,
    subjectIds: studentData.subjectIds,
    indexNumber: studentData.indexNumber,
    name: studentData.name || "" // Add name if required
  };

  try {
    const response = await axios.post(REGISTER_API_URL, requestBody);
    swal.fire("Success", "Student registered successfully", "success");
    return response.data;
  } catch (error) {
    swal.fire("Error", "Failed to register student", "error");
    console.error("Error registering student:", error);
    throw error;
  }
};




