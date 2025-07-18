

import axios from 'axios';

const API_URL = "https://localhost:7293/subjects/Subject"; // Base API URL


export const fetchAllSubjects =  async () =>  {
    
    try{
        const response =   await axios.get(`${API_URL}/getAllSubjects`);

        console.log("Fetched subjects:", response.data);
        return response.data;
    }catch(error) {
        console.error("Error fetching subjects:", error);
        throw error;
    }



}

export const addSubject =  async (subjectData) => {
    try {
        const response = await axios.post(`${API_URL}/create-subjects`, subjectData);
        console.log("Subject added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding subject:", error);
        throw error;
    }
}