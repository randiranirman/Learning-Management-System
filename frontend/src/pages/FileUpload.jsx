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

  
};

export default FileUpload;