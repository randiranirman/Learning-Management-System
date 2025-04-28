import { useState, useEffect } from 'react';
import SubmissionList from './SubmissionList';
import FileUpload from './FileUpload';
import '../../../index.css';
function ViewSubmission() {
  const [submissions, setSubmissions] = useState([
    { indexNumber: '12345', fileName: 'Answers.pdf' },
    { indexNumber: '13467', fileName: 'Answers.pdf' },
    { indexNumber: '24689', fileName: 'Answers.pdf' },
  ]);

 
  useEffect(() => {
   
  }, []);
  const handleNewSubmission = (indexNumber, file) => {
    setSubmissions([...submissions, { indexNumber, fileName: file.name }]);
  };

  return (
    <div className="w-screen p-6 bg-white rignt">
      <h1 className="w-full h-full pt-10 m-4 text-3xl font-bold text-primary">Submissions</h1>

      <div className="mb-1">
        <select className="p-3 text-center text-white rounded-lg cursor-pointer bg-primary">
          <option>Select Subject</option>
          <option>Subject 01 - Quiz 01</option>
        </select>
      </div>

      <SubmissionList submissions={submissions} />

      <FileUpload onSubmit={handleNewSubmission} />
    </div>
  );
}

export default ViewSubmission;