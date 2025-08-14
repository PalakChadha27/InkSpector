import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFingerprint, FaMicrophone, FaShieldAlt } from 'react-icons/fa';
import { MdPhotoCamera, MdAssignment } from 'react-icons/md';
import { GrScan } from 'react-icons/gr';

const Tools = () => {
  const navigate = useNavigate();

  const ToolCard = ({ icon, title, description, route }) => (
    <div className="h-full p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-[#00ff41] transition hover:shadow-lg hover:shadow-[#00ff41]/20 flex flex-col justify-between">
      <div>
        <div className="mb-4 text-3xl text-[#00ff41]">{icon}</div>
        <h4 className="text-xl font-semibold mb-3">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => navigate(route)}
        className="mt-6 px-4 py-2 bg-[#00ff41] text-black font-semibold rounded-lg hover:bg-[#00cc33] transition"
      >
        Open
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#00ff41]">InkSpector Verification Tools</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Comprehensive suite of AI-powered authentication technologies to combat digital forgery
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            icon={<MdPhotoCamera />}
            title="Deepfake Detection"
            description="Identifies AI-manipulated or tampered face images and videos using advanced convolutional neural networks that analyze pixel-level inconsistencies and temporal artifacts."
            route="/deepfake"
          />
          <ToolCard
            icon={<FaMicrophone />}
            title="Voice Authenticity Analysis"
            description="Detects synthetic or cloned voice recordings through audio feature extraction and classification models, distinguishing real human speech from AI-generated audio."
            route="/voiceauthenticity"
          />
          <ToolCard
            icon={<FaFingerprint />}
            title="Bio/Profile Originality"
            description="Uses natural language processing to compare user bios and profiles against known datasets, detecting copied or AI-generated text to flag suspicious identities."
            route="/bioauthenticity"
          />
          <ToolCard
            icon={<GrScan />}
            title="Metadata Integrity"
            description="Examines file metadata such as EXIF data in images or documents for inconsistencies and signs of tampering, adding an extra layer of authenticity validation."
            route="/metaverification"
          />
          <ToolCard
            icon={<MdAssignment />}
            title="Document Verification"
            description="Employs OCR, format analysis, and forgery detection techniques to validate the authenticity of official documents like IDs, passports, certificates, and invoices."
            route="/documentverification"
          />
          <ToolCard
            icon={<FaShieldAlt />}
            title="Trust Score Aggregation"
            description="Combines outputs from all AI models into a single, easy-to-understand trust score with a color-coded risk indicator, simplifying decision-making for users."
            route="/trustscore"
          />
        </div>
      </div>
    </div>
  );
};

export default Tools;
