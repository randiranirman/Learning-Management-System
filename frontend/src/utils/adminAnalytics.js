import axios from "axios"

const BASE_URL = "https://localhost:7082/api";

const getAdminOverviewInAnalytics = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Analytics`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin overview:", error);
        throw error;
    }
}

const getAllTeachersInSystem = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Analytics/teachers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
    }
}

const getAllStudentsInSystem = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Analytics/students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

const getSubjectsWithStudentCountByTeacherId = async (teacherId) => {
    try {
        const response = await axios.get(`${BASE_URL}/Analytics/teacher`, {
            params: { teacherId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects with student count:", error);
        throw error;
    }
}

// const filterStudentsByStudentIndexNo = (studentIndexNo) =>
    
export {
    getAdminOverviewInAnalytics,
    getAllTeachersInSystem,
    getAllStudentsInSystem,
    getSubjectsWithStudentCountByTeacherId
}