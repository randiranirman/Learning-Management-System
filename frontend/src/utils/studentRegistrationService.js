import axios from "axios";

import swal from "sweetalert2";


const REGISTER_API_URL = "https://localhost:7293/registrations/students/student"; // Base API URL


export const  registerStudent =  async( studentData)=> {
      const studentId = localStorage.getItem("UserId");

    try {
        const response = await axios.post(REGISTER_API_URL/`${studentId}`, studentData);
        swal.fire("Success", "Student registered successfully", "success");
        return response.data;
    } catch (error) {
        swal.fire("Error", "Failed to register student", "error");
        console.error("Error registering student:", error);
        throw error;
    }

}





