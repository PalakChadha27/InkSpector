import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPassport, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import { MdSecurity, MdReceipt, MdCreditCard } from "react-icons/md";

const DocumentVerification = () => {
  const [documentType, setDocumentType] = useState("id");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const documentTypes = [
    { id: "id", name: "ID Card", icon: <MdCreditCard className="text-[#00ff41]" /> },
    { id: "passport", name: "Passport", icon: <FaPassport className="text-[#00ff41]" /> },
    { id: "certificate", name: "Certificate", icon: <FaCheckCircle className="text-[#00ff41]" /> },
    { id: "invoice", name: "Invoice", icon: <MdReceipt className="text-[#00ff41]" /> },
  ];

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
    setError("");
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload JPEG, PNG, or PDF files");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    setFile(selectedFile);
    setPreview(selectedFile.type.includes("image") ? URL.createObjectURL(selectedFile) : null);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const verifyDocument = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    try {
      // simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const isAuthentic = Math.random() > 0.3;
      const securityFeatures = documentType === "id" || documentType === "passport"
        ? [
            isAuthentic ? "Hologram verified" : "Missing hologram",
            isAuthentic ? "Microtext detected" : "Microtext incomplete",
            isAuthentic ? "UV pattern matches" : "UV pattern mismatch",
          ]
        : documentType === "certificate"
        ? [
            isAuthentic ? "Official seal detected" : "Seal appears forged",
            isAuthentic ? "Signature matches" : "Signature mismatch",
            isAuthentic ? "Serial number valid" : "Invalid serial number",
          ]
        : [
            isAuthentic ? "Tax ID valid" : "Tax ID invalid",
            isAuthentic ? "Company stamp verified" : "Stamp appears copied",
            isAuthentic ? "Consistent numbering" : "Numbering anomaly",
          ];

      navigate("/document-analysis", {
        state: {
          documentType,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          isAuthentic,
          confidence: (Math.random() * 100).toFixed(2),
          securityFeatures,
          detectedAnomalies: isAuthentic
            ? []
            : ["Potential tampering detected", "Inconsistent fonts", "Alignment irregularities"],
          recommendations: [
            isAuthentic ? "Document appears authentic" : "Verify with issuing authority",
            "Check physical security features",
            "Cross-reference with database",
          ],
        },
      });
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center">
          ← Back to Tools
        </button>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <MdSecurity className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Document Verification</h1>
          </div>

          <p className="text-gray-300 mb-8">
            Validate documents like IDs, passports, certificates, and invoices. This demo redirects to an analysis page with placeholder results.
          </p>

          {/* Document Type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Document Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {documentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDocumentType(type.id)}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center transition-all
                    ${documentType === type.id ? "border-[#00ff41] bg-gray-700" : "border-gray-600 hover:border-gray-500"}`}
                >
                  <span className="text-2xl mb-2">{type.icon}</span>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload */}
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-all ${
              !file ? "border-[#00ff41] bg-gray-800 hover:bg-gray-700" : "border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            {file ? (
              preview ? (
                <div className="flex flex-col items-center">
                  <img src={preview} alt="Preview" className="max-h-64 mb-4 rounded-lg border border-gray-600" />
                  <button onClick={removeFile} className="text-red-400 hover:text-red-300 flex items-center">
                    Remove Document
                  </button>
                </div>
              ) : (
                <div className="text-gray-300">
                  <FaFileUpload className="text-4xl mx-auto mb-4 text-[#00ff41]" />
                  <p className="mb-2">{file.name}</p>
                  <p className="text-sm text-gray-400">{file.type} • {(file.size / (1024 * 1024)).toFixed(2)}MB</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center">
                <FaFileUpload className="text-5xl text-[#00ff41] mb-4" />
                <p className="text-xl mb-2">Drag & Drop Document Here</p>
                <p className="text-gray-400 mb-4">or click to browse files</p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, PDF (Max 10MB)</p>
              </div>
            )}
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,application/pdf" className="hidden" />

          {error && <div className="text-red-400 mb-4 text-center">{error}</div>}

          <button
            onClick={verifyDocument}
            disabled={!file || isAnalyzing}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
              file ? "bg-[#00ff41] text-gray-800 hover:opacity-90" : "bg-gray-700 text-gray-400 cursor-not-allowed"
            } ${isAnalyzing ? "opacity-70" : ""}`}
          >
            {isAnalyzing ? "Verifying..." : "Verify Authenticity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;
