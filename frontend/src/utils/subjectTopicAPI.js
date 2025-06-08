import axios from "axios";

const BASE_URL = "https://localhost:7212/api/subjectTopic"

const editTopic = async (topicId, newTopicName) => {
    try {
        const requestObject = {
            topicName: newTopicName
        }
        console.log("params for editTopic: ", topicId, requestObject);
        const response = await axios.put(`https://localhost:7212/api/subjectTopic/${topicId}`, requestObject);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("Error when run edit topic: ", error);
        throw error;
    }
}

export {editTopic};