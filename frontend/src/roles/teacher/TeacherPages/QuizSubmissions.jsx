import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizSubmissions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-6">
          <button 
            className="mr-4 text-indigo-700 hover:text-indigo-900"
            onClick={() => navigate('/')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-indigo-700">Submissions</h1>
        </div>
        
        <p className="text-gray-700">Viewing submissions for Quiz {id}</p>
        {/* You would implement the submissions list here based on j.png */}
      </div>
    </div>
  );
};

export default QuizSubmissions;