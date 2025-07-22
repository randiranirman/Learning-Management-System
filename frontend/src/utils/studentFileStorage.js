import axios from "axios";

const BASE_URL = "https://localhost:7212/api/StudentFiles";

const getAllSubjectMaterialsBySubjectIdForStudent = async (subjectId) => {
    try {
        const resposne = await axios.get(`${BASE_URL}/files`, {
            params: {
                subjectId: subjectId
            }
        });
        return resposne.data;
    } catch (error) {
        console.log(`Error while fetching subjects: ${error}`);
        throw error;
    }
}

const getAllAssignmentsBySubjectIdForStudent = async (subjectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/assignments`, {
            params: {
                subjectId: subjectId
            }
        });
        return response.data;
    } catch (error) {
        console.log(`Error while fetching assignments: ${error}`);
        throw error;
    }
}

// this is for load submission for student in specific assignment
const getSubmissionForStudentAndAssignment = async (studentId, assignmentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/submissions/${studentId}/${assignmentId}`);
        return response.data;
    } catch (error) {
        console.log(`Error while fetching submission: ${error}`);
        throw error;
    }
}

// made a submission for assignment by student
const madeSubmissionForAssignmentByStudent = async (madeSubmissionRequest) => {
    try {
        const response = await axios.post(`${BASE_URL}/submissions/made-submissions`, madeSubmissionRequest);
        return response.data;
    } catch (error) {
        console.log(`Error while making submission: ${error}`);
        throw error;
    }
}

// edit a submission that made by student himself
const editSubmissionForAssignmentByStudent = async (submissionId, editSubmissionRequest) => {
    try {
        const response = await axios.put(`${BASE_URL}/submissions/edit-submissions`, editSubmissionRequest, {
            params: {
                submissionId: submissionId
            }
        });
        return response.data;
    } catch (error) {
        console.log(`Error while editing submission: ${error}`);
        throw error;
    }
}

// delete a submission made by student
const deleteSubmissionForAssignmentByStudent = async (submissionId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/submissions/delete-submissions`, {
            params: {
                submissionId: submissionId
            }
        });
        return response.data;
    } catch (error) {
        console.log(`Error while deleting submission: ${error}`);
        throw error;
    }
}

export {
    getAllSubjectMaterialsBySubjectIdForStudent,
    getAllAssignmentsBySubjectIdForStudent,
    getSubmissionForStudentAndAssignment,
    madeSubmissionForAssignmentByStudent,
    editSubmissionForAssignmentByStudent,
    deleteSubmissionForAssignmentByStudent
}