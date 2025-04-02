import axios from "axios";

const BASE_URL= "https://localhost:7265/api/admin";


export const getAdminDetails =  async ( id ) => {
    
    try{
        const response = await axios.get(`${BASE_URL}/${id}`);
                return response.data;
        }catch(error){
            console.error(error + "error getting details");
            return null;
        }




}

export const editAdminDetails = async (updatedData) => {
    const id = localStorage.getItem("UserId"); 
    if (!id) {
        throw new Error("User ID not found in localStorage");
    }

    console.log("Updating admin with ID:", id);

    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}` 
            }
        });

        if (response.status === 200) {
            console.log("Edited details successfully");
            return response.data;
        }
    } catch (error) {
        console.error("Error editing details:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to edit details");
    }
};
