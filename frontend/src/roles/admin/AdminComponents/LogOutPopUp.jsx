const LogOutPopUp = ({ setShowLogOutPopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg- bg-opacity-30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <p className="text-lg font-bold text-center">Are you sure you want to log out?</p>

        <div className="mt-4 flex justify-between">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 w-full"
            onClick={() => console.log("Logging out...")} 
          >
            Log Out
          </button>
          <button 
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-primary hover:text-white transition duration-200 w-full ml-2"
            onClick={() => setShowLogOutPopup(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutPopUp;
