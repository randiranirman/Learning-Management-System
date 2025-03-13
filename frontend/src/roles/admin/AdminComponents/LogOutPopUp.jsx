const LogOutPopUp = ({ onCloseLogOut }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-bold">Are you sure you want to log out?</p>
        <div className="mt-4 flex justify-between">
          <button 
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-red"
            onClick={() => console.log("Logging out...")} 
          >
            Log Out
          </button>
          <button 
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-primary hover:text-white transition duration-200"
            onClick={onCloseLogOut}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutPopUp;
