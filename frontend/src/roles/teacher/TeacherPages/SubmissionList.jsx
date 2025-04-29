const SubmissionList = ({ submissions }) => {
    return (
      <div className="w-full h-screen p-10 bg-white">
        <h2 className="p-5 mb-4 text-lg font-bold text-slate-950">Subject 01 - Quiz 01</h2>
        <table className="w-full p-5 text-center">
          <thead >
            <tr>
              <th className="p-2 text-gray-500 ">Index Number</th>
              <th className="p-2 text-gray-500">Submission</th>
            </tr>
          </thead>
          <tbody className="items-end border-2">
            {submissions.map((submission, index) => (
              <tr key={index} className="items-end border-b border-zinc-950">
                <td className="items-center p-5 text-gray-950 ">{submission.indexNumber}</td>
                <td className="flex justify-center space-x-4 border-2 p-7">
                  <span className="text-gray-600">{submission.fileName}</span>
                  <button
                    className="px-2 py-1 m-5 rounded-lg t-ext-white bg-primary"
                    onClick={() => window.open(`/view/${submission.fileName}`, '_blank')}
                  >
                    View
                  </button>
                  <button
                    className="px-2 py-1 m-5 text-white rounded-lg bg-primary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = `/download/${submission.fileName}`; 
                      link.download = submission.fileName;
                      link.click();
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SubmissionList;