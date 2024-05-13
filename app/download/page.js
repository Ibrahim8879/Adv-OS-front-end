"use client"
import { useState } from 'react';

const DownloadPage = () => {
  const [files] = useState([
    { id: 1, name: 'Document 1.pdf', size: '1.5 MB' },
    { id: 2, name: 'Presentation.pptx', size: '2.2 MB' },
    { id: 3, name: 'Image.jpg', size: '500 KB' },
    { id: 4, name: 'Spreadsheet.xlsx', size: '3.1 MB' },
  ]);

  return (
    <main className="container mx-auto text-center mt-24">
        <h1 className="text-3xl font-bold mb-16 text-gray-300">Download Files</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div key={file.id} className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-300">{file.name}</h2>
              <p className="text-gray-300">Size: {file.size}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline">
                Download
              </button>
            </div>
          ))}
        </div>
      </main>
  );
};

export default DownloadPage;
