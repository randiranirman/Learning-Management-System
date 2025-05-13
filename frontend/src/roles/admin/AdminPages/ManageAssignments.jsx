const ManageAssignments = () => {
  const assignments = [
    {
      title: "Math Homework",
      subject: "Mathematics",
      teacher: "Mr. Perera",
      dueDate: "March 15, 2025",
    },
    {
      title: "English Essay",
      subject: "English",
      teacher: "Mr. De Silva",
      dueDate: "March 18, 2025",
    },
  ];

  return (
    <div>
      <div className="display flex flex-row   justify-between max-w-4/5  mx-4 px-2  py-4 ">
        <h1 className="font-semibold  text-2xl">Manage Assignments</h1>
        <button className="bg-primary  rounded-lg  text-white font-semibold  px-2 py-2 cursor-pointer  hover:scale-110 transform duration-200">Add Assignment</button>
      </div>

      <div>
        <h2>All Assignments</h2>
        <table>
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Subject</th>
              <th>Assigned Teacher</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.title}</td>
                <td>{assignment.subject}</td>
                <td>{assignment.teacher}</td>
                <td>{assignment.dueDate}</td>
                <td>
                  <button>Edit</button>
                  <button>Reassign</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAssignments;
