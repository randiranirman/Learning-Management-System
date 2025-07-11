import axios  from "axios";

const API_URL = "https://localhost:7033/api/admin/upload-csv";

export const uploadCSV = async ( file ) => {
    // retrieve  the token from the local storage 
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        throw new Error("No authentication token found. Please login again.");
    }

    try {
        const response = await axios.post( API_URL,  file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization':`Bearer ${token}`
            }
        });

        if(response.status === 200){
            console.log("CSV file uploaded successfully");
            return response.data;
        } else {
            console.log("Error uploading CSV file");
            throw new Error("Failed to upload CSV file");
        }
    } catch (error) {
        // Handle authentication errors
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/";
            throw new Error("Authentication failed. Please login again.");
        }
        throw error;
    }
}
