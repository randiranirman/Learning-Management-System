import axios from "axios";

const studentService = {
  getStudentDetails: async (studentId) => {
    try {
      const response = await axios.get(`/api/students/${studentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student details", error);
      throw error;
    }
  },

  updateStudentDetails: async (studentId, details) => {
    try {
      const response = await axios.put(`/api/students/${studentId}`, details);
      return response.data;
    } catch (error) {
      console.error("Error updating student details", error);
      throw error;
    }
  }
};

export default studentService;
