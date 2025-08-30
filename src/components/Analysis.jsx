import React, { useState } from 'react';
import { FaFilePdf, FaFileAudio, FaFileImage, FaFileVideo, FaRobot, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowOptions(true);
    }
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
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setShowOptions(true);
    }
  };

  const analysisTypes = [
    {
      id: 'document',
      title: 'Document Analysis',
      description: 'Forensic document examination with 17 authentication markers',
      icon: <FaFilePdf className="text-2xl text-[#00ff41]" />,
      supportedFormats: ['PDF', 'DOC', 'DOCX']
    },
    {
      id: 'voice',
      title: 'Voice Analysis',
      description: 'Voice authentication and deepfake detection',
      icon: <FaFileAudio className="text-2xl text-[#00ff41]" />,
      supportedFormats: ['MP3', 'WAV', 'FLAC']
    },
    {
      id: 'image',
      title: 'Image Analysis',
      description: 'Digital image forensics and manipulation detection',
      icon: <FaFileImage className="text-2xl text-[#00ff41]" />,
      supportedFormats: ['JPG', 'JPEG', 'PNG', 'TIFF']
    },
    {
      id: 'video',
      title: 'Video Analysis',
      description: 'Video authentication and tamper detection',
      icon: <FaFileVideo className="text-2xl text-[#00ff41]" />,
      supportedFormats: ['MP4', 'MOV', 'AVI']
    },
    {
      id: 'deepfake',
      title: 'Deepfake Detection',
      description: 'AI-generated content detection and analysis',
      icon: <FaRobot className="text-2xl text-[#00ff41]" />,
      supportedFormats: ['MP4', 'MOV', 'AVI', 'JPG', 'JPEG', 'PNG']
    }
  ];

  const getFileExtension = (filename) => {
    return filename?.split('.').pop().toLowerCase();
  };

  const getCompatibleAnalysisTypes = (filename) => {
    const extension = getFileExtension(filename);
    return analysisTypes.filter(type => 
      type.supportedFormats.some(format => 
        format.toLowerCase() === extension
      )
    );
  };

  const compatibleTypes = selectedFile ? getCompatibleAnalysisTypes(selectedFile.name) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[#00ff41]">
            Forensic Analysis Suite
          </h1>
          <p className="text-white text-lg mb-2">
            Comprehensive digital forensics with ISO 27001 certification
          </p>
          <p className="text-gray-400">
            Upload any file and choose the appropriate analysis type
          </p>
        </div>

        {/* Main Upload Area */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-700 mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-all ${
              isDragging ? 'border-[#00ff41] bg-gray-800/40' : 'border-gray-600'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <FaUpload className="w-16 h-16 text-[#00ff41] mb-4" />
              
              {selectedFile ? (
                <>
                  <p className="text-white text-lg mb-2">File Ready for Analysis</p>
                  <p className="text-[#00ff41] font-mono text-sm mb-4">
                    {selectedFile.name}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white text-lg mb-2">Drag & Drop Your File</p>
                  <p className="text-gray-400 text-sm mb-4">
                    Supports: PDF, Documents, Images, Audio, Video
                  </p>
                </>
              )}
              
              <label className="cursor-pointer bg-[#00ff41] hover:bg-[#00e036] text-gray-900 px-6 py-3 rounded-md font-semibold">
                {selectedFile ? 'Change File' : 'Select File'}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.mp3,.wav,.flac,.jpg,.jpeg,.png,.tiff,.mp4,.mov,.avi"
                />
              </label>
            </div>
          </div>

          {/* Analysis Options */}
          {showOptions && selectedFile && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#00ff41] mb-4 text-center">
                Select Analysis Type
              </h3>
              
              {compatibleTypes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compatibleTypes.map((type) => (
                    <Link
                      key={type.id}
                      to={`/${type.id}-analysis`}
                      state={{ file: selectedFile, type: type.id }}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-[#00ff41] transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="flex items-center mb-3">
                        {type.icon}
                        <h4 className="text-lg font-semibold text-white ml-3">
                          {type.title}
                        </h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        {type.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        Compatible with {getFileExtension(selectedFile.name).toUpperCase()}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4">
                    No compatible analysis types found for this file format.
                  </p>
                  <p className="text-gray-300">
                    Supported formats: PDF, DOC, DOCX, MP3, WAV, FLAC, JPG, JPEG, PNG, TIFF, MP4, MOV, AVI
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Analysis Type Information */}
          {!showOptions && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#00ff41] mb-4 text-center">
                Available Analysis Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisTypes.map((type) => (
                  <div
                    key={type.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-center mb-2">
                      {type.icon}
                      <h4 className="text-md font-semibold text-white ml-2">
                        {type.title}
                      </h4>
                    </div>
                    <p className="text-gray-300 text-xs mb-2">
                      {type.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Formats: {type.supportedFormats.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-700">
          <h3 className="text-xl font-semibold text-[#00ff41] mb-6 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00ff41] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-900 font-bold">1</span>
              </div>
              <h4 className="font-medium text-white mb-2">Upload File</h4>
              <p className="text-sm">
                Drag and drop or select any document, image, audio, or video file
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00ff41] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-900 font-bold">2</span>
              </div>
              <h4 className="font-medium text-white mb-2">Choose Analysis</h4>
              <p className="text-sm">
                Select the appropriate analysis type for your file
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00ff41] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-900 font-bold">3</span>
              </div>
              <h4 className="font-medium text-white mb-2">Get Results</h4>
              <p className="text-sm">
                Receive comprehensive forensic analysis report
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;