import React, { useState } from 'react';

const SubjectDropdown = ({ onSelectSubject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Subject 01');

  const subjects = [
    { id: '01', name: 'Subject 01' },
    { id: '02', name: 'Subject 02' }
  ];

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject.name);
    setIsOpen(false);
    onSelectSubject(subject.id);
  };

  return (
    <div className="relative w-fit">
      <div 
        className="flex items-center justify-between w-36 p-3 text-white bg-indigo-600 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedSubject}</span>
        <svg 
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full bg-indigo-600 rounded-lg mt-1 shadow-lg">
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              className="p-3 text-white hover:bg-indigo-700 cursor-pointer"
              onClick={() => handleSelectSubject(subject)}
            >
              {subject.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectDropdown;