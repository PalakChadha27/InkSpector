import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TrustScoreAggregation = () => {
  const [verifications, setVerifications] = useState([
    { id: 'deepfake', name: 'Deepfake Detection', completed: false, score: null },
    { id: 'voice', name: 'Voice Authenticity', completed: false, score: null },
    { id: 'bio', name: 'Bio/Profile Check', completed: false, score: null },
    { id: 'metadata', name: 'Metadata Analysis', completed: false, score: null },
    { id: 'document', name: 'Document Verification', completed: false, score: null }
  ]);
  const [overallScore, setOverallScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  // Calculate overall score when all verifications are complete
  useEffect(() => {
    const allCompleted = verifications.every(v => v.completed);
    if (allCompleted) {
      calculateOverallScore();
    }
  }, [verifications]);

  const calculateOverallScore = () => {
    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const completedVerifications = verifications.filter(v => v.completed);
      const totalScore = completedVerifications.reduce((sum, v) => sum + v.score, 0);
      const averageScore = Math.round(totalScore / completedVerifications.length);

      setOverallScore(averageScore);
      setIsCalculating(false);
    }, 2000);
  };

  const handleVerificationComplete = (id, score) => {
    setVerifications(prev =>
      prev.map(v =>
        v.id === id ? { ...v, completed: true, score } : v
      )
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-600';
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 50) return 'Medium Risk';
    return 'High Risk';
  };

  const VerificationCard = ({ verification }) => {
    const navigate = useNavigate();

    return (
      <div
        className={`p-4 rounded-lg border-2 ${
          verification.completed
            ? 'border-[#00ff41] bg-[#00ff41]/10'
            : 'border-gray-600 hover:border-gray-500 cursor-pointer'
        }`}
        onClick={() => !verification.completed && navigate(`/${verification.id}-check`)}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{verification.name}</h3>
          {verification.completed ? (
            <span className={`px-2 py-1 rounded text-xs ${
              verification.score >= 80 ? 'bg-green-900/50 text-green-300' :
              verification.score >= 50 ? 'bg-yellow-900/50 text-yellow-300' :
              'bg-red-900/50 text-red-300'
            }`}>
              {verification.score}/100
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Pending</span>
          )}
        </div>

        {verification.completed ? (
          <div className="flex items-center text-sm">
            {verification.score >= 80 ? (
              <FaCheckCircle className="text-green-400 mr-1" />
            ) : verification.score >= 50 ? (
              <FaExclamationTriangle className="text-yellow-400 mr-1" />
            ) : (
              <FaTimesCircle className="text-red-400 mr-1" />
            )}
            <span className="text-gray-300">
              {verification.score >= 80 ? 'Verified' :
                verification.score >= 50 ? 'Caution' : 'Risk Detected'}
            </span>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Click to verify</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <FaShieldAlt className="text-3xl text-[#00ff41] mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Trust Score Aggregation</h1>
              <p className="text-gray-300">
                Combines outputs from all AI models into a single, easy-to-understand trust score
              </p>
            </div>
          </div>

          {/* Overall Score Display */}
          <div className={`mb-8 p-6 rounded-lg ${
            overallScore !== null ? getScoreColor(overallScore) : 'bg-gray-700'
          } text-center transition-all duration-500`}>
            <h2 className="text-lg mb-2">Overall Trust Score</h2>
            {overallScore !== null ? (
              <div>
                <div className="text-6xl font-bold mb-2">{overallScore}</div>
                <div className="text-xl font-medium">{getRiskLevel(overallScore)}</div>
              </div>
            ) : isCalculating ? (
              <div className="flex justify-center">
                <FaSpinner className="animate-spin text-4xl" />
              </div>
            ) : (
              <p className="text-gray-300">
                Complete verifications to generate score
              </p>
            )}
          </div>

          {/* Verification Progress */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Verification Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verifications.map(verification => (
                <VerificationCard
                  key={verification.id}
                  verification={verification}
                />
              ))}
            </div>
          </div>

          {/* Score Explanation */}
          <div className="bg-gray-700/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Understanding Your Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <h3 className="font-medium">80-100: Low Risk</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Minimal risk detected. All verifications passed with high confidence.
                </p>
              </div>
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <h3 className="font-medium">50-79: Medium Risk</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Some concerns detected. Review individual verifications.
                </p>
              </div>
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <h3 className="font-medium">0-49: High Risk</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Significant risk detected. Proceed with caution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">How We Calculate Your Trust Score</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#00ff41] text-black rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Complete Individual Verifications</h3>
                <p className="text-gray-300 text-sm">
                  Each verification module analyzes different aspects of authenticity.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#00ff41] text-black rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Weighted Scoring</h3>
                <p className="text-gray-300 text-sm">
                  More critical verifications (like document checks) carry greater weight.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#00ff41] text-black rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Consistency Analysis</h3>
                <p className="text-gray-300 text-sm">
                  We check for consistency across all verification results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreAggregation;
