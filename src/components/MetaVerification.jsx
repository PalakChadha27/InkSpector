import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileUpload, FaInfoCircle, FaHistory, FaCamera, FaMapMarkerAlt } from 'react-icons/fa';
import { MdComputer, MdDateRange } from 'react-icons/md';

const MetadataVerification = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
    extractMetadataPreview(selectedFile);
  };

  const extractMetadataPreview = (file) => {
    const mockMetadata = {
      basic: {
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: file.type,
        lastModified: new Date(file.lastModified).toLocaleString()
      },
      exif: file.type.includes('image') ? {
        make: Math.random() > 0.3 ? 'Canon' : null,
        model: Math.random() > 0.3 ? 'EOS 5D Mark IV' : null,
        createDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
        software: Math.random() > 0.7 ? 'Adobe Photoshop 2023' : null,
        gps: Math.random() > 0.5 ? '37.7749° N, 122.4194° W' : null
      } : null,
      pdf: file.type === 'application/pdf' ? {
        producer: Math.random() > 0.4 ? 'Adobe Acrobat Pro DC' : 'Microsoft Word',
        creationDate: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleString(),
        modificationDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
        pageCount: Math.floor(Math.random() * 10) + 1,
        encrypted: Math.random() > 0.8
      } : null
    };

    setMetadata(mockMetadata);
  };

  const removeFile = () => {
    setFile(null);
    setMetadata(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeMetadata = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const isTampered = Math.random() > 0.7;
      const inconsistencies = [];

      if (metadata.exif?.software) {
        inconsistencies.push('Editing software detected');
      }
      if (file.type.includes('image') && !metadata.exif?.createDate) {
        inconsistencies.push('Missing creation date');
      }
      if (file.type === 'application/pdf' && metadata.pdf?.encrypted) {
        inconsistencies.push('Password protected');
      }

      navigate('/metadata-results', {
        state: {
          fileName: file.name,
          isTampered,
          confidence: (Math.random() * 100).toFixed(2),
          inconsistencies,
          metadata,
          recommendations: [
            isTampered ? 'Verify with original source' : 'Metadata appears consistent',
            inconsistencies.length ? 'Request unedited version' : null,
            'Cross-reference with other documents'
          ].filter(Boolean)
        }
      });
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center"
        >
          ← Back to Tools
        </button>

        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <FaFileUpload className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Metadata Integrity Verification</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Examines file metadata such as EXIF data in images or documents for inconsistencies 
            and signs of tampering, adding an extra layer of authenticity validation.
          </p>

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
                    <p className="text-sm text-gray-400">{file.type} • {(file.size / (1024 * 1024)).toFixed(2)}MB</p>
                  </div>
                </div>
                <button 
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-300 flex items-center text-sm"
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

          {metadata && (
            <div className="bg-gray-700/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaInfoCircle className="mr-2 text-[#00ff41]" />
                Detected Metadata Preview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Basic Information</h4>
                  <ul className="text-sm space-y-1">
                    <li>Name: {metadata.basic.fileName}</li>
                    <li>Type: {metadata.basic.fileType}</li>
                    <li>Size: {metadata.basic.fileSize}</li>
                    <li>Modified: {metadata.basic.lastModified}</li>
                  </ul>
                </div>

                {metadata.exif && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <FaCamera className="mr-2 text-[#00ff41]" />
                      EXIF Data
                    </h4>
                    <ul className="text-sm space-y-1">
                      {metadata.exif.make && <li>Make: {metadata.exif.make}</li>}
                      {metadata.exif.model && <li>Model: {metadata.exif.model}</li>}
                      {metadata.exif.createDate && <li>Created: {metadata.exif.createDate}</li>}
                      {metadata.exif.software && <li className="text-yellow-400">Software: {metadata.exif.software}</li>}
                      {metadata.exif.gps && <li className="flex items-center"><FaMapMarkerAlt className="mr-1" /> {metadata.exif.gps}</li>}
                    </ul>
                  </div>
                )}

                {metadata.pdf && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <MdComputer className="mr-2 text-[#00ff41]" />
                      PDF Metadata
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>Producer: {metadata.pdf.producer}</li>
                      <li>Created: {metadata.pdf.creationDate}</li>
                      <li>Modified: {metadata.pdf.modificationDate}</li>
                      <li>Pages: {metadata.pdf.pageCount}</li>
                      {metadata.pdf.encrypted && <li className="text-yellow-400">Encrypted: Yes</li>}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400 mb-4 text-center">
              {error}
            </div>
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

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">What We Check</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: <MdDateRange />, title: "Timestamps", desc: "Creation/modification dates" },
              { icon: <FaCamera />, title: "Device Info", desc: "Camera make/model for images" },
              { icon: <FaMapMarkerAlt />, title: "Location Data", desc: "GPS coordinates in photos" },
              { icon: <MdComputer />, title: "Software", desc: "Editing/creation software" },
              { icon: <FaHistory />, title: "Version History", desc: "Document revisions" },
              { icon: <FaInfoCircle />, title: "Hidden Data", desc: "Obscured or deleted metadata" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-700/30 p-4 rounded-lg">
                <div className="text-[#00ff41] text-xl mb-2">{item.icon}</div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-3">Common Red Flags</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Missing or inconsistent timestamps</li>
            <li>Signs of photo editing software</li>
            <li>GPS locations that don't match claims</li>
            <li>Device information mismatch</li>
            <li>Metadata that contradicts file contents</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MetadataVerification;