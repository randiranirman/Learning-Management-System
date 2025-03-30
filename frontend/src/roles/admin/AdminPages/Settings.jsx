import React from 'react'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
   const navigate = useNavigate();
  return (
    

    <>
        <h1 className='font-semibold text-2xl'>Settings</h1>
        <div className=' flex flex-row mt-4'>
            <div className='max-w-1/2 flex flex-col py-2 space-y-2 px-2 border-1 '>

                <p> FirstName</p>
                <p> LastName</p>
                <p> Address</p>
                <p> ContactNumber</p>
            <button onClick={() => navigate("/editProfile")} className='bg-primary text-white font-semibold px-1 py-1 rounded-lg items-center cursor-pointer'>Edit Profile </button>

            </div>

        </div>

    </>
  )
}

export default Settings
