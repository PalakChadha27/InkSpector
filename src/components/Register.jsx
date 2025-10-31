import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaEnvelope, FaLock, FaIdCard, FaBuilding } from 'react-icons/fa';
import { MdPhone, MdOutlinePrivacyTip } from 'react-icons/md';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    role: 'individual'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.role === 'business' && !formData.company.trim()) newErrors.company = 'Company name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center border" style={{ borderColor: '#00ff41' }}>
          <div className="text-5xl mb-4" style={{ color: '#00ff41' }}>✓</div>
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-gray-300 mb-6">
            Your account has been created. A verification link has been sent to {formData.email}.
          </p>
          <Link 
            to="/login" 
            className="w-full py-3 rounded-lg font-medium transition"
            style={{ backgroundColor: '#00ff41', color: '#000' }}
          >
            Continue to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaUserShield className="text-4xl" style={{ color: '#00ff41' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-400">
            Join InkSpector to protect your digital identity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-1`}
                style={{ focusBorderColor: '#00ff41', focusRingColor: '#00ff41' }}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-1`}
                style={{ focusBorderColor: '#00ff41', focusRingColor: '#00ff41' }}
                placeholder="you@example.com"
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
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-1`}
                style={{ focusBorderColor: '#00ff41', focusRingColor: '#00ff41' }}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-1`}
                style={{ focusBorderColor: '#00ff41', focusRingColor: '#00ff41' }}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPhone className="text-gray-500" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-1`}
                style={{ focusBorderColor: '#00ff41', focusRingColor: '#00ff41' }}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Account Type */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Account Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'individual'})}
                className={`flex-1 py-2 rounded-lg border ${formData.role === 'individual' ? '' : 'border-gray-600'}`}
                style={formData.role === 'individual' ? { borderColor: '#00ff41', backgroundColor: 'rgba(0, 255, 65, 0.1)' } : {}}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'business'})}
                className={`flex-1 py-2 rounded-lg border ${formData.role === 'business' ? '' : 'border-gray-600'}`}
                style={formData.role === 'business' ? { borderColor: '#00ff41', backgroundColor: 'rgba(0, 255, 65, 0.1)' } : {}}
              >
                Business
              </button>
            </div>
          </div>

          {/* Company Field (Conditional) */}
          {formData.role === 'business' && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Company Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.company ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:ring-1`}
                  style={{ focusBorderColor: '#00ff41', focusRingColor: '#00ff41' }}
                  placeholder="Acme Inc."
                />
              </div>
              {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="mb-6 flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 focus:ring"
                style={{ accentColor: '#00ff41' }}
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-300">
                I agree to the <Link to="/terms" style={{ color: '#00ff41' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: '#00ff41' }}>Privacy Policy</Link>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-medium flex items-center justify-center transition"
            style={{ backgroundColor: '#00ff41', color: '#000' }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#000' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#00ff41' }}>
                Sign in
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

export default Register;
