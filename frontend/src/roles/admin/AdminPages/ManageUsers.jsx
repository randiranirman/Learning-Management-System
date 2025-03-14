import React, { useState } from 'react'
import ManageUserPopup from '../AdminComponents/ManageUserPopup';

const ManageUsers = () => {
  const [showUserPopup, setShowUserPopup]= useState("false");

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Manage Users</h1>
        <button  onClick={() => setShowUserPopup(true)} className="bg-primary text-white font-semibold rounded-lg cursor-pointer 
                           transition-transform duration-200 hover:scale-120">
          Add User
        </button>
        {showUserPopup && <ManageUserPopup setShowUserPopup= {setShowUserPopup}/>}
      </div>
    </>
  )
}

export default ManageUsers
