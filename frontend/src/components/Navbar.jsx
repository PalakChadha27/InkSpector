// import React from 'react';
// import { Link } from 'react-router-dom';

// import { FaHome, FaTools, FaBook, FaSearch, FaUserPlus, FaPenFancy, FaLayerGroup, FaEraser, FaFingerprint, FaMapMarkerAlt, FaHistory } from "react-icons/fa";

// export default function Navbar() {
//   return (
//     <div className=" bg-[#0D0208] text-[#00FF41] font-sans ">
//     <header className="flex items-center justify-between px-8 py-5 border-b border-gray-700 ">
//             <h1 className="text-2xl font-bold">TrustNet CyberCop</h1>
//           <nav className="flex-1 flex justify-center">
//         <div className="flex gap-8 text-gray-400">
//           <Link to="/" className="text-white hover:text-[#00FF41] flex items-center gap-2 "><FaHome />Home</Link>
//           <Link to="/tools" className="text-white hover:text-[#00FF41] flex items-center gap-2"><FaTools />Tools</Link>
//           <Link to="/casestudy" className="text-white hover:text-[#00FF41]  flex items-center gap-2"><FaBook />Case Study</Link>
//           <Link to="/analysis" className="text-white hover:text-[#00FF41]  flex items-center gap-2"><FaSearch />Analysis</Link>
//         </div>
//       </nav>
    
//       {/* Register Button */}
//       <Link to="/register"
//         className="text-[#0D0208] bg-[#00FF41] px-4 py-2 rounded-lg font-medium hover:bg-white transition flex items-center gap-2"
//       ><FaUserPlus />
//         Register
//       </Link>
//           </header>
//           </div>
//   );
// }











import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaTools, FaBook, FaSearch, FaUserPlus, 
  FaUserCircle, FaBars, FaTimes, FaTachometerAlt, FaSignOutAlt 
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount and when 'authChange' event fires
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuthStatus(); // Check on initial load
    window.addEventListener('authChange', checkAuthStatus); // Listen for login/logout events

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange')); // Notify other components
    setIsProfileOpen(false); // Close dropdown
    navigate('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-[#0D0208] text-white font-sans sticky top-0 z-50">
      <header className="relative flex items-center justify-between px-4 sm:px-8 py-5 border-b border-gray-700">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#00FF41]">
          TrustNet CyberCop
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8 text-gray-400">
            <Link to="/" className="hover:text-[#00FF41] flex items-center gap-2"><FaHome />Home</Link>
            <Link to="/tools" className="hover:text-[#00FF41] flex items-center gap-2"><FaTools />Tools</Link>
            <Link to="/casestudy" className="hover:text-[#00FF41] flex items-center gap-2"><FaBook />Case Study</Link>
            <Link to="/analysis" className="hover:text-[#00FF41] flex items-center gap-2"><FaSearch />Analysis</Link>
          </div>
        </nav>
        
        {/* Right Side: Auth & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            // --- Profile Icon & Dropdown ---
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FaUserCircle className="text-3xl text-gray-400 hover:text-[#00FF41] transition-colors" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    <FaUserCircle /> Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // --- Register Button (Desktop only) ---
            <Link 
              to="/register"
              className="hidden md:flex text-[#0D0208] bg-[#00FF41] px-4 py-2 rounded-lg font-medium hover:bg-white transition items-center gap-2"
            >
              <FaUserPlus />
              Register
            </Link>
          )}

          {/* --- Mobile Menu Toggle --- */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0D0208] border-b border-gray-700 md:hidden z-40">
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={closeMobileMenu} className="hover:text-[#00FF41] flex items-center gap-2 text-lg"><FaHome />Home</Link>
            <Link to="/tools" onClick={closeMobileMenu} className="hover:text-[#00FF41] flex items-center gap-2 text-lg"><FaTools />Tools</Link>
            <Link to="/casestudy" onClick={closeMobileMenu} className="hover:text-[#00FF41] flex items-center gap-2 text-lg"><FaBook />Case Study</Link>
            <Link to="/analysis" onClick={closeMobileMenu} className="hover:text-[#00FF41] flex items-center gap-2 text-lg"><FaSearch />Analysis</Link>
            
            {!isLoggedIn && (
              <Link 
                to="/register"
                onClick={closeMobileMenu}
                className="text-[#0D0208] bg-[#00FF41] px-4 py-2 rounded-lg font-medium hover:bg-white transition flex items-center justify-center gap-2"
              >
                <FaUserPlus />
                Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
