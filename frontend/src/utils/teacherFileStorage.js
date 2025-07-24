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

const getAllSubjectMaterialsBySubjectId = async (subjectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/TeacherFiles/files`, {
            params: { 
                subjectId: subjectId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subject materials:", error);
        throw error;
    }
}

const createMaterial = async (topicid, materialRequest) => {
    try {
        console.log("request for material creation:", topicid, materialRequest);
        const response = await axios.post(`${BASE_URL}/TeacherFiles/files/create-material`, materialRequest, {
            params: { topicId: topicid }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating material:", error);
        throw error;
    }
}

const deleteTopicMaterials = async (materialId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/TeacherFiles/files/delete-material`, {
            params: { materialId: materialId }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting topic materials:", error);
        throw error;
    }
}

const updateTopicMaterials = async (materialId, materialRequest) => {
    try {
        console.log("Updating material with ID:", materialId, "Data:", materialRequest);
        const response = await axios.put(`${BASE_URL}/TeacherFiles/files/edit-material`, materialRequest, {
            params: { 
                materialId: materialId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating topic materials:", error);
        throw error;
    }
}

const createSubjectTopic = async (subjectId, topicName) => {
    try{
        const response = await axios.post(`${BASE_URL}/TeacherFiles/files/create-subject-topic`, 
            topicName,
            {
                params: { subjectId },
                headers: {
                "Content-Type": "application/json", // ensure correct content type
                },
            }
            );
        return response.data;
    } catch (error) {
        console.error("Error creating subject topic:", error);
        throw error;
    }
}

const editSubjectTopic = async (topicId, newTopicName)   => {
    try{
        const response = await axios.put(`${BASE_URL}/TeacherFiles/files/edit-subject-topic`, newTopicName, {
            params: {
                topicId: topicId
            },
            headers: {
                "Content-Type": "application/json", // ensure correct content type
            },
        });
        return response.data;
    } catch(error) {
        console.log("Error editing subject topic:", error);
        throw error;
    }
}

const deleteSubjectTopic = async (topicId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/TeacherFiles/files/delete-subject-topic`, {
            params: {
                topicId: topicId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting subject topic:", error);
        throw error;
    }
}

const getAllSubmissionsByAssignmentId = async (assignmentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/TeacherFiles/submissions`, {
            params: {
                assignmentId: assignmentId
            }
        });
        console.log("Reponse for fetch submissions:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching submissions by assignment ID:", error);
        throw error;
    }
}

export {
    getSubjectsByTeacherId,
    getAssignmentsBySubjectId,
    addNewAssignment,
    updateAssignmentById,
    deleteAssignmentById,
    getAllSubjectMaterialsBySubjectId,
    createMaterial,
    deleteTopicMaterials,
    createSubjectTopic,
    editSubjectTopic,
    updateTopicMaterials,
    deleteSubjectTopic,
    getAllSubmissionsByAssignmentId
}