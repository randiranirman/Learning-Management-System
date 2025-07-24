import axios from "axios"

const BASE_URL = "https://localhost:7082/api";
const USER_URL = "https://localhost:7033";
const COURSE_URL = "https://localhost:7293";

const getAdminOverviewInAnalytics = async () => {
    try {
        const response = await axios.get(`${USER_URL}/user/get-students-and-teachers-count`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin overview:", error);
        throw error;
    }
}

const getAllTeachersInSystem = async () => {
    try {
        const response = await axios.get(`${COURSE_URL}/registrations/teachers/Teacher/get-all-teachers-with-subjectCount`);
        return response.data;
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
    }
}

const getAllStudentsInSystem = async () => {
    try {
        const response = await axios.get(`${USER_URL}/user/students/get-all-students`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}

const getSubjectsWithStudentCountByTeacherId = async (teacherId) => {
    try {
        const response = await axios.get(`${COURSE_URL}/subjects/Subject/get-all-subjectDetails-withStudentCount-by-teacherId`, {
            params: {
                teacherId: teacherId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching subjects with student count:", error);
        throw error;
    }
}

    
export {
    getAdminOverviewInAnalytics,
    getAllTeachersInSystem,
    getAllStudentsInSystem,
    getSubjectsWithStudentCountByTeacherId
}