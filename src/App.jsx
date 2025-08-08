// App.jsx
import React from "react";
import { FaHome, FaTools, FaBook, FaSearch, FaUserPlus } from "react-icons/fa";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-700">
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
      <section className="flex flex-col items-center text-center py-20 px-6">
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
        <div className="flex mb:12 flex-col md:flex-row gap-6">
  {/* Card 1 */}
  <div className="bg-indigo-500/10 hover:bg-indigo-700 transition duration-300 rounded-lg p-6 text-center min-w-[200px] cursor-pointer">
    <p className="text-3xl font-bold text-indigo-400">99.1%</p>
    <p className="text-gray-400">Accuracy Rate</p>
  </div>

  {/* Card 2 */}
  <div className="bg-indigo-500/10 hover:bg-indigo-700 transition duration-300 rounded-lg p-6 text-center min-w-[200px] cursor-pointer">
    <p className="text-3xl font-bold text-indigo-400">1,200+</p>
    <p className="text-gray-400">Cases Solved</p>
  </div>

  {/* Card 3 */}
  <div className="bg-indigo-500/10 hover:bg-indigo-700 transition duration-300 rounded-lg p-6 text-center min-w-[200px] cursor-pointer">
    <p className="text-3xl font-bold text-indigo-400">50ms</p>
    <p className="text-gray-400">Analysis Speed</p>
  </div>
</div>

      </section>

      {/* Features Section */}
      <section className="px-8 py-16 bg-gray-800 rounded-t-3xl">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h3>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400">
            <h4 className="text-xl font-semibold mb-3">Collaborative</h4>
            <p className="text-gray-400">Work with amazing people from all over the globe on exciting projects.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400">
            <h4 className="text-xl font-semibold mb-3">Innovative</h4>
            <p className="text-gray-400">We encourage unique ideas and bring them to life with the right tools.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-indigo-400">
            <h4 className="text-xl font-semibold mb-3">Supportive</h4>
            <p className="text-gray-400">A friendly environment that fosters growth and creativity.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 mt-12 border-t border-gray-700 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} HackGround. All rights reserved.
      </footer>
    </div>
  );
}
