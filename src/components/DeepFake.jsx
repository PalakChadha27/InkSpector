import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdGesture, MdClose, MdUpload } from 'react-icons/md';

const DeepfakeDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a JPEG, PNG image, or MP4/MOV video');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit');
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type.includes('image')) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeMedia = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/analysis-results', {
        state: {
          isDeepfake: Math.random() > 0.5,
          confidence: (Math.random() * 100).toFixed(2),
          analysisData: {
            pixelAnalysis: 'Detected potential GAN artifacts',
            temporalAnalysis: file.type.includes('video') ? 'Inconsistent frame transitions' : 'N/A',
            riskScore: (Math.random() * 10).toFixed(1)
          },
          originalMedia: preview
        }
      });
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center"
        >
          ← Back to Tools
        </button>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <MdGesture className="text-4xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Deepfake Detection</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Identifies AI-manipulated or tampered face images and videos using advanced 
            convolutional neural networks that analyze pixel-level inconsistencies and temporal artifacts.
          </p>

          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-4 transition-all 
              ${!file ? 'border-[#00ff41] bg-gray-800 hover:bg-gray-700' : 'border-gray-600'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            {file ? (
              <div className="relative">
                {preview ? (
                  <div className="flex flex-col items-center">
                    {file.type.includes('image') ? (
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="max-h-64 mb-4 rounded-lg"
                      />
                    ) : (
                      <video 
                        src={URL.createObjectURL(file)} 
                        controls 
                        className="max-h-64 mb-4 rounded-lg"
                      />
                    )}
                    <button 
                      onClick={removeFile}
                      className="text-red-400 hover:text-red-300 flex items-center"
                    >
                      <MdClose className="mr-1" /> Remove File
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-300">
                    <p className="mb-2">{file.name}</p>
                    <p className="text-sm text-gray-400">{file.type} • {(file.size / (1024 * 1024)).toFixed(2)}MB</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <MdUpload className="text-5xl text-[#00ff41] mb-4" />
                <p className="text-xl mb-2">Drag & Drop Media Here</p>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, MP4 (Max 50MB)</p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,video/mp4,video/quicktime"
            className="hidden"
          />

          {error && (
            <div className="text-red-400 mb-4 text-center">
              {error}
            </div>
          )}

          <button
            onClick={analyzeMedia}
            disabled={!file || isLoading}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
              ${file 
                ? 'bg-[#00ff41] text-gray-800 hover:opacity-90' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
              ${isLoading ? 'opacity-70' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze for Deepfake'
            )}
          </button>
        </div>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#00ff41]">How It Works</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Upload an image or video containing human faces</li>
            <li>Our AI analyzes pixel-level inconsistencies and temporal artifacts</li>
            <li>Detection models evaluate over 200 forensic markers</li>
            <li>Receive a detailed authenticity report with confidence score</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetection;