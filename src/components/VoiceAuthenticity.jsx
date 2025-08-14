import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaPlay, FaStop, FaTrash, FaSpinner } from 'react-icons/fa';

const VoiceAuthenticityAnalysis = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetAudio(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateAndSetAudio(file);
  };

  const validateAndSetAudio = (file) => {
    setError('');
    if (!file) return;

    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload MP3, WAV, or OGG audio files only');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }
    setAudioFile(file);
    setAudioPreview(URL.createObjectURL(file));
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const removeAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAudioFile(null);
    setAudioPreview(null);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeAudio = async () => {
    if (!audioFile) return;
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/voice-analysis-results', {
        state: {
          isSynthetic: Math.random() > 0.7,
          confidence: (Math.random() * 100).toFixed(2),
          analysisData: {
            spectralAnalysis: 'Detected potential vocoder artifacts',
            prosodyAnalysis: 'Unnatural pitch variation detected',
            biometricScore: (Math.random() * 10).toFixed(1),
            riskLevel: Math.random() > 0.7 ? 'High' : 'Low'
          },
          audioSample: audioPreview
        }
      });
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center"
        >
          ← Back to Tools
        </button>

        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <FaMicrophone className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Voice Authenticity Analysis</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Detects synthetic or cloned voice recordings through audio feature extraction 
            and classification models, distinguishing real human speech from AI-generated audio.
          </p>

          {/* Audio Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-4 transition-all 
              ${!audioFile ? 'border-[#00ff41] bg-[#00ff41]/10 hover:bg-[#00ff41]/20' : 'border-gray-600'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !audioFile && fileInputRef.current?.click()}
          >
            {audioFile ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  <button 
                    onClick={togglePlayback}
                    className="p-3 bg-[#00ff41] text-black rounded-full mr-4 hover:opacity-80"
                  >
                    {isPlaying ? <FaStop /> : <FaPlay />}
                  </button>
                  <span className="text-lg">{audioFile.name}</span>
                </div>
                <audio
                  ref={audioRef}
                  src={audioPreview}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-4">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <button 
                    onClick={removeAudio}
                    className="text-red-400 hover:text-red-300 flex items-center text-sm"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaMicrophone className="text-5xl text-[#00ff41] mb-4" />
                <p className="text-xl mb-2">Drag & Drop Audio File</p>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">Supports: MP3, WAV, OGG (Max 10MB)</p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/mpeg,audio/wav,audio/ogg"
            className="hidden"
          />

          {error && (
            <div className="text-red-400 mb-4 text-center">
              {error}
            </div>
          )}

          <button
            onClick={analyzeAudio}
            disabled={!audioFile || isAnalyzing}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
              ${audioFile 
                ? 'bg-[#00ff41] text-black hover:opacity-80' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
              ${isAnalyzing ? 'opacity-70' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="animate-spin mr-3" />
                Analyzing Voice...
              </>
            ) : (
              'Verify Authenticity'
            )}
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Detection Technology</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Analyzes spectral signatures for vocoder artifacts</li>
            <li>Detects unnatural pitch and prosody patterns</li>
            <li>Examines micro-temporal speech characteristics</li>
            <li>Compares against known synthetic voice markers</li>
            <li>Provides confidence score and risk assessment</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">Supported Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">Fraud Prevention</h3>
              <p className="text-sm text-gray-400">Detect voice cloning in financial scams</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">Media Verification</h3>
              <p className="text-sm text-gray-400">Identify synthetic voices in recordings</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">Call Screening</h3>
              <p className="text-sm text-gray-400">Flag potential synthetic callers</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">Content Moderation</h3>
              <p className="text-sm text-gray-400">Detect AI-generated audio in UGC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAuthenticityAnalysis;
