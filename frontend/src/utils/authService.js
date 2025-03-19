import axios from "axios"

export  const logout = async () => {
    try {
        
        await axios.post(
          "https://localhost:7265/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
            },
          }
        );
  
        // Clear tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
  
        // Redirect to the login page
        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed", error);
      }
}