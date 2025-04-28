import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onSubmit }) => {
  const [indexNumber, setIndexNumber] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0 && indexNumber) {
        onSubmit(indexNumber, acceptedFiles[0]);
        setIndexNumber('');
      }
    },
  });

  return (
    <div className="p-4 border rounded">
      <input
        type="text"
        placeholder="Enter Index Number"
        value={indexNumber}
        onChange={(e) => setIndexNumber(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <div {...getRootProps()} className="p-4 border-2 border-dashed cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop a PDF file here, or click to select one</p>
      </div>
    </div>
  );
  
};

export default FileUpload;