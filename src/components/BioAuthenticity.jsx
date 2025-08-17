import React, { useState, useRef } from "react";
import { FaUserEdit, FaSearch, FaSpinner, FaCopy, FaRobot } from "react-icons/fa";

const BioAuthenticityCheck = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [results, setResults] = useState(null);
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setCharCount(inputText.length);
  };

  const analyzeText = async () => {
    if (!text.trim() || charCount < 20) {
      setError("Please enter at least 20 characters to proceed for analysis");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: text }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server error");
      }

      const data = await res.json();
      setResults(data.analysis);
    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText.length > 10000) {
        setError("Pasted text exceeds 10,000 character limit");
        return;
      }
      setText(clipboardText);
      setCharCount(clipboardText.length);
      textareaRef.current.focus();
    } catch (err) {
      setError("Could not access clipboard. Please paste manually.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <FaUserEdit className="text-3xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Bio/Profile Authenticity Check</h1>
          </div>
          <p className="text-gray-300 mb-8">
            Uses natural language processing to compare text against known
            datasets, detecting copied or AI-generated content to flag suspicious
            identities.
          </p>

          {/* Text Analysis Area */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="bio-text" className="block text-gray-300 mb-1">
                Enter profile text or bio:
              </label>
              <span className="text-sm text-gray-400">
                {charCount}/10,000 characters
              </span>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                id="bio-text"
                value={text}
                onChange={handleTextChange}
                placeholder="Paste the profile text you want to analyze..."
                className="w-full h-64 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] text-gray-100"
                maxLength={10000}
              />
              <button
                onClick={pasteFromClipboard}
                className="absolute right-3 bottom-3 bg-gray-600 hover:bg-gray-500 p-2 rounded-md text-sm flex items-center"
              >
                <FaCopy className="mr-1" /> Paste
              </button>
            </div>
          </div>

          {error && <div className="text-red-400 mb-4 text-center">{error}</div>}

          <button
            onClick={analyzeText}
            disabled={!text.trim() || isAnalyzing}
            className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-colors
              ${
                text.trim()
                  ? "bg-[#00ff41] hover:bg-[#00e036] text-gray-900"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }
              ${isAnalyzing ? "opacity-70" : ""}`}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="animate-spin mr-3" />
                Analyzing Text...
              </>
            ) : (
              <>
                <FaSearch className="mr-3" />
                Check Authenticity
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-gray-800 rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#00ff41" }}>
              Analysis Results
            </h2>

            <p className="mb-2">
              <span className="font-semibold">AI Generated:</span>{" "}
              {results.is_ai_generated ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Confidence:</span>{" "}
              {results.confidence?.toFixed(2)}%
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="font-semibold">Uniqueness</p>
                <p>{results.uniqueness || 0}%</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="font-semibold">Plagiarism</p>
                <p>{results.plagiarism || 0}%</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <p className="font-semibold">Readability</p>
                <p>{results.readability || 0}%</p>
              </div>
            </div>

            {results.red_flags?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-red-400 mb-2">Red Flags</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {results.red_flags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.suggestions?.length > 0 && (
              <div>
                <h3 className="font-semibold text-[#00ff41] mb-2">Suggestions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {results.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gray-800 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#00ff41" }}>
            How We Detect Suspicious Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaRobot className="text-[#00ff41] mr-2" />
                <h3 className="font-medium">AI-Generated Text</h3>
              </div>
              <p className="text-sm text-gray-300">
                Detects patterns common in GPT-3/4 outputs including:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Overly formal or verbose language</li>
                  <li>Lack of personal specifics</li>
                  <li>Predictable word choices</li>
                </ul>
              </p>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaCopy className="text-[#00ff41] mr-2" />
                <h3 className="font-medium">Plagiarized Content</h3>
              </div>
              <p className="text-sm text-gray-300">
                Compares against:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Known scam profiles</li>
                  <li>Public social media bios</li>
                  <li>Professional networking sites</li>
                </ul>
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4" style={{ color: "#00ff41" }}>
            Recommended Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Online dating profiles",
              "Job applicant bios",
              "Social media influencers",
              "Marketplace seller profiles",
              "Forum moderators",
              "Customer support reps",
            ].map((useCase) => (
              <div
                key={useCase}
                className="bg-gray-700/30 p-3 rounded-lg text-center"
              >
                <p className="text-sm">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioAuthenticityCheck;
