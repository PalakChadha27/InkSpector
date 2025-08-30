import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardVoice, MdClose, MdUpload } from "react-icons/md";

const VoiceAuthenticity = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [previewName, setPreviewName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Sample data for charts
  const [spectralData, setSpectralData] = useState([]);
  const [prosodyData, setProsodyData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    // Initialize sample data for charts
    setSpectralData([
      { frequency: '0-100Hz', human: 85, synthetic: 15 },
      { frequency: '100-500Hz', human: 92, synthetic: 8 },
      { frequency: '500-1kHz', human: 78, synthetic: 22 },
      { frequency: '1-2kHz', human: 88, synthetic: 12 },
      { frequency: '2-4kHz', human: 82, synthetic: 18 },
      { frequency: '4-8kHz', human: 90, synthetic: 10 },
    ]);

    setProsodyData([
      { parameter: 'Pitch Variation', score: 82 },
      { parameter: 'Rhythm Consistency', score: 78 },
      { parameter: 'Stress Patterns', score: 85 },
      { parameter: 'Intonation', score: 79 },
      { parameter: 'Speech Rate', score: 88 },
    ]);

    setComparisonData([
      { feature: 'Spectral Consistency', human: 92, synthetic: 45 },
      { feature: 'Pitch Naturalness', human: 87, synthetic: 38 },
      { feature: 'Formant Stability', human: 89, synthetic: 42 },
      { feature: 'Micro-temporal Features', human: 84, synthetic: 29 },
      { feature: 'Artifact Presence', human: 8, synthetic: 87 },
    ]);
  }, []);

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

  // Simple bar chart component
  const BarChart = ({ data, title, width = '100%', height = 200 }) => {
    const maxValue = Math.max(...data.map(item => item.score));
    
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="font-medium text-gray-200 mb-3 text-center">{title}</h4>
        <div className="flex items-end justify-between h-40 px-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center" style={{ width: `${100/data.length}%` }}>
              <div className="text-xs text-gray-400 mb-1 text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {item.parameter}
              </div>
              <div
                className="bg-[#00ff41]-500 w-3/4 rounded-t hover:bg-[#00ff41]-600 transition-colors"
                style={{ height: `${(item.score / maxValue) * 70}%` }}
                title={`${item.score}%`}
              ></div>
              <div className="text-xs text-gray-300 mt-1">{item.score}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Comparison chart component
  const ComparisonChart = ({ data, title }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="font-medium text-gray-200 mb-4 text-center">{title}</h4>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{item.feature}</span>
                <span>Human vs Synthetic</span>
              </div>
              <div className="flex h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500" 
                  style={{ width: `${item.human}%` }}
                  title={`Human: ${item.human}%`}
                ></div>
                <div 
                  className="bg-red-500" 
                  style={{ width: `${item.synthetic}%` }}
                  title={`Synthetic: ${item.synthetic}%`}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{item.human}%</span>
                <span>{item.synthetic}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Spectral analysis chart
  const SpectralChart = ({ data, title }) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h4 className="font-medium text-gray-200 mb-4 text-center">{title}</h4>
        <div className="flex items-end justify-between h-48 px-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center" style={{ width: `${100/data.length}%` }}>
              <div className="flex flex-col items-center justify-end h-40">
                <div
                  className="bg-green-500 w-3/4 rounded-t hover:bg-green-600 transition-colors"
                  style={{ height: `${item.human}%` }}
                  title={`Human: ${item.human}%`}
                ></div>
                <div
                  className="bg-red-500 w-3/4 rounded-t hover:bg-red-600 transition-colors"
                  style={{ height: `${item.synthetic}%` }}
                  title={`Synthetic: ${item.synthetic}%`}
                ></div>
              </div>
              <div className="text-xs text-gray-300 mt-2 text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {item.frequency}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-400">Human Voice</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 mr-1"></div>
            <span className="text-xs text-gray-400">Synthetic Voice</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41]-400 hover:text-[#00ff41]-300 flex items-center font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Back to Tools
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
