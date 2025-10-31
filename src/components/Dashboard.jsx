import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaChartBar, FaUser, FaCog, FaSignOutAlt, FaLock, FaEye, FaCoins, FaLightbulb } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const recentActivities = [
    { url: 'https://devrel.co/about/', date: '9/27/2025 at 08:54 AM' },
    { url: 'https://devrel.co/about/', date: '9/27/2025 at 08:55 AM' },
    { url: 'https://devrel.co/about/', date: '9/27/2025 at 08:58 AM' },
    { url: 'https://devrel.co/about/', date: '9/27/2025 at 09:00 AM' },
    { url: 'https://devrel.co/about/', date: '9/27/2025 at 09:03 AM' },
    { url: 'https://devrel.co/about/', date: '9/27/2025 at 09:03 AM' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Hello, nekhil</h2>
          <p className="text-gray-400">Here's your cybersecurity overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Protected Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Protected</h3>
              <FaLock className="text-xl" style={{ color: '#00ff41' }} />
            </div>
            <p className="text-3xl font-bold mb-2">0%</p>
            <p className="text-gray-400 text-sm">You're 0% safer online</p>
          </div>

          {/* Threats Blocked Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Threats Blocked</h3>
              <FaShieldAlt className="text-xl" style={{ color: '#00ff41' }} />
            </div>
            <p className="text-3xl font-bold mb-2">0</p>
            <p className="text-gray-400 text-sm">&nbsp;</p>
          </div>

          {/* Credits Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Credits</h3>
              <FaCoins className="text-xl" style={{ color: '#00ff41' }} />
            </div>
            <p className="text-3xl font-bold mb-2">0</p>
            <p className="text-gray-400 text-sm">&nbsp;</p>
          </div>

          {/* Attempts Detected Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Attempts Detected</h3>
              <FaEye className="text-xl" style={{ color: '#00ff41' }} />
            </div>
            <p className="text-3xl font-bold mb-2">0</p>
            <p className="text-gray-400 text-sm">&nbsp;</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Security Tip & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Security Tip */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FaLightbulb className="text-xl mr-3" style={{ color: '#00ff41' }} />
                <h3 className="text-xl font-bold">Security Tip</h3>
              </div>
              <p className="text-gray-300">Use 2FA whenever possible.</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <p className="text-gray-400 mb-4">Your latest browsing security checks</p>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-300">{activity.url}</p>
                      <p className="text-gray-500 text-sm">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Security Quiz */}
          <div className="space-y-8">
            {/* Security Quiz Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-2">Take Security Quiz</h3>
              <p className="text-gray-400 mb-6">
                Test your knowledge and earn credits to unlock features
              </p>
              <button 
            onClick={() => navigate('/quiz')}
                className="w-full py-3 rounded-lg font-medium transition"
                style={{ backgroundColor: '#00ff41', color: '#000' }}
              >
                Start Quiz
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              
              {/* Time Period Tabs */}
              <div className="flex space-x-4 mb-6">
                <button className="text-sm font-medium" style={{ color: '#00ff41' }}>
                  This Week
                </button>
                <button className="text-sm font-medium text-gray-400">
                  This Month
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-400 text-sm">threats blocked</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-400 text-sm">scans completed</p>
                </div>
              </div>

              {/* Quiz Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Quiz Score</span>
                  <span className="font-bold">0%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ backgroundColor: '#00ff41', width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center">
                <button className="flex-1 text-center py-2 font-medium" style={{ color: '#00ff41' }}>
                  Dashboard
                </button>
                <button 
            onClick={() => navigate('/quiz')} className="flex-1 text-center py-2 font-medium text-gray-400">
                  Quiz
                </button>
                <button onClick={() => navigate('/profile')} className="flex-1 text-center py-2 font-medium text-gray-400">
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;