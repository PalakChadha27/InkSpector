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
        <div className="bg-gray-800 rounded-xl p-8 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">🧾 Results Summary</h2>

          {metadata && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-[#00ff41]">
                <FaInfoCircle className="mr-2" /> Extracted Metadata
              </h3>
              <div className="bg-gray-900 p-5 rounded-lg text-sm grid grid-cols-1 gap-4">
                {Object.entries(metadata).length > 0 ? (
                  Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-700 pb-1">
                      <span className="text-gray-300 font-medium">{key}</span>
                      <span className="text-gray-100">{JSON.stringify(value)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No metadata found.</p>
                )}
              </div>
            </div>
          )}

          {analysis && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-[#00ff41]">
                <FaHistory className="mr-2" /> AI Analysis
              </h3>

              <div className="bg-gray-900 p-5 rounded-lg text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Tampering Status</span>
                  <span className={`font-semibold ${analysis.is_tampered ? "text-red-400" : "text-green-400"}`}>
                    {analysis.is_tampered ? (
                      <>
                        <FaExclamationTriangle className="inline mr-1" />
                        Tampered
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="inline mr-1" />
                        Clean
                      </>
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Confidence</span>
                  <span className="text-gray-100">{(analysis.confidence * 100).toFixed(2)}%</span>
                </div>

                {analysis.features && (
                  <div className="mt-4">
                    <p className="text-gray-300 font-medium mb-2">Anomaly Features</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(analysis.features).map(([feature, value]) => (
                        <li
                          key={feature}
                          className={`flex justify-between px-4 py-2 rounded-md ${
                            value ? "bg-red-600/20 text-red-300" : "bg-green-600/20 text-green-300"
                          }`}
                        >
                          <span className="capitalize">{feature.replace(/_/g, " ")}</span>
                          <span className="font-semibold">{value ? "Anomalous" : "Normal"}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};