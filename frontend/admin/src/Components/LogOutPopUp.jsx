const LogOutPopUp = ({ onCloseLogOut }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()} 
      >
        <p className="text-lg font-semibold text-center mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-between">
          <button
            className="mx-4 bg-primary text-white rounded-md px-4 py-2 hover:scale-110 transition-transform duration-200"
            onClick={onCloseLogOut}
          >
            Log Out
          </button>
          <button
            className="mx-4 bg-primary text-white rounded-md px-4 py-2   bg-red"
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
