import axios from "axios";

const BASE_URL = "https://localhost:7082/api";

const getAllStudentsBySubjectId = async (subjectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/StudentMarksAnalytics/${subjectId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn("No students found for this subject.");
            return [];
        }
        console.log("Failed to load students: ", error);
        throw error;
    }
}

const getAllAssignmentsMarksByStudentId = async (subjectId, studentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/StudentMarksAnalytics`, {
            params: {
                subjectId,
                studentId
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside 2xx
            if (error.response.status === 404) {
                console.warn("No assignments found for this student.");
                return []; // or null, depending on what you want
            } else {
                console.error("Server error:", error.response.status);
            }
        } else if (error.request) {
            // Request was made but no response
            console.error("No response received:", error.request);
        } else {
            // Something else happened
            console.error("Error setting up request:", error.message);
        }
        throw error; // re-throw if needed
    }
}

const getAllAssignmentsWithSubmissionBySubjectId = async (subjectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/assignments/${subjectId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn("No Assignment found for this subject.");
            return [];
        }
        console.log("Failed to load Assignments: ", error);
        throw error;
    }
}

const getAllStudentsThatMadeSubmissionByAssignmentId = async (assignmentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/assignments`, {
            params:{
                assignmentId
            }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn("No Student found for this assignment.");
            return [];
        }
        console.log("Failed to load Students: ", error);
        throw error;
    }
}

const getAllSubjectsForGivenTeacher = async (teacherId) => {
    try {
        const response = await axios.get(`${BASE_URL}/teacher`, {
            params: {
                teacherId
            }
        })
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn("No Subejct was assigned for this teacher.");
            return [];
        }
        console.log("Failed to load Subejcts for this teacher: ", error);
        throw error;
    }
}


export {
    getAllStudentsBySubjectId,
    getAllAssignmentsMarksByStudentId,
    getAllAssignmentsWithSubmissionBySubjectId,
    getAllStudentsThatMadeSubmissionByAssignmentId,
    getAllSubjectsForGivenTeacher
}