const AddCoursePopup = ({
  onClose,
  subjectTitle,
  setSubjectTitle,
  grade,
  setGrade,
  teacherId,
  setTeacherId,
  handleSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg- bg-opacity-10 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 animate-slideIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-black">Add Course</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Subject Title:</label>
            <input
              type="text"
              name="subjectTitle"
              value={subjectTitle}
              onChange={(e) => setSubjectTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">Grade:</label>
            <input
              type="number"
              name="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Teacher Id:</label>
            <input
              type="text"
              name="teacherId"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
              className="w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red  text-white font-medium rounded-md hover cursor-pointer hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white cursor-pointer font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePopup;
