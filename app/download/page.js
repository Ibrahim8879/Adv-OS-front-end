"use client";
import { useState, useEffect } from 'react';
import pako from 'pako';

const DownloadPage = () => {
  const [files, setFiles] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [downloadfilename, setDownloadfilename] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const userPassword = localStorage.getItem('userPassword');
      const response = await fetch('http://localhost:5000/files', { method: 'GET', headers: { 'passwordHash': userPassword }});
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

  const handleDownload = async (filename) => {
    try {
      setDownloading(true);
      setDownloadfilename(filename);

      const userPassword = localStorage.getItem('userPassword');

      // Send a request to download the file with password hash
      const response = await fetch(`http://localhost:5000/download/${filename}`, {
        method: 'GET',
        headers: {
          'passwordHash': userPassword,
        },
      });

      if (response.ok) {
        // The file is downloaded successfully
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // Decompress the file using pako
        const decompressed = pako.ungzip(new Uint8Array(arrayBuffer));

        // Determine the correct MIME type based on the file extension
        let mimeType = 'application/octet-stream';
        if (filename.endsWith('.pdf')) {
          mimeType = 'application/pdf';
        } else if (filename.endsWith('.doc') || filename.endsWith('.docx')) {
          mimeType = 'application/msword';
        } // Add more conditions for other file types if necessary

        // Create a blob from the decompressed data
        const decompressedBlob = new Blob([decompressed], { type: mimeType });

        // Initiate a download of the decompressed file
        const url = window.URL.createObjectURL(decompressedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

      } else {
        // Handle download failure
        console.error(`Failed to download ${filename}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Failed to download ${filename}:`, error.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="container mx-auto text-center justify-center mt-24">
      <h1 className="text-3xl font-bold mb-16 text-gray-100">Download Files</h1>
      {downloading && <p className="mt-6 text-white text-3xl mb-6">Downloading File {downloadfilename}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(files && files.length > 0) ? files.map((file) => (
            <div key={file.lastModified} className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-300">{file.filename}</h2>
              <p className="text-gray-300">Size: {file.size}</p>
              <button onClick={() => handleDownload(file.filename)} disabled={downloading} className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline ${downloading && 'opacity-50 cursor-not-allowed'}`}>
                {downloading ? 'Downloading...' : 'Download'}
              </button>
            </div>
        )) : <p className="text-gray-300">No files available</p>}
      </div>
    </main>
  );
};

export default DownloadPage;
