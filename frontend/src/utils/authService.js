/* eslint-disable no-unused-vars */
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "https://localhost:7265/api/auth"; // Base API URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

    // Store tokens in localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    const {accessToken,refreshToken}= response.data;
    const role = getRoleFromToken(accessToken);
    console.log("Role", role);
    return role;

  } catch (error) {
    console.error("Login failed", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Login failed!");
  }
};

// register the user 
export const registerUser = async  (userData) => {
  try{
    const response = await axios.post(`${API_URL}/register`,userData);
    return response.data; 

  }catch(error){
    throw error.response?.data?.message || error.message;

}
};
export const logout = async () => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");

    // Redirect to the login page
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

const getRoleFromToken = (token) => {
 try{
    const decodedToken= jwtDecode(token);
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null

 }catch(error){
  console.error("Error decoding token", error);
  return null;
 }

 


}





export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return token !== null && token !== undefined;

};

export const getUserRole = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken ? getRoleFromToken(refreshToken) : null;
}

export const fetchAllUsers = async () => {
   try{
    const response= await axios.get('https://localhost:7265/user');
  return response.data;
   }catch(error){
    console.error("error fetching users ", error);
   }
   
  
}

