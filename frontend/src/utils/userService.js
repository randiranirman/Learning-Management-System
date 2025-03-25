import axios from "axios";
export const deleteUser = async (username) => {
    try{
     const response = await axios.delete(`https://localhost:7265/user/${username}`);
 
     return response;  
 
 
    }catch(error){
     if( error.response){
       console.log("failed to delete user", error.response.data.message);
 
     }else{
       console.log("could not connect to the server", error.message);
     }
    }
 }