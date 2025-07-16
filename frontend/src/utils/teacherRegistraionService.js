import axios from "axios";

const API_URL = "https://localhost:7293/api/TeacherRegistration/register";





 export const teacherRegistration = async  ( studentData) => {


    const teacherId = parseInt(localStorage.getItem("UserId"));
    console.log("Teacher ID from localStorage:", teacherId);
    console.log("Teacher data received:", studentData);

    // Prepare the request body to match the backend DTO
    const requestBody = {
      name: studentData.name,
      teacherId: teacherId,
      subjectIds: studentData.subjectIds,
      indexNumber: studentData.indexNumber
    };

    console.log("Request body being sent:", requestBody);

    try {
      const response = await axios.post(API_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Full error object:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    }
 }