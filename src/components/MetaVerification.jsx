import React, { useState, useRef } from 'react';
import { FaFileUpload, FaInfoCircle, FaHistory } from 'react-icons/fa';

const MetadataVerification = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // ---- File Handlers ----
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/tiff'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload JPEG, PNG, PDF, or TIFF files');
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('File size exceeds 20MB limit');
      return;
    }

    setFile(selectedFile);
    setMetadata(null);
    setAnalysis(null);
  };

  const removeFile = () => {
    setFile(null);
    setMetadata(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---- API Call ----
  const analyzeMetadata = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError('');
    setMetadata(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://127.0.0.1:8000/api/metadata', {
  method: 'POST',
  body: formData,
});


      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

      const data = await res.json();
      setMetadata(data.metadata);
      setAnalysis(data.analysis);

    } catch (err) {
      console.error(err);
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <FaFileUpload className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Metadata Integrity Verification</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Upload a file to examine its metadata and check for inconsistencies or tampering.
          </p>

          {/* Upload Box */}
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-all 
              ${!file ? 'border-[#00ff41] bg-gray-800 hover:bg-gray-700' : 'border-gray-600'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <FaFileUpload className="text-4xl text-[#00ff41] mr-4" />
                  <div className="text-left">
                    <p className="text-lg font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {file.type} • {(file.size / (1024 * 1024)).toFixed(2)}MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-5xl text-[#00ff41] mb-4" />
                <p className="text-xl mb-2">Drag & Drop File Here</p>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, PDF, TIFF (Max 20MB)</p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf,.tiff"
            className="hidden"
          />

          {error && (
            <div className="text-red-400 mb-4 text-center">{error}</div>
          )}

          <button
            onClick={analyzeMetadata}
            disabled={!file || isAnalyzing}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
              ${file 
                ? 'bg-[#00ff41] text-black hover:opacity-80' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
              ${isAnalyzing ? 'opacity-70' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <FaHistory className="animate-spin mr-3" />
                Analyzing Metadata...
              </>
            ) : (
              'Verify Integrity'
            )}
          </button>
        </div>

        {/* Results Section */}
        {(metadata || analysis) && (
          <div className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Results</h2>

            {metadata && (
              <>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <FaInfoCircle className="mr-2 text-[#00ff41]" /> Extracted Metadata
                </h3>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mb-6">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </>
            )}

            {analysis && (
              <>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <FaHistory className="mr-2 text-[#00ff41]" /> AI Analysis
                </h3>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(analysis, null, 2)}
                </pre>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetadataVerification;
