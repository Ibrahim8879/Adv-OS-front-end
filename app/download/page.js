"use client"
import { useState, useEffect } from 'react';

const DownloadPage = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
        console.log(data);
      } else {
        console.error('Failed to fetch files:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error.message);
    }
  };

  return (
    <main className="container mx-auto text-center justify-center mt-24">
      <h1 className="text-3xl font-bold mb-16 text-gray-100">Download Files</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {files ? files.map((file) => (
          <div key={file.lastModified} className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-300">{file.filename}</h2>
            <p className="text-gray-300">Size: {file.size}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline">
              Download
            </button>
          </div>
        )) : <p className="text-gray-300">No files available</p>}
      </div>
    </main>
  );
};

export default DownloadPage;

