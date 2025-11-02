import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaEnvelope, FaLock } from 'react-icons/fa';
import { MdOutlinePrivacyTip } from 'react-icons/md';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleDemoLogin = () => {
    setIsSubmitting(true);
    // Auto-fill demo credentials
    setFormData({
      email: 'testing@gmail.com',
      password: 'demo123',
      rememberMe: false
    });
    
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaUserShield className="text-4xl" style={{ color: '#00ff41' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-400">
            Sign in to your PhishShield AI account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-1`}
                style={{ 
                  borderColor: errors.email ? '#ef4444' : '#4b5563',
                  focusBorderColor: '#00ff41',
                  focusRingColor: '#00ff41'
                }}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-1`}
                style={{ 
                  borderColor: errors.password ? '#ef4444' : '#4b5563',
                  focusBorderColor: '#00ff41',
                  focusRingColor: '#00ff41'
                }}
                placeholder="Enter your password"
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
                className="h-4 w-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                style={{ 
                  accentColor: '#00ff41',
                  backgroundColor: formData.rememberMe ? '#00ff41' : '#374151'
                }}
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
            className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition mb-4"
            style={{ 
              backgroundColor: isSubmitting ? '#059669' : '#00ff41', 
              color: '#000',
              opacity: isSubmitting ? 0.8 : 1
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#000' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition mb-6 border"
            style={{ 
              borderColor: '#00ff41',
              backgroundColor: 'transparent',
              color: '#00ff41',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            Demo login (testing@gmail.com)
          </button>
 
          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#00ff41' }}>
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