
const ManageAssignments = ({assignmentTitle,Subject,assignedTeacher,dueDate}) => {
  return (
    <>
      <h1 className="text-3xl text-black font-normal pb-6">Manage Assignments</h1>
      <div className="container">
        <div>
          <table className="table-auto w-full rounded-lg   overflow-hidden">
            <thead className="bg-primary text-white font-semibold ">
              <tr>
                <th className="px-3 py-4 text-semibold">Assignment Title</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Assnoteigned Teacher</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-black font-semibold text-xl mt-2">
              <tr >
                <th className="px-3 py-4 text-normal">{assignmentTitle}</th>
                <th className="px-6 py-4 text-normal">{Subject}</th>
                <th className="px-6 py-4 text-normal">{assignedTeacher}</th>
                <th className="px-6 py-4 text-normal">{dueDate}</th>
                <th className="px-6 py-4 gap-1">
                  <button className="bg-primary rounded-md px-3 py-1 text-white  m-1 :hover hover:scale-125 transition-transform duration-300 ">Edit</button>
                  <button className="bg-green rounded-md px-3 py-1 text-white  m-1 hover:scale-125 transition-transform duration-300">Reassign</button>
                  <button className="bg-red rounded-md px-2 py-1 text-white    m-1 hover:scale-125 transition-transform duration-300">Delete</button>
                  
                </th>
              </tr>
            </tbody>  
          </table>
        </div>
      </div>
    </>
  );
  


}

export default ManageAssignments;
