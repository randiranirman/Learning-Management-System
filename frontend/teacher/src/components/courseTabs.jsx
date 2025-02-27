// src/components/CourseTabs.jsx
import React, { useEffect, useState } from 'react';
import CourseTab from './courseTab';

const CourseTabs = () => {
  const [data, setData] = useState({
    enrolledCourses: 0,
    completeCourses: 0,
    subjects: 1,
    totalStudents: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/course-data'); // Replace with your API endpoint
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <CourseTab title="Enrolled Courses" count={data.enrolledCourses} />
      <CourseTab title="Complete Courses" count={data.completeCourses} />
      <CourseTab title="Subjects" count={data.subjects} />
      <CourseTab title="Total Students" count={data.totalStudents} />
    </div>
  );
};

export default CourseTabs;