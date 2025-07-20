import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://localhost:7293/api/TeacherRegistration/register";
const REGISTER_API_URL ="https://localhost:7293/api/TeacherRegistration"

export const teacherRegistration = async (teacherData) => {
  console.log("Teacher data received:", teacherData);

  // Prepare the request body to match the backend DTO
  const requestBody = {
    teacherId: teacherData.teacherId || 0,
    employeeId: teacherData.employeeId,
    classIds: Array.isArray(teacherData.classIds) ? teacherData.classIds : [],
    subjectIds: Array.isArray(teacherData.subjectIds) ? teacherData.subjectIds : [],
    remarks: teacherData.remarks || "",
    teacherEmail: teacherData.teacherEmail,
    numberOfStudents: teacherData.numberOfStudents || 0,
    firstName: teacherData.firstName,
    subjectCode: Array.isArray(teacherData.subjectCode) ? teacherData.subjectCode : []
  };

  console.log("Request body being sent:", requestBody);

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    
    console.log("API Response:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Full error object:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      
      
      // Handle specific error cases
      if (error.response.status === 400) {
        throw new Error("Invalid data provided. Please check all required fields.");
      } else if (error.response.status === 401) {
        throw new Error("Unauthorized. Please log in again.");
      } else if (error.response.status === 403) {
        throw new Error("Forbidden. You don't have permission to perform this action.");
      } else if (error.response.status === 500) {
        throw new Error("Server error. Please try again later.");
      }
    } else if (error.request) {
      console.error("Request:", error.request);
      throw new Error("Network error. Please check your connection.");
    } else {
      console.error("Error message:", error.message);
      throw new Error("An unexpected error occurred.");
    }
    
    throw error;
  }
};

export const getPendingRegistrations = async () => {


  try {
    const response = await axios.get(`${REGISTER_API_URL}/pending`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    console.log("Pending registrations fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    throw new Error("Failed to fetch pending registrations.");
  }
}


export const approveTeacherRegistration = async (registrationBody) => {
  console.log("Approving registration with data:", registrationBody);

  const requestBody = {
    registrationId: registrationBody.registrationId,
    status: registrationBody.status, // Should be 0 (pending), 1 (approved), or 2 (rejected)
    adminId: registrationBody.adminId,
    remarks: registrationBody.remarks || ""
  };
  
  console.log("Request body being sent:", requestBody);

  try {
    const response = await axios.post(`${REGISTER_API_URL}/approve`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    console.log("Teacher registration approved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error approving teacher registration:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      
      // Handle validation errors
      if (error.response.status === 400 && error.response.data?.errors) {
        const validationErrors = error.response.data.errors;
        const errorMessages = Object.keys(validationErrors).map(key => 
          `${key}: ${validationErrors[key].join(', ')}`
        ).join('; ');
        throw new Error(`Validation failed: ${errorMessages}`);
      }
      
      throw new Error(`Failed to approve registration: ${error.response.data?.message || error.response.status}`);
    } else if (error.request) {
      console.error("Request:", error.request);
      throw new Error("No response from server");
    } else {
      console.error("Error message:", error.message);
      throw new Error("Failed to approve registration");
    }
  }
}
