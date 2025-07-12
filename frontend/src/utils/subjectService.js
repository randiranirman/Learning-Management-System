

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