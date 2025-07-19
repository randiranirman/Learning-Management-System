import axios from "axios";

import swal from "sweetalert2";


const BASE_API_URL = "https://localhost:7293/api/StudentRegistration";
const REGISTER_API_URL = `${BASE_API_URL}/register`;
const FETCH_SUBJECTS_URL = "https://localhost:7293/studentSubjects/StudentSubject/subject"

export const registerStudent = async (studentData) => {
  const studentId = parseInt(localStorage.getItem("UserId"));
  console.log("Student ID from localStorage:", studentId);
  console.log("Student data received:", studentData);

  // Prepare the request body to match the backend DTO
  const requestBody = {
    name: studentData.name,
    studentId: studentId,
    classId: studentData.classId,
    subjectIds: studentData.subjectIds,
    indexNumber: studentData.indexNumber
  };

  console.log("Request body being sent:", requestBody);

  try {
    const response = await axios.post(REGISTER_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    });
    swal.fire("Success", "Student registered successfully", "success");
    return response.data;
  } catch (error) {
    console.error("Full error object:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      swal.fire("Error", `Failed to register student: ${error.response.data?.message || error.response.status}`, "error");
    } else if (error.request) {
      console.error("Request:", error.request);
      swal.fire("Error", "No response from server", "error");
    } else {
      console.error("Error message:", error.message);
      swal.fire("Error", "Failed to register student", "error");
    }
    throw error;
  }
};


export const getPendingRegistrations = async () => {
   try {
       const response = await axios.get(`${BASE_API_URL}/pending`, {
           headers: {
               Authorization: `Bearer ${localStorage.getItem("accessToken")}`
           }
       });
       return response.data;
   } catch (error) {
       console.error("Error fetching pending registrations:", error);
       throw error;
   }
};


export const fetchSubjectsFromStudentRegistration = async (studentId) => {
    studentId = parseInt(localStorage.getItem("UserId"));
    console.log("Fetching subjects for student ID:", studentId);

    try {
        const response = await axios.get(`${FETCH_SUBJECTS_URL}/${studentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("Subjects fetched successfully:", response.data);
        return response;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error;
    }
};

// Approve student registration
export const approveRegistration = async (registrationId, adminId) => {
    try {
        const response = await axios.post(
            `${BASE_API_URL}/approve/${registrationId}`,
            { adminId }, // Send adminId in request body
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        );
        console.log("Registration approved successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error approving registration:", error);
        if (error.response) {
            console.error("Approval error response:", error.response.data);
        }
        throw error;
    }
};

// Reject student registration
export const rejectRegistration = async (registrationId, adminId, reason) => {
    try {
        const response = await axios.put(
            `${BASE_API_URL}/reject/${registrationId}`,
            { 
                adminId, 
                reason 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        );
        console.log("Registration rejected successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error rejecting registration:", error);
        if (error.response) {
            console.error("Rejection error response:", error.response.data);
        }
        throw error;
    }
};

// Get student registrations by student ID
export const getStudentRegistrations = async (studentId) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/student/${studentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("Student registrations fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching student registrations:", error);
        throw error;
    }
};

// Get registration by ID
export const getRegistrationById = async (registrationId) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/${registrationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("Registration details fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching registration details:", error);
        throw error;
    }
};





