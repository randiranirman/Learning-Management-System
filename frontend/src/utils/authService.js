/* eslint-disable no-unused-vars */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert2";

const API_URL = "https://localhost:7033/api/auth"; // Base API URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });

    // Store tokens in localStorage
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    const { accessToken, refreshToken } = response.data;
    const role = getRoleFromToken(accessToken);
    const id = getIdFromToken(accessToken);
    const usernameFromToken = getUserNameFromToken(accessToken);
    const isFirstLogin = getIsFirstLoginFromToken(accessToken);
    localStorage.setItem("isFirstLogin", isFirstLogin)
      ;
    localStorage.setItem("usernameFromToken", usernameFromToken);
    localStorage.setItem("UserId", id);
    console.log("Role", role);
    return role;

  } catch (error) {
    console.error("Login failed", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Login failed!");
  }
};

// register the user 
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;

  } catch (error) {
    throw error.response?.data?.message || error.message;

  }
};


//logout  the users  by removing the tokens 
export const logout = async () => {
  console.log("logout function called")
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
    const result = await swal.fire({
          title: 'Are you sure?',
          text: "You will be logged out.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, log out!'
        });

        
    
        if (result.isConfirmed) {
          // clear session/local storage
           // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    

    // Redirect to the login page
    window.location.href = "/";
          
        }

   
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// this is the function for deconding the role from the token 

const getRoleFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null

  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }




}





export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  console.log("test login for is authenticated");
  return token !== null && token !== undefined;

};

export const getUserRole = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken ? getRoleFromToken(refreshToken) : null;
}

export const fetchAllUsers = async (currentUserId) => {
  try {
    const response = await axios.get('https://localhost:7033/user');
    currentUserId=getIdFromToken(localStorage.getItem("accessToken"));
    const users = response.data.filter( user => user.Id !== currentUserId); 

    return users;
  } catch (error) {
    console.error("error fetching users ", error);
  }


}

export const getIdFromToken = (token) => {


  try {
    const decodedToken = jwtDecode(token);

    const id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return id ? parseInt(id, 10) : null;

  } catch (error) {
    console.log("error decoding token ", error);
  }


}
//function for decoding the loginAttempt from the token 
export const getIsFirstLoginFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const isFirstLogin = decodedToken["isFirstLogin"];
    return isFirstLogin === 'True' || isFirstLogin === true;
  } catch (error) {
    console.log("Error decoding token: ", error);
    return false;
  }
};
// function for decoding  the username from the token 
export const getUserNameFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    return username;
  } catch (error) {
    console.log("error decoding token ", error);
  }
}

// function for changing the password 
export const changeCredentials = async (username, formDetails) => {

  try {
    const response = await axios.post(`${API_URL}/update-credentials/${username}`,
      formDetails
    );
    console.log(username)
    window.location.href ="/";
    return response.data;

  } catch (error) {
    console.log(error)
    throw error.response?.data || "something went wrong";
  }

}
