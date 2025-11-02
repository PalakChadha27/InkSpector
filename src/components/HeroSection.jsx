import React from 'react';
import { FaShieldAlt, FaClock, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Semi-transparent background image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
          alt="AI technology background"
          className="w-full h-full object-cover"
        />
      </div>

      <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Heading with text shadow */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Welcome to <span className="text-[#00FF41]">TrustNet CyberCop-Tools</span>
        </h1>
        
        {/* Subtitle with stronger contrast */}
        <p className="max-w-2xl text-gray-200 text-lg sm:text-xl mb-10 drop-shadow-md">
          AI-powered platform designed to protect individuals and organizations from identity impersonation, digital forgery, and deepfake threats.
        </p>
        
        {/* CTA Buttons with glow effect */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/analysis"><button className="px-8 py-3 bg-[#00FF41] text-[#0D0208] hover:bg-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30">
            Analyze Now
          </button></Link>
          <Link to="/casestudy"><button className="px-8 py-3 border border-gray-600 hover:border-[#00FF41] rounded-lg font-medium transition-all duration-300 hover:bg-gray-800/50 backdrop-blur-sm">
            Learn More
          </button></Link>
        </div>
        
        {/* Glass-morphism Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { icon: <FaShieldAlt className="text-3xl" />, value: "99.1%", label: "Accuracy Rate" },
            { icon: <FaChartLine className="text-3xl" />, value: "1,200+", label: "Cases Solved" },
            { icon: <FaClock className="text-3xl" />, value: "50ms", label: "Analysis Speed" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-gray-800/40 hover:bg-[#00FF41] backdrop-blur-md transition-all duration-500 rounded-xl p-6 text-center border border-gray-700/50 hover:border-[#00FF41] cursor-pointer group"
            >
              <div className="flex justify-center mb-4 text-[#00FF41] group-hover:text-white">
                {stat.icon}
              </div>
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-gray-200 group-hover:text-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}