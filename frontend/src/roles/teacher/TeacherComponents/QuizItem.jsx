import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuizItem = ({ quiz }) => {
  const navigate = useNavigate();

  const handleViewSubmissions = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="flex justify-between items-center py-4 border-b h-[100px]">
      <div className="text-gray-800 font-medium">{quiz.name}</div>
      <div className="flex items-center space-x-4">
        <span className="font-medium text-gray-800">{quiz.submissions}</span>
        <button
          className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          onClick={handleViewSubmissions}
        >
          View Submissions
        </button>
      </div>
    </div>
  );
};

export default QuizItem;