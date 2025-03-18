
const AllCourses = ({ subjectDetails }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-0 border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-primary">
            <th className="px-4 py-2 text-left text-sm font-medium text-white text-xl">
              Subject Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white text-xl">
              Subject Code
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white text-xl">
              Teacher
            </th>
            <th className="px-4 py-2 text-white text-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjectDetails.map(course => (
            <tr key={course.subjectCode} className="border-b">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {course.subjectCodeNavigation.title}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{course.subjectCodeNavigation.code}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{course.teacher.fullName}</td>
              <td className="px-4 py-3 text-right text-sm font-medium flex gap-4 justify-center">
                <button className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCourses;
