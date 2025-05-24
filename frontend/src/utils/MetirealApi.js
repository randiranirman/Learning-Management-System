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

export {
    createMetireal,
    getAllMetireals
};