import React from 'react';
import { Link } from 'react-router-dom';

import { FaHome, FaTools, FaBook, FaSearch, FaUserPlus, FaPenFancy, FaLayerGroup, FaEraser, FaFingerprint, FaMapMarkerAlt, FaHistory } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className=" bg-[#0D0208] text-[#00FF41] font-sans ">
    <header className="flex items-center justify-between px-8 py-5 border-b border-gray-700 ">
            <h1 className="text-2xl font-bold">TrustNet CyberCop-Tools</h1>
          <nav className="flex-1 flex justify-center">
        <div className="flex gap-8 text-gray-400">
          <Link to="/" className="text-white hover:text-[#00FF41] flex items-center gap-2 "><FaHome />Home</Link>
          <Link to="/tools" className="text-white hover:text-[#00FF41] flex items-center gap-2"><FaTools />Tools</Link>
          <Link to="/casestudy" className="text-white hover:text-[#00FF41]  flex items-center gap-2"><FaBook />Case Study</Link>
          <Link to="/analysis" className="text-white hover:text-[#00FF41]  flex items-center gap-2"><FaSearch />Analysis</Link>
        </div>
      </nav>
    
      {/* Register Button */}
      <Link to="/register"
        className="text-[#0D0208] bg-[#00FF41] px-4 py-2 rounded-lg font-medium hover:bg-white transition flex items-center gap-2"
      ><FaUserPlus />
        Register
      </Link>
          </header>
          </div>
  );
}
