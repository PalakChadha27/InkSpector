// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserShield, FaEnvelope, FaLock } from 'react-icons/fa';
// import { MdOutlinePrivacyTip } from 'react-icons/md';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const validate = () => {
//     const newErrors = {};
    
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
//     if (!formData.password) newErrors.password = 'Password is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setIsSubmitting(true);
//       // Simulate API call
//       setTimeout(() => {
//         setIsSubmitting(false);
//         navigate('/dashboard');
//       }, 1500);
//     }
//   };

//   const handleDemoLogin = () => {
//     setIsSubmitting(true);
//     // Auto-fill demo credentials
//     setFormData({
//       email: 'testing@gmail.com',
//       password: 'demo123',
//       rememberMe: false
//     });
    
//     // Simulate login process
//     setTimeout(() => {
//       setIsSubmitting(false);
//       navigate('/dashboard');
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <FaUserShield className="text-4xl" style={{ color: '#00ff41' }} />
//           </div>
//           <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
//           <p className="text-gray-400">
//             Sign in to your PhishShield AI account
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-gray-300 mb-2">Email address</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaEnvelope className="text-gray-500" />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-1`}
//                 style={{ 
//                   borderColor: errors.email ? '#ef4444' : '#4b5563',
//                   focusBorderColor: '#00ff41',
//                   focusRingColor: '#00ff41'
//                 }}
//                 placeholder="Enter your email"
//               />
//             </div>
//             {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-gray-300 mb-2">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="text-gray-500" />
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-1`}
//                 style={{ 
//                   borderColor: errors.password ? '#ef4444' : '#4b5563',
//                   focusBorderColor: '#00ff41',
//                   focusRingColor: '#00ff41'
//                 }}
//                 placeholder="Enter your password"
//               />
//             </div>
//             {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <input
//                 id="rememberMe"
//                 name="rememberMe"
//                 type="checkbox"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="h-4 w-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
//                 style={{ 
//                   accentColor: '#00ff41',
//                   backgroundColor: formData.rememberMe ? '#00ff41' : '#374151'
//                 }}
//               />
//               <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
//                 Remember me
//               </label>
//             </div>
//             <Link 
//               to="/forgot-password" 
//               className="text-sm transition hover:underline"
//               style={{ color: '#00ff41' }}
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition mb-4"
//             style={{ 
//               backgroundColor: isSubmitting ? '#059669' : '#00ff41', 
//               color: '#000',
//               opacity: isSubmitting ? 0.8 : 1
//             }}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#000' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Signing In...
//               </>
//             ) : (
//               'Sign In'
//             )}
//           </button>

//           {/* Demo Login Button */}
//           <button
//             type="button"
//             onClick={handleDemoLogin}
//             disabled={isSubmitting}
//             className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition mb-6 border"
//             style={{ 
//               borderColor: '#00ff41',
//               backgroundColor: 'transparent',
//               color: '#00ff41',
//               opacity: isSubmitting ? 0.6 : 1
//             }}
//           >
//             Demo login (testing@gmail.com)
//           </button>
 
//           {/* Register Link */}
//           <div className="text-center">
//             <p className="text-gray-400">
//               Don't have an account?{' '}
//               <Link to="/register" style={{ color: '#00ff41' }}>
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </form>

//         {/* Security Badge */}
//         <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
//           <MdOutlinePrivacyTip className="mr-2" style={{ color: '#00ff41' }} />
//           <span>Your data is secured with AES-256 encryption</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserShield, FaEnvelope, FaLock } from 'react-icons/fa';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { toast } from 'react-hot-toast';

// Get the API URL from Vite's env variables
const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- THIS FUNCTION IS UPDATED ---
  const handleSubmit = async (e, demoData = null) => {
    e.preventDefault();
    
    let email, password;

    if (demoData) {
      // Use demo data if provided
      email = demoData.email;
      password = demoData.password;
    } else {
      // Otherwise, use form state and validate
      if (!validate()) {
        return;
      }
      email = formData.email;
      password = formData.password;
    }
    
    setIsSubmitting(true);
    try {
      // --- Hardcoded API Call using fetch ---
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Use the correct variables
      });

      const res = await response.json();

      if (!response.ok) {
        // This is the "wrong pass check"
        throw new Error(res.message || 'Login failed');
      }
      // ------------------------------------

      const { token, user } = res;
      localStorage.setItem('token', token);

      window.dispatchEvent(new Event('authChange'));
      toast.success(`Welcome back, ${user.name}!`);

      // Redirect to dashboard or previous page
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- THIS FUNCTION IS UPDATED ---
  const handleDemoLogin = (e) => {
    e.preventDefault();
    const demoCredentials = {
      email: 'testing@gmail.com',
      password: 'password123',
    };
    
    // Set form data just to show the user in the inputs
    setFormData({
      ...demoCredentials,
      rememberMe: false
    });
    
    // Call handleSubmit directly with the credentials, bypassing the state race condition
    handleSubmit(e, demoCredentials);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaUserShield className="text-4xl md:text-5xl" style={{ color: '#00ff41' }} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to your TrustNet CyberCop account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700 shadow-lg">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email address</label>
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
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-1`}
                style={{ 
                  borderColor: errors.email ? '#ef4444' : '#4b5563', 
                  '--tw-ring-color': '#00ff41' 
                }}
                placeholder="testing@gmail.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-1`}
                style={{ 
                  borderColor: errors.password ? '#ef4444' : '#4b5563', 
                  '--tw-ring-color': '#00ff41' 
                }}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 focus:ring-0 rounded"
                style={{ accentColor: '#00ff41' }}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link 
              to="/forgot-password" 
              className="text-sm transition hover:underline"
              style={{ color: '#00ff41' }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition hover:opacity-90 disabled:opacity-70"
            style={{ backgroundColor: '#00ff41', color: '#0D0208' }}
          >
            {isSubmitting && formData.email !== 'testing@gmail.com' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#0D0208' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
            className="w-full mt-4 py-3 rounded-lg font-medium flex items-center justify-center transition hover:bg-gray-700/50 disabled:opacity-60 border"
            style={{ 
              borderColor: '#00ff41',
              color: '#00ff41',
            }}
          >
            {isSubmitting && formData.email === 'testing@gmail.com' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#00ff41' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Demo...
              </>
            ) : (
              'Demo Login (Armaan)'
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-2 text-gray-400">
                Or sign in with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href={`${API_URL}/auth/google`}
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition bg-gray-700 text-white hover:bg-gray-600"
            >
              <SiGoogle className="w-5 h-5 mr-3" />
              Google
            </a>
            <a 
              href={`${API_URL}/auth/github`}
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition bg-gray-700 text-white hover:bg-gray-600"
            >
              <SiGithub className="w-5 h-5 mr-3" />
              GitHub
            </a>
          </div>
          
          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium hover:underline" style={{ color: '#00ff41' }}>
                Sign up
              </Link>
            </p>
          </div>
        </form>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
          <MdOutlinePrivacyTip className="mr-2" style={{ color: '#00ff41' }} />
          <span>Your data is secured with AES-256 encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

