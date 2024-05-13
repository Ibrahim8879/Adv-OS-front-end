"use client"
import { useState } from 'react';

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  // Function to handle file upload
  const handleUpload = () => {
    setUploading(true);
    // Perform file upload logic here, e.g., upload files to a server
    setTimeout(() => {
      // Simulate upload completion after 2 seconds
      console.log('Files uploaded:', selectedFiles);
      setSelectedFiles([]);
      setUploading(false);
      setUploadSuccess(true);
      // Reset success message after 5 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
    }, 2000);
  };

  // Function to remove a file from the selectedFiles array
  const removeFile = (file) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  };

  // Function to handle "OK" click on success message
  const handleOkClick = () => {
    setUploadSuccess(false);
  };

  return (
    <main className="container mx-auto text-center mt-16">
        <h1 className="text-3xl font-bold mb-12 text-gray-100">Upload Files</h1>
        <label className="bg-gray-800 bg-opacity-85 hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          Select Files
        </label>
        {selectedFiles.length > 0 && (
          <div className="mt-4 text-left">
            <h2 className="text-lg font-semibold mb-2 text-gray-200">Selected Files:</h2>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-800 bg-opacity-85 px-4 py-2 mb-2 rounded">
                  <span className="text-gray-300">{file.name}</span>
                  <button onClick={() => removeFile(file)} className="text-red-500 hover:text-red-700 focus:outline-none">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
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
