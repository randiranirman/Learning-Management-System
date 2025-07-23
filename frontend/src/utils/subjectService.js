import axios from 'axios';

const API_URL = "https://localhost:7293/subjects/Subject"; // Base API URL

// Helper function to get authentication headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    } : {
        'Content-Type': 'application/json'
    };
};

export const fetchAllSubjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllSubjects`, {
            headers: getAuthHeaders()
        });
        console.log("Fetched subjects:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects:", error);
        throw error;
    }
};

export const addSubject = async (subjectData) => {
    try {
        const payload = {
            id: 0, // Backend expects id field
            name: subjectData.name,
            code: subjectData.code,
            description: subjectData.description
        };
        
        console.log("Sending payload:", payload);
        const response = await axios.post(`${API_URL}/create-subjects`, payload, {
            headers: getAuthHeaders()
        });
        console.log("Subject added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding subject:", error);
        console.error("Error details:", error.response?.data);
        throw error;
    }
};

export const updateSubject = async (subjectId, subjectData) => {
    try {
        if (!subjectId) {
            throw new Error('Subject ID is required for updating');
        }
        
        const payload = {
            id: subjectId,
            name: subjectData.name,
            code: subjectData.code,
            description: subjectData.description
        };
        
        console.log("Updating subject with payload:", payload);
        const response = await axios.put(`${API_URL}/subject/update/${subjectId}`, payload, {
            headers: getAuthHeaders()
        });
        console.log("Subject updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating subject:", error);
        console.error("Error details:", error.response?.data);
        throw error;
    }
};

export const deleteSubject = async (subjectId) => {
    try {
        if (!subjectId) {
            throw new Error('Subject ID is required for deletion');
        }
        
        console.log("Deleting subject with ID:", subjectId);
        const response = await axios.delete(`${API_URL}/delete/${subjectId}`, {
            headers: getAuthHeaders()
        });
        console.log("Subject deleted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting subject:", error);
        console.error("Error details:", error.response?.data);
        throw error;
    }
};

export const getSubjectById = async (subjectId) => {
    try {
        if (!subjectId) {
            throw new Error('Subject ID is required');
        }
        
        const response = await axios.get(`${API_URL}/${subjectId}`, {
            headers: getAuthHeaders()
        });
        console.log("Subject fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching subject:", error);
        console.error("Error details:", error.response?.data);
        throw error;
    }
};