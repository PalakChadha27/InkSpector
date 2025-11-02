// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaShieldAlt, FaUser, FaCog, FaSignOutAlt, FaEnvelope, FaPhone, FaLock, FaEdit } from 'react-icons/fa';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('personal');
//   const [formData, setFormData] = useState({
//     fullName: 'nekhil',
//     email: 'testing@gmail.com',
//     phoneNumber: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Profile Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
//           <p className="text-gray-400">Manage your account settings and preferences</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Profile Info */}
//           <div className="lg:col-span-1">
//             {/* Profile Card */}
//             <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
//               <div className="flex items-center mb-6">
//                 <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold text-white">
//                   N
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-xl font-bold">nekhil</h3>
//                   <p className="text-gray-400">testing@gmail.com</p>
//                 </div>
//               </div>

//               {/* Credits */}
//               <div className="mb-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-400">Credits</span>
//                   <span className="font-bold">0</span>
//                 </div>
//               </div>

//               {/* Protected Status */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-400">Protected</span>
//                   <span className="font-bold text-green-400">99.9%</span>
//                 </div>
//                 <div className="w-full bg-gray-700 rounded-full h-2">
//                   <div 
//                     className="h-2 rounded-full"
//                     style={{ backgroundColor: '#00ff41', width: '99.9%' }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Tabs */}
//             <div className="bg-gray-800 rounded-xl p-1 border border-gray-700">
//               <button
//                 onClick={() => setActiveTab('personal')}
//                 className={`w-full text-left px-4 py-3 rounded-lg transition ${
//                   activeTab === 'personal' 
//                     ? 'bg-gray-700 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Personal Information
//               </button>
//               <button
//                 onClick={() => setActiveTab('security')}
//                 className={`w-full text-left px-4 py-3 rounded-lg transition ${
//                   activeTab === 'security' 
//                     ? 'bg-gray-700 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 Password & Security
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Content */}
//           <div className="lg:col-span-2">
//             {activeTab === 'personal' && (
//               <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//                 <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
//                 <p className="text-gray-400 mb-6">
//                   Update your personal details and contact information
//                 </p>

//                 <form onSubmit={handleSubmit}>
//                   {/* Full Name */}
//                   <div className="mb-6">
//                     <label className="block text-gray-300 mb-3 font-medium">Full Name</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaUser className="text-gray-500" />
//                       </div>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:border-green-500"
//                         placeholder="Enter your full name"
//                       />
//                     </div>
//                   </div>

//                   {/* Email Address */}
//                   <div className="mb-6">
//                     <label className="block text-gray-300 mb-3 font-medium">Email Address</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaEnvelope className="text-gray-500" />
//                       </div>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:border-green-500"
//                         placeholder="Enter your email address"
//                       />
//                     </div>
//                   </div>

//                   {/* Phone Number */}
//                   <div className="mb-6">
//                     <label className="block text-gray-300 mb-3 font-medium">Phone Number</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaPhone className="text-gray-500" />
//                       </div>
//                       <input
//                         type="tel"
//                         name="phoneNumber"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:border-green-500"
//                         placeholder="Enter your phone number"
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full py-3 rounded-lg font-medium transition"
//                     style={{ backgroundColor: '#00ff41', color: '#000' }}
//                   >
//                     Update Information
//                   </button>
//                 </form>
//               </div>
//             )}

//             {activeTab === 'security' && (
//               <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//                 <h2 className="text-2xl font-bold mb-2">Password & Security</h2>
//                 <p className="text-gray-400 mb-6">
//                   Change your password to keep your account secure
//                 </p>

//                 <form onSubmit={handleSubmit}>
//                   {/* Current Password */}
//                   <div className="mb-4">
//                     <label className="block text-gray-300 mb-2">Current Password</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaLock className="text-gray-500" />
//                       </div>
//                       <input
//                         type="password"
//                         name="currentPassword"
//                         value={formData.currentPassword}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:border-green-500"
//                         placeholder="Enter current password"
//                       />
//                     </div>
//                   </div>

//                   {/* New Password */}
//                   <div className="mb-4">
//                     <label className="block text-gray-300 mb-2">New Password</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaLock className="text-gray-500" />
//                       </div>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:border-green-500"
//                         placeholder="Enter new password"
//                       />
//                     </div>
//                   </div>

//                   {/* Confirm Password */}
//                   <div className="mb-6">
//                     <label className="block text-gray-300 mb-2">Confirm New Password</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FaLock className="text-gray-500" />
//                       </div>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:border-green-500"
//                         placeholder="Confirm new password"
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full py-3 rounded-lg font-medium transition"
//                     style={{ backgroundColor: '#00ff41', color: '#000' }}
//                   >
//                     Update Password
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center py-4">
//               <button 
//                 onClick={() => navigate('/dashboard')}
//                 className="flex-1 text-center py-2 font-medium text-gray-400 hover:text-white transition"
//               >
//                 Dashboard
//               </button>
//               <button 
//                 onClick={() => navigate('/quiz')}
//                 className="flex-1 text-center py-2 font-medium text-gray-400 hover:text-white transition"
//               >
//                 Quiz
//               </button>
//               <button 
//                 className="flex-1 text-center py-2 font-medium"
//                 style={{ color: '#00ff41' }}
//               >
//                 Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Profile;









import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaUser, FaCog, FaSignOutAlt, FaEnvelope, FaPhone, FaLock, FaEdit, FaChartBar, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// Get the API URL from Vite's env variables
const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(null); // State for API data
  const [loading, setLoading] = useState(true);

  // Form data is now separate, initialized empty
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Corrected logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange')); // Notify navbar
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  // Fetch profile data on component load
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No auth token found. Please log in.');
      handleLogout();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Session expired. Please log in again.');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setUser(data);
      // Pre-fill the form with user data
      setFormData(prev => ({
        ...prev,
        fullName: data.name || '',
        email: data.email || '',
        // phoneNumber: data.phone || '' // Add this if you add 'phone' to your backend model
      }));

    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error(error.message);
      if (error.message.includes('Session expired')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]); // navigate is a stable dependency

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // TODO: Backend routes for 'update profile' and 'change password' are needed
    if (activeTab === 'personal') {
      toast.success('Profile update (demo)!');
      console.log('Updating personal info:', formData);
    } else {
      toast.success('Password change (demo)!');
      console.log('Updating password info:', formData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <svg className="animate-spin h-8 w-8" style={{ color: '#00ff41' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // Calculate protection %
  const protectionPercent = user?.protectionPercent ?? 
    Math.round((user?.threatsBlocked || 0) * 100 / Math.max(1, user?.attemptsDetected || 1));
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
              <div className="flex items-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900"
                  style={{ backgroundColor: '#00ff41' }} // Use neon green for avatar bg
                >
                  {userInitial}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{user?.name || 'User'}</h3>
                  <p className="text-gray-400">{user?.email || 'No email'}</p>
                </div>
              </div>

              {/* Credits */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Credits</span>
                  <span className="font-bold">{user?.credits || 0}</span>
                </div>
              </div>

              {/* Protected Status */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Protected</span>
                  <span className="font-bold" style={{ color: '#00ff41' }}>{protectionPercent}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ backgroundColor: '#00ff41', width: `${protectionPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-800 rounded-xl p-1 border border-gray-700">
              <button
                onClick={() => setActiveTab('personal')}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeTab === 'personal' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeTab === 'security' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Password & Security
              </button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {activeTab === 'personal' && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
                <p className="text-gray-400 mb-6">
                  Update your personal details and contact information
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-3 font-medium" htmlFor="fullName">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1"
                        style={{'--tw-ring-color': '#00ff41', borderColor: '#4b5563' }}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-3 font-medium" htmlFor="email">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1"
                        style={{'--tw-ring-color': '#00ff41', borderColor: '#4b5563' }}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-3 font-medium" htmlFor="phoneNumber">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-500" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1"
                        style={{'--tw-ring-color': '#00ff41', borderColor: '#4b5563' }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-medium transition"
                    style={{ backgroundColor: '#00ff41', color: '#0D0208' }}
                  >
                    Update Information
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold mb-2">Password & Security</h2>
                <p className="text-gray-400 mb-6">
                  Change your password to keep your account secure
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Current Password */}
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="currentPassword">Current Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1"
                        style={{'--tw-ring-color': '#00ff41', borderColor: '#4b5563' }}
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="newPassword">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1"
                        style={{'--tw-ring-color': '#00ff41', borderColor: '#4b5563' }}
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-1"
                        style={{'--tw-ring-color': '#00ff41', borderColor: '#4b5563' }}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-medium transition"
                    style={{ backgroundColor: '#00ff41', color: '#0D0208' }}
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 lg:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-around items-center py-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 text-center py-2 font-medium text-gray-400 hover:text-white transition flex flex-col items-center"
              >
                <FaChartBar className="mb-1" />
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/quiz')}
                className="flex-1 text-center py-2 font-medium text-gray-400 hover:text-white transition flex flex-col items-center"
              >
                <FaLightbulb className="mb-1" />
                Quiz
              </button>
              <button 
                className="flex-1 text-center py-2 font-medium flex flex-col items-center"
                style={{ color: '#00ff41' }}
              >
                <FaUser className="mb-1" />
                Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

