const AllCourses = ({ subjectDetails }) => {
  return (
    <>
      <div>
        <h1 className="text-black 500">All Courses</h1>
        {subjectDetails.map(subject => (
          <div key={subject.subjectCode}>
            <p>
              {`SubjectTitle = ${subject.subjectCodeNavigation.title}, SubjectCode = ${subject.subjectCodeNavigation.code}, Grade = ${subject.subjectCodeNavigation.grade}, TeacherId = ${subject.teacher.id}, TeacherName = ${subject.teacher.fullName}`}
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCourses;
