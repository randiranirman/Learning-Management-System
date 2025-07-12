import axios from "axios";

const BASE_URL = "https://localhost:7082/api/StudentMarksAnalytics";

const getAllStudentsBySubjectId = async (subjectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${subjectId}`);
        return response.data;
    } catch (error) {
        console.log("Failed to load students: ", error);
        throw error;
    }
}

export {
    getAllStudentsBySubjectId
}