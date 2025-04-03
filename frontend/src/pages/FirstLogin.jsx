import React from 'react'

const FirstLogin = () => {
  return (
    
    <>
            <div>
                    <h1 className='font-semibold text-2xl'>Change Password</h1>
                    <label>Temporary Password
                        <input placeholder='Enter the temporary password' className='rounded-lg' type="text" />


                    </label>
                    <label>New  Password
                        <input placeholder='Enter the new password' className='rounded-lg' type="text" />



                    </label>
                    <label>Confirm Password
                        <input placeholder='Confirm Password' className='rounded-lg' type="text" />



                    </label>
                    
            </div>
    </>
  )
}

export default FirstLogin
