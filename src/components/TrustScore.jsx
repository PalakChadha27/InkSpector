import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';

const verificationModules = [
  { id: 'deepfake', name: 'Deepfake Detection' },
  { id: 'voice', name: 'Voice Authenticity' },
  { id: 'bio', name: 'Bio/Profile Check' },
  { id: 'metadata', name: 'Metadata Analysis' },
  { id: 'document', name: 'Document Verification' }
];

const TrustScoreAggregation = () => {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState(
    verificationModules.map(v => ({ ...v, completed: false, score: null }))
  );

  const handleModuleClick = (module) => {
    navigate(`/trustscore-analysis`, { state: { module, verifications, setVerifications } });
  };

  const overallScore = verifications.every(v => v.completed)
    ? Math.round(verifications.reduce((sum, v) => sum + v.score, 0) / verifications.length)
    : null;

  const getRisk = (score) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 50) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center"
        >
          ← Back
        </button>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <FaShieldAlt className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Trust Score Aggregation</h1>
          </div>

          <div className={`mb-6 p-6 rounded-lg text-center ${overallScore !== null 
            ? overallScore >= 80 ? 'bg-green-600' : overallScore >= 50 ? 'bg-yellow-500' : 'bg-red-600' 
            : 'bg-gray-700'}`}>
            <h2 className="text-lg mb-2">Overall Score</h2>
            {overallScore !== null ? (
              <div>
                <div className="text-6xl font-bold mb-2">{overallScore}</div>
                <div className="text-xl font-medium">{getRisk(overallScore)}</div>
              </div>
            ) : (
              <p className="text-gray-300">Complete all verifications to see score</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifications.map(v => (
              <div
                key={v.id}
                className={`p-4 rounded-lg border-2 flex justify-between items-center cursor-pointer ${
                  v.completed ? 'border-[#00ff41] bg-[#00ff41]/10' : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => handleModuleClick(v)}
              >
                <span className="font-medium">{v.name}</span>
                {v.completed ? <span>{v.score}/100</span> : <span className="text-gray-400 text-sm">Pending</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreAggregation;