import React, { useEffect, useState } from 'react';
import ManageUserPopup from '../AdminComponents/ManageUserPopup';
import { fetchAllUsers } from '../../../utils/authService';
import { deleteUser } from '../../../utils/userService';
import Swal from 'sweetalert2';
const ManageUsers = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        if (usersData) {
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, []);

  const handleUserAdded = async (newUser) => {
   
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowUserPopup(false);
  };
  const  handleDeleteUser = async(username) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if( result.isConfirmed){
      try{
        const response = await deleteUser(username);
      if ( response.status === 200){
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
        Swal.fire('Deleted!', 'User has been deleted successfully.', 'success');
      }else{
  
        console.error("Error Deleting User")
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
      }catch(error){
        console.error("Error deleting user ",error)
      }

    }
   
     
  }

  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mx-4 mt-4 max-w-[90%]">
        <h1 className="font-semibold text-2xl">Manage Users</h1>  
        <button
          onClick={() => setShowUserPopup(true)}
          className="bg-primary text-white font-semibold rounded-lg cursor-pointer 
                     transition-transform duration-200 hover:scale-110 px-4 py-2"
        >
          Add User
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-4 mx-4">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-6 py-3 rounded-tl-lg">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 ">Role</th>
              <th className='px-6 py-3 rounded-tr-lg' >Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 transition">
                  <td className="px-6 py-3 font-semibold">{user.username}</td>
                  <td className="px-6 py-3 font-semibold ">{user.email}</td>
                  <td className="px-6 py-3  font-semibold ">{user.name}</td>
                  <td className="px-6 py-3 font-semibold ">{user.role}</td>
                  <td className="px-6 py-3 font-semibold ">
                    <button className="bg-primary text-white font-semibold rounded-lg cursor-pointer 
                     transition-transform duration-200 hover:scale-110 px-4 py-2 mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user.username)} className="bg-red-500 text-white font-semibold rounded-lg cursor-pointer 
                     transition-transform duration-200 hover:scale-110 px-4 py-2">
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4 text-gray">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Popup */}
      {showUserPopup && <ManageUserPopup setShowUserPopup={setShowUserPopup} onUserAdded={handleUserAdded} />}
    </>
  );
};

export default ManageUsers;
