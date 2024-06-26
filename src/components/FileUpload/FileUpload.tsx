// src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFilePath(response.data.filePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button>Upload</button>
      {filePath && (
        <div>
          <p>File uploaded to:</p>
          <a href={filePath} target="_blank" rel="noopener noreferrer">
            {filePath}
          </a>
        </div>
      )}
    </form>
  );
};

export default FileUpload;
