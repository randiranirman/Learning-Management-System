const ManageAssignments = ({ assignmentTitle, Subject, assignedTeacher, dueDate }) => {
  return (
    <>
      <h1>Manage Assignments</h1>
      <div>
        <div>
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
              <tr>
                <th>{assignmentTitle}</th>
                <th>{Subject}</th>
                <th>{assignedTeacher}</th>
                <th>{dueDate}</th>
                <th>
                  <button>Edit</button>
                  <button>Reassign</button>
                  <button>Delete</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageAssignments;
