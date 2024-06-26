"use client"
import { useState } from 'react';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const userPassword = localStorage.getItem('userPassword');
      formData.append('passwordHash', userPassword);

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setSelectedFile(null);
        setUploadSuccess(true);
        // Reset success message after 1 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 1000);
      } else {
        // Handle upload failure
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Upload failed:', error.message);
    } finally {
      setUploading(false);
    }
  };

  // Function to remove the selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  // Function to handle "OK" click on success message
  const handleOkClick = () => {
    setUploadSuccess(false);
  };

  return (
    <main className="container mx-auto text-center mt-16">
      <h1 className="text-3xl font-bold mb-12 text-gray-100">Upload File</h1>
      <label className="bg-gray-800 bg-opacity-85 hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
        Select File
      </label>
      {selectedFile && (
        <div className="mt-4 text-left">
          <h2 className="text-lg font-semibold mb-2 text-gray-200">Selected File:</h2>
          <div className="flex items-center justify-between bg-gray-800 bg-opacity-85 px-4 py-2 mb-2 rounded">
            <span className="text-gray-300">{selectedFile.name}</span>
            <button onClick={removeFile} className="text-red-500 hover:text-red-700 focus:outline-none">
              Remove
            </button>
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline ${uploading && 'opacity-50 cursor-not-allowed'}`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}
      {uploadSuccess && (
        <div className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded bg-opacity-80">
          <p>Upload successful! Congratulations!</p>
          <button onClick={handleOkClick} className="mt-2 bg-white text-green-500 font-semibold py-1 px-2 rounded hover:bg-green-200 focus:outline-none focus:shadow-outline">OK</button>
        </div>
      )}
    </main>
  );
};

export default UploadPage;
