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
      <div>
        <h1>Manage Assignments</h1>
        <button>Add Assignment</button>
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
