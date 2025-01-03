const ManageCourses = () => {
  return (
    <>
      <div className="container flex flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-semibold">Manage Courses</h1>
        <button className="text-2xl bg-primary rounded-md text-white p-3 hover:scale-125 transition-transform duration-300">
          Add course
        </button>
      </div>
    </>
  );
}

export default ManageCourses;
