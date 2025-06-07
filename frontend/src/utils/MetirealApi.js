import axios from "axios";

const BASE_URL = "https://localhost:7212/api/metireals";

const createMetireal = async (topicId, requestData) => {
    try {
        const requestBody = {
            UploadLink: requestData.uploadLink,
            FileType: requestData.fileType,
            SavedName: requestData.savedName
        };
        console.log(topicId, requestData, requestBody);
        const response = await axios.post(`https://localhost:7212/api/metireals/${topicId}`, requestBody);
        return response.data;
    } catch(error) {
        console.log("Failed to create metireal: ", error);
        throw error;
    }
}

const getAllMetireals = async () => {
    try {
        const response = await axios.get(`https://localhost:7212/api/metireals`);
        return response.data;
    } catch(err) {
        console.log("Error while getAllMetireals: ", err);
        throw err;
    }
}

const deleteMetireal = async (metirealId) => {
    try {
        const response = await axios.delete(`https://localhost:7212/api/metireals/${metirealId}`);
        return response;
    } catch(error) {
        console.log(`Error while delete metireal:${metirealId}`, error);
        throw error;
    }
}

const editMetirealSavedName = async (metirealId, newNameObject) => {
    try {
        const response = await axios.put(`https://localhost:7212/api/metireals/${metirealId}`, newNameObject);
        return response;
    } catch(error) {
        console.log(`Error while Edit metireal name:${metirealId}`, error);
        throw error;
    }
}

export {
    createMetireal,
    getAllMetireals,
    deleteMetireal,
    editMetirealSavedName
};