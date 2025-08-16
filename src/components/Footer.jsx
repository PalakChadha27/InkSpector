import React from 'react';
import { FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 md:px-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <h2 className="text-[#00ff41] text-xl font-bold mb-4">InkSpector</h2>
            <p className="text-sm text-gray-300 mb-4">
              Advanced AI-powered document forensics platform trusted by law
              enforcement agencies, legal professionals, and financial
              institutions worldwide.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-[#00ff41] text-xl hover:opacity-80">
                <FaLinkedin />
              </a>
              <a href="https://github.com/PalakChadha27/InkSpector" className="text-[#00ff41] text-xl hover:opacity-80">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-[#00ff41]">Features</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Tools</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Case Studies</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Document Analysis</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-[#00ff41]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">API Reference</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Forensics Blog</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Research Papers</a></li>
              <li><a href="#" className="hover:text-[#00ff41]">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter for the latest in document forensics
              technology and case studies.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none w-full"
              />
              <button className="bg-[#00ff41] text-black px-4 py-2 rounded-r-full hover:bg-green-400">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 text-center">
          © 2025 InkSpector. All rights reserved. |{' '}
          <a href="#" className="text-[#00ff41] hover:underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="#" className="text-[#00ff41] hover:underline">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
