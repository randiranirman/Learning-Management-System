const LogOutPopUp = ({ setShowLogOut }) => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
        onClick={() => setShowLogOut(false)} 
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6 w-96"
          onClick={(e) => e.stopPropagation()} 
        >
          <p className="text-lg font-semibold text-center mb-4">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-between">
            <button
              className="mx-4 bg-primary text-white rounded-md px-4 py-2 hover:transition transform hover:scale-110 duration-300 oi"
              onClick={() => {
                setShowLogOut(false);
              }}
            >
              Log Out
            </button>
            <button
              className="mx-4 text-gray-600 hover:text-gray-900"
              onClick={() => setShowLogOut(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogOutPopUp;
  