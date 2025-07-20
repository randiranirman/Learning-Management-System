import axios from "axios";

const BASE_URL = "https://localhost:7033/user/edit-student";
const URL = "https://localhost:7033/user/students";

export const editStudentDetails = async (updatedData) => {
    const id = localStorage.getItem("UserId"); 
    if (!id) {
        throw new Error("User ID not found in localStorage");
    }

    console.log("Updating student with ID:", id);

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

export const getStudentDetails = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching student details:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch student details");
    }
};
