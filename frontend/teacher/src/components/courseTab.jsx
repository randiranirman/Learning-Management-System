// src/components/CourseTab.jsx
import React from 'react';

const CourseTab = ({ title, count }) => {
  return (
    <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: '#7865F1', color: 'white', height:'150px', textAlign:'justify' }}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default CourseTab;