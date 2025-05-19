

function SubmissionStatus({ status, timeRemaining, submissionTime, lastModified, gradingStatus }) {
  return (
    <div className="w-full mb-6">
      <div className="flex w-full">
        <div className="w-2/5 bg-[#7865F1] text-white p-3 font-medium">
          Submission status
        </div>
        <div className="w-3/5 bg-[#f4f4f9] p-3">
          {status}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/5 bg-[#f4f4f9] p-3 font-medium">
          Time remaining
        </div>
        <div className="w-3/5 bg-white p-3">
          {timeRemaining}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/5 bg-[#7865F1] text-white p-3 font-medium">
          Submission time
        </div>
        <div className="w-3/5 bg-[#f4f4f9] p-3">
          {submissionTime}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/5 bg-[#f4f4f9] p-3 font-medium">
          Last modified
        </div>
        <div className="w-3/5 bg-white p-3">
          {lastModified}
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-2/5 bg-[#7865F1] text-white p-3 font-medium">
          Grading Status
        </div>
        <div className="w-3/5 bg-[#f4f4f9] p-3">
          {gradingStatus}
        </div>
      </div>
    </div>
  );
}

export default SubmissionStatus;
