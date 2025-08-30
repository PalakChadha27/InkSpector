import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardVoice, MdClose, MdUpload } from "react-icons/md";

const VoiceAuthenticity = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewName, setPreviewName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError("");
    if (!selectedFile) return;

    const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/x-m4a"];
    const maxSizeMB = 20;

    if (!validTypes.includes(selectedFile.type.toLowerCase())) {
      setError("Please upload an MP3, WAV, or M4A audio file.");
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setFile(selectedFile);
    setPreviewName(selectedFile.name);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = () => {
    if (!file) return;
    // Navigate to analysis page and send file info
    navigate("/voice-analysis", {
      state: {
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center"
        >
          ← Back to Tools
        </button>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-8">
          <div className="flex items-center mb-6">
            <MdKeyboardVoice className="text-4xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Voice Authenticity Check</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Upload an audio file to check if the voice is authentic or AI-generated.  
            This demo will redirect you to an analysis page with placeholder results.
          </p>

          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-4 transition-all 
              ${
                !file
                  ? "border-[#00ff41] bg-gray-800 hover:bg-gray-700 cursor-pointer"
                  : "border-gray-600"
              }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <p className="text-lg mb-4 text-white">{previewName}</p>
                <button
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-300 flex items-center"
                >
                  <MdClose className="mr-1" /> Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <MdUpload className="text-5xl text-[#00ff41] mb-4" />
                <p className="text-xl mb-2">Drag & Drop Audio Here</p>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">
                  Supports: MP3, WAV, M4A (Max 20MB)
                </p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />

          {error && (
            <div className="text-red-400 mb-4 text-center">{error}</div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
              ${
                file
                  ? "bg-[#00ff41] text-gray-800 hover:opacity-90"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
          >
            Analyze Voice
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAuthenticity;
