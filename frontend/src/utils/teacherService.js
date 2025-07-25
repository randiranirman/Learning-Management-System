import axios from "axios";

// Correct endpoints based on your backend routing
const BASE_API_URL = "https://localhost:7033/user/edit-teacher";
const GET_TEACHER_URL = "https://localhost:7033/user/teachers";

export const editTeacherDetails = async (updatedData) => {
    const id = localStorage.getItem("UserId");

    if (!id) {
        throw new Error("User ID not found in localStorage");
    }

    const backendData = {
        teacherID: parseInt(id),
        teacherName: updatedData.firstName || updatedData.teacherName || "",
        contactNumber: updatedData.contactNumber || "",
        fullname: `${updatedData.firstName || ""} ${updatedData.lastName || ""}`.trim(),
        email: updatedData.email || ""
    };

    try {
        const response = await axios.put(`${BASE_API_URL}/${id}`, backendData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        if (response.status === 200) {
            console.log("Teacher details updated successfully.");
            return response.data;
        }
    } catch (error) {
        console.error("Error editing details:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to edit teacher details");
    }
};

export const getTeacherDetails = async (id) => {
    try {
        const response = await axios.get(`${GET_TEACHER_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching teacher details:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch teacher details");
    }
};
