import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaUser, FaCog, FaSignOutAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const quizQuestions = [
    {
      id: 1,
      question: "What is browser warnings? (Q65)",
      options: [
        "A. Respect browser security warnings",
        "B. A harmless online activity",
        "C. A type of encryption",
        "D. An internet speed test"
      ],
      correctAnswer: "A. Respect browser security warnings"
    },
    {
      id: 2,
      question: "What should you do if you receive a suspicious email? (Q12)",
      options: [
        "A. Click on all links to verify",
        "B. Forward it to your friends",
        "C. Delete it immediately without clicking",
        "D. Reply with your personal information"
      ],
      correctAnswer: "C. Delete it immediately without clicking"
    },
    {
      id: 3,
      question: "What is two-factor authentication? (Q34)",
      options: [
        "A. Using two different browsers",
        "B. A security method requiring two verification forms",
        "C. Having two email accounts",
        "D. A type of virus protection"
      ],
      correctAnswer: "B. A security method requiring two verification forms"
    },
    {
      id: 4,
      question: "Which of these is a strong password? (Q78)",
      options: [
        "A. password123",
        "B. 12345678",
        "C. John1985",
        "D. Tr0ub4d0r&3"
      ],
      correctAnswer: "D. Tr0ub4d0r&3"
    },
    {
      id: 5,
      question: "What does HTTPS indicate? (Q23)",
      options: [
        "A. The website is always safe",
        "B. The connection is encrypted",
        "C. The website loads faster",
        "D. It's a government website"
      ],
      correctAnswer: "B. The connection is encrypted"
    },
    {
      id: 6,
      question: "How often should you update your software? (Q56)",
      options: [
        "A. Only when it stops working",
        "B. Once a year",
        "C. Whenever updates are available",
        "D. Never, to avoid changes"
      ],
      correctAnswer: "C. Whenever updates are available"
    },
    {
      id: 7,
      question: "What is phishing? (Q89)",
      options: [
        "A. A fishing hobby",
        "B. A type of encryption",
        "C. Fraudulent attempt to get sensitive information",
        "D. A browser extension"
      ],
      correctAnswer: "C. Fraudulent attempt to get sensitive information"
    },
    {
      id: 8,
      question: "Why should you use a VPN on public WiFi? (Q41)",
      options: [
        "A. To get faster internet",
        "B. To encrypt your connection",
        "C. To access blocked games",
        "D. To save battery life"
      ],
      correctAnswer: "B. To encrypt your connection"
    },
    {
      id: 9,
      question: "What is social engineering? (Q67)",
      options: [
        "A. Building social media apps",
        "B. Manipulating people to reveal information",
        "C. A type of computer engineering",
        "D. Social media marketing"
      ],
      correctAnswer: "B. Manipulating people to reveal information"
    },
    {
      id: 10,
      question: "How can you identify a secure website? (Q92)",
      options: [
        "A. It has lots of images",
        "B. It has HTTPS and a padlock icon",
        "C. It loads quickly",
        "D. It has a .com domain"
      ],
      correctAnswer: "B. It has HTTPS and a padlock icon"
    }
  ];

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnswers({
      ...answers,
      [currentQuestion]: option
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || '');
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] || '');
    }
  };

  const handleSubmitAnswer = () => {
    if (currentQuestion === totalQuestions - 1) {
      // Calculate score
      const score = calculateScore();
      // Navigate to results page or dashboard
      navigate('/dashboard', { state: { quizScore: score } });
    } else {
      handleNext();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / totalQuestions) * 100;
  };

  const currentQuestionData = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Quiz Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Question {currentQuestion + 1} of {totalQuestions}
          </h2>
          <div className="flex items-center justify-center mb-4">
            <span className="text-lg font-medium mr-2">{Math.round(progress)}% Complete</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-8">
            <div 
              className="h-3 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: '#00ff41', 
                width: `${progress}%` 
              }}
            ></div>
          </div>

          <div className="w-full h-px bg-gray-700 mb-8"></div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {currentQuestionData.question}
          </h3>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className="h-5 w-5 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                  style={{ 
                    accentColor: '#00ff41',
                    backgroundColor: '#374151'
                  }}
                />
                <label 
                  htmlFor={`option-${index}`}
                  className="ml-3 text-lg text-gray-300 cursor-pointer flex-1"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-gray-700 mb-6"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-8 py-3 rounded-lg font-medium border transition ${
              currentQuestion === 0 
                ? 'border-gray-600 text-gray-500 cursor-not-allowed' 
                : 'border-gray-400 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>

          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            className={`flex items-center px-8 py-3 rounded-lg font-medium transition ${
              !selectedOption
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'hover:bg-green-600'
            }`}
            style={{ 
              backgroundColor: !selectedOption ? '#4b5563' : '#00ff41',
              color: !selectedOption ? '#9ca3af' : '#000'
            }}
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Submit Answer'}
            {currentQuestion !== totalQuestions - 1 && <FaArrowRight className="ml-2" />}
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 text-center py-2 font-medium text-gray-400 hover:text-white transition"
              >
                Dashboard
              </button>
              <button 
                className="flex-1 text-center py-2 font-medium"
                style={{ color: '#00ff41' }}
              >
                Quiz
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="flex-1 text-center py-2 font-medium text-gray-400 hover:text-white transition"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;