import React from 'react'

const UserDeletePopup = () => {
    

  return (
    
    <>
                <div>
                    Are you sure you want to delete this user?
                </div>
                <div>
                    <button className='px-2 py-2 bg-primary text-white font-semibold cursor-pointer'>Delete</button>
                    <button className='px-2 py-2 bg-red text-white font-semibold cursor-pointer'>Cancel</button>
                </div>
    </>
  )
}

export default UserDeletePopup
