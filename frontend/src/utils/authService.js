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

export const logout = async () => {
  console.log("logout function called");

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

      // Clear token and redirect
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
      swal.fire("Error", "Failed to logout. Try again.", "error");
    }
  }
};


// this is the function for deconding the role from the token 

const getRoleFromToken = (token) => {
  try {
    // Check if token exists and has the correct format (3 parts separated by dots)
    if (!token || typeof token !== 'string') {
      console.warn("Token is null, undefined, or not a string");
      return null;
    }
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.warn("Invalid token format: token should have 3 parts separated by dots");
      return null;
    }
    
    const decodedToken = jwtDecode(token);
    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;

  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
}





export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  console.log("test login for is authenticated");
  
  if (!token) {
    return false;
  }
  
  try {
    // Check if token exists and is valid format
    if (typeof token !== 'string') {
      return false;
    }
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }
    
    // Decode the token to check expiration
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    
    // Check if token is expired
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.log("Token is expired");
      // Clear expired token
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("UserId");
      localStorage.removeItem("usernameFromToken");
      localStorage.removeItem("isFirstLogin");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const getUserRole = () => {
  // Use accessToken instead of refreshToken for getting user role
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? getRoleFromToken(accessToken) : null;
}

export const fetchAllUsers = async () => {
  try {
    // Get current user ID from token
    const currentUserId = getIdFromToken(localStorage.getItem("accessToken"));
    if (!currentUserId) {
      throw new Error("Current user ID not found in token.");
    }

    // Fetch all users
    const response = await axios.get('https://localhost:7033/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // Filter out the current user
    const users = response.data.filter(user => user.id !== currentUserId && user.Id !== currentUserId);

    return users;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};

export const getIdFromToken = (token) => {
  try {
    // Check if token exists and has the correct format
    if (!token || typeof token !== 'string') {
      console.warn("Token is null, undefined, or not a string");
      return null;
    }
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.warn("Invalid token format: token should have 3 parts separated by dots");
      return null;
    }
    
    const decodedToken = jwtDecode(token);
    const id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return id ? parseInt(id, 10) : null;

  } catch (error) {
    console.log("error decoding token ", error);
    return null;
  }
}
//function for decoding the loginAttempt from the token 
export const getIsFirstLoginFromToken = (token) => {
  try {
    // Check if token exists and has the correct format
    if (!token || typeof token !== 'string') {
      console.warn("Token is null, undefined, or not a string");
      return false;
    }
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.warn("Invalid token format: token should have 3 parts separated by dots");
      return false;
    }
    
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
    // Check if token exists and has the correct format
    if (!token || typeof token !== 'string') {
      console.warn("Token is null, undefined, or not a string");
      return null;
    }
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.warn("Invalid token format: token should have 3 parts separated by dots");
      return null;
    }
    
    const decodedToken = jwtDecode(token);
    const username = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    return username;
  } catch (error) {
    console.log("error decoding token ", error);
    return null;
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
// function for requesting password reset
export const requestPasswordReset = async( email) => {
  return await axios.post(`${API_URL}/request-password-reset`, {email} )
    .then(response => {
      console.log("Password reset requested successfully");
      return response.data;
    })
    .catch(error => {
      console.error("Error requesting password reset", error);
      throw error.response?.data || "Request failed";
    });
}
// function for resetting the password 
export const resetPassword= async( data) => {
  return await axios.post(`${API_URL}/reset-password`, data)
    .then(response => {
      console.log("Password reset successfully");
      return response.data;
    })
    .catch(error => {
      console.error("Error resetting password", error);
      throw error.response?.data || "Reset failed";
    });
}
