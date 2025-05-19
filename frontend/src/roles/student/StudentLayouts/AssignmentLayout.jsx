

function AssignmentLayout({ title, children }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#7865F1] text-white p-4 text-xl font-semibold">
        {title}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

export default AssignmentLayout;