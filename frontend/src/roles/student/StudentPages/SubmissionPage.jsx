import { useState } from 'react';
import AssignmentLayout from '../StudentLayouts/AssignmentLayout';
import AssignmentInfo from '../StudentComponents/AssignmentInfo';
import SubmissionStatus from '../StudentComponents/SubmissionStatus';
import ActionButtons from '../StudentComponents/ActionButtons';

function SubmissionPage() {
  const [submissionData] = useState({
    openDate: "Monday, 11 November 2024, 12:00AM",
    dueDate: "Monday, 9th December 12:00AM",
    status: "Submitted for Grading",
    timeRemaining: "1 day remaining",
    submissionTime: "2 days early",
    lastModified: "-",
    gradingStatus: "Not Graded Yet"
  });

  const handleEditSubmission = () => {
    console.log("Editing submission...");
    // Add your edit submission logic here
  };

  const handleRemoveSubmission = () => {
    console.log("Removing submission...");
    // Add your remove submission logic here
  };

  return (
    <AssignmentLayout title="Assignment - Lesson 02">
      <AssignmentInfo 
        openDate={submissionData.openDate} 
        dueDate={submissionData.dueDate} 
      />

      <div className="text-lg font-semibold my-5">
        Submission is successful!
      </div>

      <SubmissionStatus 
        status={submissionData.status}
        timeRemaining={submissionData.timeRemaining}
        submissionTime={submissionData.submissionTime}
        lastModified={submissionData.lastModified}
        gradingStatus={submissionData.gradingStatus}
      />

      <ActionButtons 
        onEdit={handleEditSubmission} 
        onRemove={handleRemoveSubmission} 
      />
    </AssignmentLayout>
  );
}

export default SubmissionPage;