import { useState } from "react";
import EditProfile from "./EditProfile";

const Settings = () => {
  const [showEditProfile, setShowEditProfile]= useState(false);
  



  


  return (

    <>
        
        <button  onClick={() => setShowEditProfile(true)} className="px-2 py-2 bg-primary   text-white rounded-lg cursor-pointer hover:scale-110 duration-200 transition font-semibold mt-2 mx-4"> Edit Profile</button>
        {showEditProfile && <EditProfile setShowEditProfile ={setShowEditProfile}/> }
    </>
  )
} 

export default Settings
