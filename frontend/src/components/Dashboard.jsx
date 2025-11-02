// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaShieldAlt, FaChartBar, FaUser, FaCog, FaSignOutAlt, FaLock, FaEye, FaCoins, FaLightbulb } from 'react-icons/fa';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any stored authentication tokens
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   const recentActivities = [
//     { url: 'https://devrel.co/about/', date: '9/27/2025 at 08:54 AM' },
//     { url: 'https://devrel.co/about/', date: '9/27/2025 at 08:55 AM' },
//     { url: 'https://devrel.co/about/', date: '9/27/2025 at 08:58 AM' },
//     { url: 'https://devrel.co/about/', date: '9/27/2025 at 09:00 AM' },
//     { url: 'https://devrel.co/about/', date: '9/27/2025 at 09:03 AM' },
//     { url: 'https://devrel.co/about/', date: '9/27/2025 at 09:03 AM' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold mb-2">Hello, nekhil</h2>
//           <p className="text-gray-400">Here's your cybersecurity overview for today</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {/* Protected Card */}
//           <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">Protected</h3>
//               <FaLock className="text-xl" style={{ color: '#00ff41' }} />
//             </div>
//             <p className="text-3xl font-bold mb-2">0%</p>
//             <p className="text-gray-400 text-sm">You're 0% safer online</p>
//           </div>

//           {/* Threats Blocked Card */}
//           <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">Threats Blocked</h3>
//               <FaShieldAlt className="text-xl" style={{ color: '#00ff41' }} />
//             </div>
//             <p className="text-3xl font-bold mb-2">0</p>
//             <p className="text-gray-400 text-sm">&nbsp;</p>
//           </div>

//           {/* Credits Card */}
//           <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">Credits</h3>
//               <FaCoins className="text-xl" style={{ color: '#00ff41' }} />
//             </div>
//             <p className="text-3xl font-bold mb-2">0</p>
//             <p className="text-gray-400 text-sm">&nbsp;</p>
//           </div>

//           {/* Attempts Detected Card */}
//           <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">Attempts Detected</h3>
//               <FaEye className="text-xl" style={{ color: '#00ff41' }} />
//             </div>
//             <p className="text-3xl font-bold mb-2">0</p>
//             <p className="text-gray-400 text-sm">&nbsp;</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Security Tip & Recent Activity */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Security Tip */}
//             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//               <div className="flex items-center mb-4">
//                 <FaLightbulb className="text-xl mr-3" style={{ color: '#00ff41' }} />
//                 <h3 className="text-xl font-bold">Security Tip</h3>
//               </div>
//               <p className="text-gray-300">Use 2FA whenever possible.</p>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//               <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
//               <p className="text-gray-400 mb-4">Your latest browsing security checks</p>
//               <div className="space-y-3">
//                 {recentActivities.map((activity, index) => (
//                   <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
//                     <div>
//                       <p className="font-medium text-gray-300">{activity.url}</p>
//                       <p className="text-gray-500 text-sm">{activity.date}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Security Quiz */}
//           <div className="space-y-8">
//             {/* Security Quiz Card */}
//             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//               <h3 className="text-xl font-bold mb-2">Take Security Quiz</h3>
//               <p className="text-gray-400 mb-6">
//                 Test your knowledge and earn credits to unlock features
//               </p>
//               <button 
//             onClick={() => navigate('/quiz')}
//                 className="w-full py-3 rounded-lg font-medium transition"
//                 style={{ backgroundColor: '#00ff41', color: '#000' }}
//               >
//                 Start Quiz
//               </button>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//               <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              
//               {/* Time Period Tabs */}
//               <div className="flex space-x-4 mb-6">
//                 <button className="text-sm font-medium" style={{ color: '#00ff41' }}>
//                   This Week
//                 </button>
//                 <button className="text-sm font-medium text-gray-400">
//                   This Month
//                 </button>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="text-center">
//                   <p className="text-2xl font-bold">0</p>
//                   <p className="text-gray-400 text-sm">threats blocked</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-2xl font-bold">0</p>
//                   <p className="text-gray-400 text-sm">scans completed</p>
//                 </div>
//               </div>

//               {/* Quiz Score */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-400">Quiz Score</span>
//                   <span className="font-bold">0%</span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div 
//                     className="h-2 rounded-full"
//                     style={{ backgroundColor: '#00ff41', width: '0%' }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Navigation */}
//             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//               <div className="flex justify-between items-center">
//                 <button className="flex-1 text-center py-2 font-medium" style={{ color: '#00ff41' }}>
//                   Dashboard
//                 </button>
//                 <button 
//             onClick={() => navigate('/quiz')} className="flex-1 text-center py-2 font-medium text-gray-400">
//                   Quiz
//                 </button>
//                 <button onClick={() => navigate('/profile')} className="flex-1 text-center py-2 font-medium text-gray-400">
//                   Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaShieldAlt, FaUser, FaCog,FaChartBar , FaSignOutAlt, FaLock, FaEye, FaCoins, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Get the API URL from Vite's env variables
const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

/**
 * Helper function to make authenticated API calls
 */
const fetchWithAuth = async (url) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No auth token found. Please log in.');
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    // Handle expired or invalid token
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
    throw new Error('Session expired. Please log in again.');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

/**
 * Helper function to format dates
 */
const formatDate = (dateString) => {
  if (!dateString) return 'Just now';
  return new Date(dateString).toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch user profile and activities in parallel
      const [profileData, activityData] = await Promise.all([
        fetchWithAuth(`${API_URL}/user/profile`),
        fetchWithAuth(`${API_URL}/url/activity/recent`)
      ]);
      
      setUser(profileData);
      setActivities(activityData || []);

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error(error.message);
      // If fetching fails (e.g., bad token), log out
      if (error.message.includes('token')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <svg className="animate-spin h-8 w-8 text-green-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* NOTE: The sidebar was not provided. 
        I'm assuming this dashboard is the main content area.
        The handleLogout function is ready for your sidebar's logout button.
      */}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Hello, {user?.name || 'User'}</h2>
          <p className="text-gray-400">Here's your cybersecurity overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Protected Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Protected</h3>
              <FaLock className="text-xl text-green-accent" />
            </div>
            <p className="text-3xl font-bold mb-2">{user?.protectionPercent || 0}%</p>
            <p className="text-gray-400 text-sm">You're {user?.protectionPercent || 0}% safer online</p>
          </div>

          {/* Threats Blocked Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Threats Blocked</h3>
              <FaShieldAlt className="text-xl text-green-accent" />
            </div>
            <p className="text-3xl font-bold mb-2">{user?.threatsBlocked || 0}</p>
            <p className="text-gray-400 text-sm">&nbsp;</p>
          </div>

          {/* Credits Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Credits</h3>
              <FaCoins className="text-xl text-green-accent" />
            </div>
            <p className="text-3xl font-bold mb-2">{user?.credits || 0}</p>
            <p className="text-gray-400 text-sm">&nbsp;</p>
          </div>

          {/* Attempts Detected Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Attempts Detected</h3>
              <FaEye className="text-xl text-green-accent" />
            </div>
            <p className="text-3xl font-bold mb-2">{user?.attemptsDetected || 0}</p>
            <p className="text-gray-400 text-sm">&nbsp;</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Security Tip & Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Security Tip */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FaLightbulb className="text-xl mr-3 text-green-accent" />
                <h3 className="text-xl font-bold">Security Tip</h3>
              </div>
              <p className="text-gray-300">Use 2FA (Two-Factor Authentication) whenever possible to double your account security.</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <p className="text-gray-400 mb-4">Your latest browsing security checks</p>
              <div className="space-y-3">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div key={activity._id} className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between py-2 border-b border-gray-700 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-300 break-all">{activity.url}</p>
                        <p className="text-gray-500 text-sm">{formatDate(activity.checkedAt || activity.createdAt)}</p>
                      </div>
                      <span className={`mt-2 sm:mt-0 px-3 py-1 text-sm rounded-full font-medium ${activity.isSafe ? 'bg-green-accent/10 text-green-accent' : 'bg-red-500/10 text-red-500'}`}>
                        {activity.isSafe ? 'Safe' : (activity.detectedThreat || 'Unsafe')}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">No recent activity found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Security Quiz & Stats */}
          <div className="space-y-8">
            {/* Security Quiz Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-2">Take Security Quiz</h3>
              <p className="text-gray-400 mb-6">
                Test your knowledge and earn credits to unlock features
              </p>
              <button 
                onClick={() => navigate('/quiz')}
                className="w-full py-3 rounded-lg font-medium transition bg-green-accent text-gray-900 hover:bg-green-accent/90"
              >
                Start Quiz
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              
              {/* Time Period Tabs */}
              <div className="flex space-x-4 mb-6">
                <button className="text-sm font-medium text-green-accent">
                  This Week
                </button>
                <button className="text-sm font-medium text-gray-400 hover:text-gray-200">
                  This Month
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{user?.threatsBlocked || 0}</p>
                  <p className="text-gray-400 text-sm">threats blocked</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user?.attemptsDetected || 0}</p>
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
                    className="bg-green-accent h-2 rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation (for mobile) */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 lg:hidden">
              <div className="flex justify-around items-center">
                <button className="flex-1 text-center py-2 font-medium text-green-accent flex flex-col items-center">
                  <FaChartBar className="mb-1" />
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/quiz')} 
                  className="flex-1 text-center py-2 font-medium text-gray-400 flex flex-col items-center"
                >
                  <FaLightbulb className="mb-1" />
                  Quiz
                </button>
                <button 
                  onClick={() => navigate('/profile')} 
                  className="flex-1 text-center py-2 font-medium text-gray-400 flex flex-col items-center"
                >
                  <FaUser className="mb-1" />
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
