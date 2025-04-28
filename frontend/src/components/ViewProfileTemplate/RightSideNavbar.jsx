import { useState } from "react";

const teacherCourses = [
  "Sinhala", "Information and Communication Technology", "Mathematics", "English", "History", "Buddhist", "Tamil", "Commerce"
];

const RightSideNavbar = () => {
  const [activeTab, setActiveTab] = useState("ABOUT");

  const TeacherId = "1001";
  const FullName = "Chanuka Dasun";
  const Birthday = "2002-10-11";
  const Email = "chanuka@gmail.com";
  const ContactNo = "+94 715593983";
  const Address = "No: 32, Kalugalpitiya, Badulla";

  return (
    <div className="w-full p-6">
      <div className="border-b flex space-x-8 pb-2">
        {["ABOUT", "COURSES"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-4 font-semibold ${
              activeTab === tab ? "border-b-4 border-gray-600 text-gray-900" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white">
        {activeTab === "ABOUT" && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Details</h2>
            <ul className="text-lg text-gray-800 space-y-3">
              <li><span className="font-semibold">ID:</span> {TeacherId}</li>
              <li><span className="font-semibold">Full Name:</span> {FullName}</li>
              <li><span className="font-semibold">Birthday:</span> {Birthday}</li>
              <li><span className="font-semibold">Email:</span> {Email}</li>
              <li><span className="font-semibold">Contact No:</span> {ContactNo}</li>
              <li><span className="font-semibold">Address:</span> {Address}</li>
            </ul>
          </div>
        )}

        {activeTab === "COURSES" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Courses Taught</h2>
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {teacherCourses.map((course, index) => (
                <li
                  key={index}
                  className="p-3 bg-blue-100 rounded-lg text-blue-900"
                >
                  {course}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideNavbar;
