import React from 'react';
import { FaShieldAlt, FaMicrophone, FaUserEdit, FaFileAlt, FaChartLine } from 'react-icons/fa';
import { MdSecurity, MdPhotoCamera, MdAssignment } from 'react-icons/md';

const CaseStudy = () => {
  const features = [
    {
      id: 'deepfake',
      icon: <MdPhotoCamera className="text-3xl text-[#00ff41]" />,
      title: "Deepfake Detection",
      description: "Identifies AI-manipulated media using advanced neural networks",
      benefits: [
        "Prevents identity fraud in video calls and conferences",
        "Detects manipulated media in news and social platforms",
        "Protects against blackmail and misinformation",
        "Reduces corporate espionage risks"
      ],
      useCase: "A financial institution prevented $2M in CEO fraud scams by detecting deepfake voice calls attempting unauthorized transfers."
    },
    {
      id: 'voice',
      icon: <FaMicrophone className="text-3xl text-[#00ff41]" />,
      title: "Voice Authenticity",
      description: "Detects synthetic or cloned voice recordings",
      benefits: [
        "Prevents voice phishing (vishing) attacks",
        "Identifies AI-generated customer service calls",
        "Verifies authenticity of audio evidence",
        "Protects against voice-based identity theft"
      ],
      useCase: "A call center reduced fraud cases by 78% after implementing real-time voice authentication for sensitive transactions."
    },
    {
      id: 'bio',
      icon: <FaUserEdit className="text-3xl text-[#00ff41]" />,
      title: "Bio/Profile Analysis",
      description: "Detects AI-generated or plagiarized profile content",
      benefits: [
        "Identifies fake social media profiles",
        "Reduces catfishing in dating platforms",
        "Detects fraudulent job applicants",
        "Flags suspicious marketplace seller profiles"
      ],
      useCase: "A dating platform removed 12,000 fake profiles within a week of implementing bio authenticity checks."
    },
    {
      id: 'metadata',
      icon: <MdSecurity className="text-3xl text-[#00ff41]" />,
      title: "Metadata Verification",
      description: "Analyzes file metadata for signs of tampering",
      benefits: [
        "Verifies document creation history",
        "Detects image manipulation",
        "Identifies forged certificates",
        "Provides chain-of-custody validation"
      ],
      useCase: "A university uncovered 47 forged academic certificates by analyzing submission metadata patterns."
    },
    {
      id: 'document',
      icon: <FaFileAlt className="text-3xl text-[#00ff41]" />,
      title: "Document Verification",
      description: "Validates official documents using multiple forensic techniques",
      benefits: [
        "Detects counterfeit IDs and passports",
        "Identifies altered invoices and contracts",
        "Verifies academic credentials",
        "Prevents financial document fraud"
      ],
      useCase: "An HR department reduced fake credential hires by 92% through automated document verification."
    },
    {
      id: 'trust',
      icon: <FaChartLine className="text-3xl text-[#00ff41]" />,
      title: "Trust Score Aggregation",
      description: "Combines all verifications into a unified risk assessment",
      benefits: [
        "Simplifies complex verification data",
        "Provides actionable risk ratings",
        "Reduces decision-making time",
        "Creates audit trails for compliance"
      ],
      useCase: "A bank reduced account fraud by 65% while speeding up onboarding using integrated trust scoring."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 ">TrustNet CyberCop-Tools Case Studies</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world applications and measurable benefits of our AI-powered verification platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-[#00ff41] transition-all"
            >
              <div className="flex items-start mb-4">
                <div className="mr-4 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{feature.title}</h2>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-[#00ff41]">Key Benefits:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-1 text-[#00ff41]">Success Story:</h3>
                <p className="text-sm italic">"{feature.useCase}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Benefits */}
        <div className="bg-gray-800 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#00ff41' }}>
            Integrated Platform Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#00ff41]/20 p-6 rounded-lg border border-[#00ff41]/60">
              <h3 className="font-bold mb-3 text-lg">Comprehensive Protection</h3>
              <p className="text-gray-300">
                Our multi-layered approach covers all digital identity aspects from media to documents, 
                eliminating single points of failure in your verification process.
              </p>
            </div>
            <div className="bg-[#00ff41]/20 p-6 rounded-lg border border-[#00ff41]/60">
              <h3 className="font-bold mb-3 text-lg">Seamless Integration</h3>
              <p className="text-gray-300">
                Modular design allows implementing individual verifications or the complete suite, 
                with unified APIs that work with your existing systems.
              </p>
            </div>
            <div className="bg-[#00ff41]/20 p-6 rounded-lg border border-[#00ff41]/60">
              <h3 className="font-bold mb-3 text-lg">Actionable Intelligence</h3>
              <p className="text-gray-300">
                Beyond binary results, we provide detailed risk assessments with 
                explainable AI that helps your team make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Industry Applications */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#00ff41' }}>
            Industry Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Financial Services", cases: "Account opening, transaction verification" },
              { name: "Healthcare", cases: "Patient identity verification, provider credentialing" },
              { name: "E-Commerce", cases: "Seller verification, fraud prevention" },
              { name: "Human Resources", cases: "Candidate screening, document verification" },
              { name: "Government", cases: "ID validation, benefit fraud prevention" },
              { name: "Legal", cases: "Evidence authentication, contract verification" },
              { name: "Education", cases: "Student verification, credential checks" },
              { name: "Social Media", cases: "Fake account detection, content moderation" }
            ].map((industry, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-400">{industry.cases}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;