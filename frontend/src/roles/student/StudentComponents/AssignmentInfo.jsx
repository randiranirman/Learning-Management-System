

function AssignmentInfo({ openDate, dueDate }) {
  return (
    <div className="mb-6">
      <div className="mb-1">
        <span className="font-semibold">Opened:</span>{" "}
        <span className="text-gray-600">{openDate}</span>
      </div>
      <div>
        <span className="font-semibold">Due:</span>{" "}
        <span className="text-gray-600">{dueDate}</span>
      </div>
    </div>
  );
}

export default AssignmentInfo;