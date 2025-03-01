// src/pages/CourseDashboard.jsx
import React, { useState, useEffect } from 'react';
import CourseTab from '../components/CourseTab';

const CourseDashboard = () => {
  // Mock data (replace this with your actual data)
  const mockData = {
    enrolledCourses: 0,
    completeCourses: 0,
    subjects: 1,
    totalStudents: 0,
  };

  // State to hold the data
  const [data, setData] = useState({
    enrolledCourses: 0,
    completeCourses: 0,
    subjects: 1,
    totalStudents: 0,
  });

  // State to handle loading and error states
  const [loading, setLoading] = useState(true);

  // Simulate fetching data (using mock data)
  useEffect(() => {
    // Simulate a delay (e.g., 1 second) to mimic an API call
    const timer = setTimeout(() => {
      setData(mockData); // Set the mock data
      setLoading(false); // Set loading to false
    }, 1000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  // Display loading state
  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-3 gap-10">
        <CourseTab title="Enrolled Courses" count={data.enrolledCourses} />
        <CourseTab title="Complete Courses" count={data.completeCourses} />
        <CourseTab title="Subjects" count={data.subjects} />
        <CourseTab title="Total Students" count={data.totalStudents} />
      </div>
    </div>
  );
};

export default CourseDashboard;