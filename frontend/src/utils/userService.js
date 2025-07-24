import axios from "axios";
import Swal from "sweetalert2"; // Correct import with capital S

const API_URL = "https://localhost:7033/api/admin/updateUserDetails";

export const deleteUser = async (username) => {
  try {
    const response = await axios.delete(`https://localhost:7033/user/${username}`);
    return response;
  } catch (error) {
    if (error.response) {
      console.log("failed to delete user", error.response.data.message);
    } else {
      console.log("could not connect to the server", error.message);
    }
  }
}

export const editUserDetails = async (updatedData) => {
  try {
    const response = await axios.put(`${API_URL}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    console.log("User details edited successfully:", response.data);
    
    // Correct SweetAlert2 usage
    Swal.fire({
      title: "Success",
      text: "User details updated successfully",
      icon: "success",
      confirmButtonText: "OK" // Use confirmButtonText instead of button
    });
    
    return response.data;
  } catch (error) {
    // Correct SweetAlert2 usage with proper case
    Swal.fire({
      title: "Error",
      text: "Failed to update user details",
      icon: "error",
      confirmButtonText: "OK" // Use confirmButtonText instead of button
    });
    
    console.log("Error editing user details:", error.response?.data || error.message);
    throw error; // Re-throw error so the component can handle it
  }
}