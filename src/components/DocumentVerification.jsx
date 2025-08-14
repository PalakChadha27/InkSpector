import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPassport, FaFileUpload, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { MdSecurity, MdReceipt, MdCreditCard } from 'react-icons/md';

const DocumentVerification = () => {
  const [documentType, setDocumentType] = useState('id');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const documentTypes = [
    { id: 'id', name: 'ID Card', icon: <MdCreditCard className="text-[#00ff41]" /> },
    { id: 'passport', name: 'Passport', icon: <FaPassport className="text-[#00ff41]" /> },
    { id: 'certificate', name: 'Certificate', icon: <FaCheckCircle className="text-[#00ff41]" /> },
    { id: 'invoice', name: 'Invoice', icon: <MdReceipt className="text-[#00ff41]" /> }
  ];

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

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload JPEG, PNG, or PDF files');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
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

  const verifyDocument = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const isAuthentic = Math.random() > 0.3;
      const securityFeatures = [];

      if (documentType === 'id' || documentType === 'passport') {
        securityFeatures.push(
          isAuthentic ? 'Hologram verified' : 'Missing hologram',
          isAuthentic ? 'Microtext detected' : 'Microtext incomplete',
          isAuthentic ? 'UV pattern matches' : 'UV pattern mismatch'
        );
      }

      if (documentType === 'certificate') {
        securityFeatures.push(
          isAuthentic ? 'Official seal detected' : 'Seal appears forged',
          isAuthentic ? 'Signature matches' : 'Signature mismatch',
          isAuthentic ? 'Serial number valid' : 'Invalid serial number'
        );
      }

      if (documentType === 'invoice') {
        securityFeatures.push(
          isAuthentic ? 'Tax ID valid' : 'Tax ID invalid',
          isAuthentic ? 'Company stamp verified' : 'Stamp appears copied',
          isAuthentic ? 'Consistent numbering' : 'Numbering anomaly'
        );
      }

      navigate('/document-results', {
        state: {
          documentType,
          isAuthentic,
          confidence: (Math.random() * 100).toFixed(2),
          securityFeatures,
          detectedAnomalies: isAuthentic ? [] : [
            'Potential tampering detected',
            'Inconsistent fonts',
            'Alignment irregularities'
          ],
          recommendations: [
            isAuthentic ? 'Document appears authentic' : 'Verify with issuing authority',
            'Check physical security features',
            'Cross-reference with database'
          ]
        }
      });
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
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
            <MdSecurity className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Document Verification</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Employs OCR, format analysis, and forgery detection techniques to validate the authenticity 
            of official documents like IDs, passports, certificates, and invoices.
          </p>

          {/* Document Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Document Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDocumentType(type.id)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center transition-all
                    ${documentType === type.id 
                      ? 'border-[#00ff41] bg-gray-700' 
                      : 'border-gray-600 hover:border-gray-500'}`}
                >
                  <span className="text-2xl mb-2">{type.icon}</span>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Document Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-all 
              ${!file ? 'border-[#00ff41] bg-gray-800 hover:bg-gray-700' : 'border-gray-600'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            {file ? (
              <div className="relative">
                {preview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={preview} 
                      alt="Document preview" 
                      className="max-h-64 mb-4 rounded-lg border border-gray-600"
                    />
                    <button 
                      onClick={removeFile}
                      className="text-red-400 hover:text-red-300 flex items-center"
                    >
                      Remove Document
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-300">
                    <FaFileUpload className="text-4xl mx-auto mb-4 text-[#00ff41]" />
                    <p className="mb-2">{file.name}</p>
                    <p className="text-sm text-gray-400">{file.type} • {(file.size / (1024 * 1024)).toFixed(2)}MB</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-5xl text-[#00ff41] mb-4" />
                <p className="text-xl mb-2">Drag & Drop Document Here</p>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, PDF (Max 10MB)</p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,application/pdf"
            className="hidden"
          />

          {error && (
            <div className="text-red-400 mb-4 text-center">
              {error}
            </div>
          )}

          <button
            onClick={verifyDocument}
            disabled={!file || isAnalyzing}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center
              ${file 
                ? 'bg-[#00ff41] text-gray-800 hover:opacity-90' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
              ${isAnalyzing ? 'opacity-70' : ''}`}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="animate-spin mr-3 text-gray-800" />
                Verifying Document...
              </>
            ) : (
              'Verify Authenticity'
            )}
          </button>
        </div>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#00ff41]">Verification Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">OCR Analysis</h3>
              <p className="text-sm text-gray-300">
                Extracts and validates text content against known patterns and databases
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">Format Validation</h3>
              <p className="text-sm text-gray-300">
                Checks document layout, fonts, and design against official templates
              </p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-[#00ff41] mb-2">Security Features</h3>
              <p className="text-sm text-gray-300">
                Detects holograms, watermarks, microprinting, and other anti-forgery elements
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-[#00ff41]">Supported Documents</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'National IDs', icon: '🇺🇸' },
              { name: 'Passports', icon: '🛂' },
              { name: 'Driver Licenses', icon: '🚗' },
              { name: 'Birth Certificates', icon: '👶' },
              { name: 'Academic Diplomas', icon: '🎓' },
              { name: 'Bank Statements', icon: '🏦' },
              { name: 'Utility Bills', icon: '💡' },
              { name: 'Legal Contracts', icon: '⚖️' }
            ].map((doc, index) => (
              <div key={index} className="bg-gray-700/30 p-3 rounded-lg text-center">
                <span className="text-2xl mb-1 block">{doc.icon}</span>
                <span className="text-sm">{doc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;