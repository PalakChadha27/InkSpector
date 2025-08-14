import React, { useState } from 'react';
import { FaHome, FaTools, FaBook, FaUserPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      id="analysis"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto rounded-lg shadow-md p-8 bg-gray-900">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: '#00ff41' }}
          >
            Forensic Document Analysis
          </h1>
          <p className="text-white mb-8">
            ISO 27001 Certified Document Authentication with 17 forensic markers
          </p>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-all ${
              isDragging ? 'border-[#00ff41] bg-gray-800/40' : 'border-[#00ff41]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ transition: 'all 0.3s ease' }}
          >
            <div className="flex flex-col items-center justify-center">
              <svg
                className="w-12 h-12 text-[#00ff41] mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-white mb-2">
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : 'Drag & Drop Suspect Document'}
              </p>
              <p className="text-sm text-gray-400 mb-4">PDF, JPEG, PNG (Max 10MB)</p>
              <label className="cursor-pointer bg-[#00ff41] hover:bg-[#00e036] text-gray-900 px-4 py-2 rounded-md font-semibold">
                Select File
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
          </div>

          {/* Analysis Button */}
          <button
            onClick={() => alert('Analyzing...')}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              selectedFile
                ? 'bg-[#00ff41] hover:bg-[#00e036] text-gray-900 cursor-pointer'
                : 'bg-gray-700 text-white cursor-not-allowed'
            }`}
            disabled={!selectedFile}
          >
            Analyze Document
          </button>
        </div>
      </main>
    </div>
  );
};

export default Analysis;