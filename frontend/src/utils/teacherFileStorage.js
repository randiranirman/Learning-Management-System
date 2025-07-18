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

export {
    getSubjectsByTeacherId
}