

import axios from 'axios'
import Swal from 'sweetalert2';






const API_URL = "https://localhost:7293/classes/Class"; // Base API URL

// this is the function for creating class
export const createClass = async ( classData) => {


    try {
        const response = await axios.post(`${API_URL}/create-class`, classData);

        console.log("Class created successfully:", response.data);
        Swal.fire({
            title: 'Success',
            text: 'Class created successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        return response.data;
    }catch(error) {
        console.log( "some thing went wrong "  , error)
    }
}

// this is the function for fetching all classes
// it will return all classes

export const fetchAllClasses = async ( ) => {


     try {
        const response = await  axios.get(`${API_URL}/getAllClasses`);
        console.log("Fetched classes:", response.data);

        return response.data;

     }catch( error) {
        console.log("Error fetching classes:", error);
     }
}