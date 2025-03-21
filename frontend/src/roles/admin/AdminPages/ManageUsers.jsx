import React, { useState } from 'react'
import ManageUserPopup from '../AdminComponents/ManageUserPopup';
import CurrentUser from '../AdminComponents/CurrentUser';

const ManageUsers = () => {
  const [showUserPopup, setShowUserPopup]= useState(false);

  return (
    <>
      <div className="flex justify-between  mx-2 mt-2 gap-x-4 max-w-[90%]">
  <h1 className="font-semibold text-2xl">Manage Users</h1>
  <button  
    onClick={() => setShowUserPopup(true)} 
    className="bg-primary text-white font-semibold rounded-lg cursor-pointer 
               transition-transform duration-200 hover:scale-110 px-3 py-2 gap-x-4">
    Add User
  </button>
  {showUserPopup && <ManageUserPopup setShowUserPopup={setShowUserPopup} />}
</div>
        <CurrentUser />
    </>
  )
}

export default ManageUsers
