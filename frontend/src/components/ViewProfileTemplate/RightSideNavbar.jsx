import { useState } from "react";

const teacherCourses = ["Sinhala", "Information and  Communication Technology", "Mathematics", "English", "History", "Buddhist", "Tamil", "Commerce"];

const RightSideNavbar = () => {
  const [activeTab, setActiveTab] = useState("INTRODUCTION");

  return (
    <div className="w-full p-6">
      <div className="border-b flex space-x-8">
        {["INTRODUCTION", "COURSES", "RATINGS & REVIEWS"].map((tab) => (
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

      <div className="mt-6">
        {activeTab === "INTRODUCTION" && (
          <div>
            <p className="text-gray-700">
              I am passionate about making technology easy to understand. I have taught students at the Universities and guided professionals for the past 20 years.
            </p>

            <div className="mt-6">
              <h2 className="text-lg font-bold">Education</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Masters in Computer Science</li>
                <li>PhD in Computer Science and Engineering</li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold">Achievements</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Microsoft Certified Solution Developer</li>
                <li>Oakridge University, Assisted Faculty</li>
                <li>Guest Lecturer at Stanford University</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "COURSES" && (
          <div className="text-lg">
            <ul className="list-disc list-inside text-gray-600">
              {teacherCourses.map(course => (
                <li>{course}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "RATINGS & REVIEWS" && (
          <p className="text-gray-700">Ratings & Reviews section coming soon...</p>
        )}
      </div>
    </div>
  );
};

export default RightSideNavbar;
