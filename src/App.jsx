// App.jsx
import React from "react";
import { FaHome, FaTools, FaBook, FaSearch, FaUserPlus, FaPenFancy, FaLayerGroup, FaEraser, FaFingerprint, FaMapMarkerAlt, FaHistory } from "react-icons/fa";
import { MdGesture, MdTouchApp, MdSpeed } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FaRegFilePdf } from "react-icons/fa6";
import { GrScan } from "react-icons/gr";
import { FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import bgImage from './assets/image.png';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans ">

      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-700 ">
        <h1 className="text-2xl font-bold">InkSpector</h1>
      <nav className="flex-1 flex justify-center">
    <div className="flex gap-8 text-gray-400">
      <a href="#" className="text-white hover:text-indigo-400 flex items-center gap-2 "><FaHome />Home</a>
      <a href="#" className="text-white hover:text-indigo-400 flex items-center gap-2"><FaTools />Tools</a>
      <a href="#" className="text-white hover:text-indigo-400 flex items-center gap-2"><FaBook />Case Study</a>
      <a href="#" className="text-white hover:text-indigo-400 flex items-center gap-2"><FaSearch />Analysis</a>
    </div>
  </nav>

  {/* Register Button */}
  <a
    href="#"
    className="hover:text-white bg-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-500 transition flex items-center gap-2"
  ><FaUserPlus />
    Register
  </a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 px-6 ">
        <h2 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-indigo-400">InkSpector</span>
        </h2>
        <p className="max-w-xl text-gray-400 text-lg mb-8">
          Detect forgeries, verify authenticity, and uncover digital fingerprints with our cutting-edge forensic analysis platform trusted by law enforcement and legal professionals worldwide.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium">
            Analyze Now
          </button>
          <button className="px-6 py-3 border border-gray-500 hover:border-indigo-400 rounded-lg font-medium">
            Learn More
          </button>
        </div>
        <div className="flex mb:20 flex-col md:flex-row gap-6">
  {/* Card 1 */}
  <div className="mt-10 bg-indigo-500/10 hover:bg-indigo-700 transition duration-300 rounded-lg p-6 text-center min-w-[200px] cursor-pointer">
    <p className="text-3xl font-bold text-indigo-400">99.1%</p>
    <p className="text-white-400">Accuracy Rate</p>
  </div>

  {/* Card 2 */}
  <div className=" mt-10 bg-indigo-500/10 hover:bg-indigo-700 transition duration-300 rounded-lg p-6 text-center min-w-[200px] cursor-pointer">
    <p className="text-3xl font-bold text-indigo-400">1,200+</p>
    <p className="text-white-400">Cases Solved</p>
  </div>

  {/* Card 3 */}
  <div className="mt-10 bg-indigo-500/10 hover:bg-indigo-700 transition duration-300 rounded-lg p-6 text-center min-w-[200px] cursor-pointer">
    <p className="text-3xl font-bold text-indigo-400">50ms</p>
    <p className="text-white-400">Analysis Speed</p>
  </div>
</div>

      </section>

      {/* Features Section */}
      <section className="px-8 py-16 bg-gray-800 rounded-t-3xl">
        <h3 className="text-3xl font-bold text-center mb-12">Comprehensive Forensic Analysis</h3>
        <p className="text-center max-w-xl mx-auto text-gray-400 text-lg mb-16">
          Our AI-powered platform combines multiple forensic techniques to deliver unparalleled document authentication
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1: Signature Verification */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><MdGesture /></div>
            <h4 className="text-xl font-semibold mb-3">Signature Verification</h4>
            <p className="text-gray-400 mb-4">
              Advanced algorithms analyze stroke patterns, pressure points, and behavioral biometrics to detect forged signatures with 99.1% accuracy.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MdGesture className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Stroke Pattern Analysis</div>
                  <div className="text-gray-400 text-sm">Identifies unnatural pen movements</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MdTouchApp className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Pressure Point Mapping</div>
                  <div className="text-gray-400 text-sm">Detects inconsistent pressure application</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MdSpeed className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Behavioral Biometrics</div>
                  <div className="text-gray-400 text-sm">Analyzes writing speed and rhythm</div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-gray-700 rounded">
      <div className="h-1.5 bg-indigo-400 rounded px-10" style={{ width: '85%' }}></div>
    </div>
            </div>
          </div>

          {/* Card 2: Text Tamper Detection */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><HiOutlineDocumentText /></div>
            <h4 className="text-xl font-semibold mb-3">Text Tamper Detection</h4>
            <p className="text-gray-400 mb-4">
              Reveals altered text, erasures, and additions through spectral analysis and ink density measurements.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaPenFancy className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Ink Spectral Analysis</div>
                  <div className="text-gray-400 text-sm">Identifies different ink compositions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaLayerGroup className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Layer Detection</div>
                  <div className="text-gray-400 text-sm">Reveals overwritten text</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEraser className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Erasure Identification</div>
                  <div className="text-gray-400 text-sm">Detects chemical and physical erasures</div>
                </div>
              </div>
                            <div className="h-1.5 w-full bg-gray-700 rounded">
      <div className="h-1.5 bg-indigo-400 rounded px-10" style={{ width: '85%' }}></div>
    </div>
            </div>
          </div>

          {/* Card 3: Metadata Forensics */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><FaFingerprint /></div>
            <h4 className="text-xl font-semibold mb-3">Metadata Forensics</h4>
            <p className="text-gray-400 mb-4">
              Extracts and analyzes hidden digital fingerprints including creation tools, modification history, and geolocation data.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaHistory className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Timeline Analysis</div>
                  <div className="text-gray-400 text-sm">Reconstructs document history</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Geolocation Tracking</div>
                  <div className="text-gray-400 text-sm">Identifies document origin locations</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaFingerprint className="text-lg text-indigo-300" />
                <div>
                  <div className="font-semibold text-white">Digital Fingerprinting</div>
                  <div className="text-gray-400 text-sm">Identifies editing software used</div>
                </div>
              </div>
            </div>
                          <div className="h-1.5 w-full bg-gray-700 rounded">
      <div className="h-1.5 bg-indigo-400 rounded" style={{ width: '85%' }}></div>
    </div>
          </div>
        </div>
      </section>

      {/* further */}
      <section className="px-8 py-16 bg-gray-800 rounded-t-3xl">
        <h3 className="text-3xl font-bold text-center mb-12">Our Forensic Tools</h3>
        <p className="text-center max-w-xl mx-auto text-gray-400 text-lg mb-12">
          Specialized tools designed for different document forensic analysis needs
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Card 1: Signature Verification */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><MdGesture /></div>
            <h4 className="text-xl font-semibold mb-3">Signature Analyzer Pro</h4>
            <p className="text-gray-400">
              Advanced signature verification tool that detects forgeries with 99.1% accuracy using behavioral biometrics and pressure analysis.
            </p>
          </div>

          {/* Card 2: Text Tamper Detection */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><HiOutlineDocumentText /></div>
            <h4 className="text-xl font-semibold mb-3">Document Integrity Scanner</h4>
            <p className="text-gray-400 mb-4">
              Detects text alterations, erasures, and page substitutions with spectral analysis and layer detection technology.
            </p>
          </div>

          {/* Card 3: Metadata Forensics */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><FaFingerprint /></div>
            <h4 className="text-xl font-semibold mb-3">Metadata Inspector</h4>
            <p className="text-gray-400 mb-4">
              Extracts and analyzes hidden digital fingerprints including creation tools, modification history, and geolocation data.
            </p>
          </div>
          {/* Card 4 */}
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><GrScan /></div>
            <h4 className="text-xl font-semibold mb-3">Paper Forensics</h4>
            <p className="text-gray-400 mb-4">
              Identifies the source paper through microscopic analysis of printing patterns and toner characteristics.
            </p>
          </div>
          {/* Card 5 */}
<div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400 transition">
            <div className="mb-4 text-3xl text-indigo-400"><FaRegFilePdf /></div>
            <h4 className="text-xl font-semibold mb-3">Digital Document Examiner</h4>
            <p className="text-gray-400 mb-4">
              Detects digital tampering in PDFs and other electronic documents through metadata and content analysis.
            </p>
          </div>
        </div>
      </section> 
      {/* footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 md:px-16">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Column 1: Company Info */}
        <div>
          <h2 className="text-indigo-400 text-xl font-bold mb-4">InkSpector</h2>
          <p className="text-sm text-gray-300 mb-4">
            Advanced AI-powered document forensics platform trusted by law
            enforcement agencies, legal professionals, and financial
            institutions worldwide.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-500 text-xl hover:opacity-80">
              <FaLinkedin />
            </a>
            <a href="#" className="text-blue-500 text-xl hover:opacity-80">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Features</a></li>
            <li><a href="#" className="hover:text-indigo-400">Tools</a></li>
            <li><a href="#" className="hover:text-indigo-400">Case Studies</a></li>
            <li><a href="#" className="hover:text-indigo-400">Document Analysis</a></li>
            <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Documentation</a></li>
            <li><a href="#" className="hover:text-indigo-400">API Reference</a></li>
            <li><a href="#" className="hover:text-indigo-400">Forensics Blog</a></li>
            <li><a href="#" className="hover:text-indigo-400">Research Papers</a></li>
            <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
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
            <button className="bg-indigo-400 text-black px-4 py-2 rounded-r-full hover:bg-indigo-300">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 text-center">
        © 2025 InkSpector. All rights reserved. |{' '}
        <a href="#" className="text-indigo-400 hover:underline">
          Privacy Policy
        </a>{' '}
        |{' '}
        <a href="#" className="text-indigo-400 hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
    </div>
  );
}
