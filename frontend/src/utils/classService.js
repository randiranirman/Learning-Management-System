

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

export const deleteClass = async  ( classID) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteClassById/${classID}`);
        console.log("Class deleted successfully:", response.data);
        
        await Swal.fire({
            title: 'Deleted!',
            text: 'The class has been deleted successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        
        return true; // Return true on successful deletion

    } catch( error) {
        console.log("Error deleting class:", error);
        
        await Swal.fire({
            title: 'Error',
            text: 'Failed to delete class. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        
        return false; // Return false on error
    }
}

export const updateClass=  async(requestBody ) => {


    try {
        const response = await axios.put(`${API_URL}/class/updateClass`, requestBody);
        console.log("Class updated successfully:", response.data);
        
        await Swal.fire({
            title: 'Success',
            text: 'Class updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        
        return response.data;
    }catch( error) {
        console.log("Error updating class:", error);
        
        await Swal.fire({
            title: 'Error',
            text: 'Failed to update class. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        
        throw error; // Re-throw the error for further handling if needed
    }

}
