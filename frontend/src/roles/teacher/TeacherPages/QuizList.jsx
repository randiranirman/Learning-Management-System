import React, { useState } from 'react';
import SubjectDropdown from '../TeacherComponents/SubjectDropdown';
import QuizItem from '../TeacherComponents/QuizItem';

const QuizList = () => {
  const [, setSelectedSubject] = useState('01');
  
  // Mock data - this would typically come from an API
  const quizzes = [
    { id: '01', name: 'Quiz - 01', submissions: 35 },
    { id: '02', name: 'Quiz - 02', submissions: 35 },
    { id: '03', name: 'Quiz - 03', submissions: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Submissions</h1>
        
        <SubjectDropdown onSelectSubject={setSelectedSubject} />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <div className="font-bold text-gray-700">Quiz Name</div>
            <div className="font-bold text-gray-700">Total Submissions</div>
          </div>
          
          {quizzes.map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;