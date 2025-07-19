import axios from "axios";

const BASE_URL = "https://localhost:7212/api";

const getSubjectsByTeacherId = async (teacherId) => {
    try {
        const response = await axios.get(`${BASE_URL}/TeacherFiles/classes`, {
            params: { teacherId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching teacher subjects:", error);
        throw error;
    }
}

const getAssignmentsBySubjectId = async (subjectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/TeacherFiles/assignments`, {
            params: { subjectId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching assignments by subject ID:", error);
        throw error;
    }
}

const addNewAssignment = async (assignment) => {
    try {
        const response = await axios.post(`${BASE_URL}/TeacherFiles/assignments/create-assignment`, assignment);
        return response.data;
    } catch (error) {
        console.error("Error adding new assignment:", error);
        throw error;
    }
}

const updateAssignmentById = async (id, updatedAssignment) => {
    try {
        const response = await axios.put(`${BASE_URL}/TeacherFiles/assignments/edit-assignment`, updatedAssignment, {
            params: { 
                assignmentId: id
            }
        });
        console.log("Assignment updated successfully:", response);
        return response.data;
    } catch (error) {
        console.error("Error updating assignment:", error);
        throw error;
    }
}

const deleteAssignmentById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/TeacherFiles/assignments/delete-assignment`, {
            params: { assignmentId: id }
        });
        console.log("Assignment deleted successfully:", response);
        return response.data;
    } catch (error) {
        console.error("Error deleting assignment:", error);
        throw error;
    }
}

export {
    getSubjectsByTeacherId,
    getAssignmentsBySubjectId,
    addNewAssignment,
    updateAssignmentById,
    deleteAssignmentById
}