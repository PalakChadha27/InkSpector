import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Analysis from "./components/Analysis";
import DeepFake from "./components/DeepFake";
import VoiceAuthenticity from "./components/VoiceAuthenticity";
import VoiceAnalysis from "./components/VoiceAnalysis";
import BioAuthenticity from "./components/BioAuthenticity";
import MetaVerification from "./components/MetaVerification";
import DocumentVerification from "./components/DocumentVerification";
import DocumentAnalysis from "./components/DocumentAnalysis";
import TrustScore from "./components/TrustScore";
import TrustScoreAnalysis from './components/TrustScoreAnalysis';
import CaseStudy from "./components/CaseStudy";
import Tools from "./components/Tools";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Profile from "./components/Profile";

function App() {
  // This will run once when the app loads
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Test User" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend Response:", data);
      })
      .catch((err) => {
        console.error("Error connecting to backend:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Features />
              </>
            }
          />
          
          {/* Other pages */}
          <Route path="/features" element={<Features />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/deepfake" element={<DeepFake />} />
          <Route path="/voiceauthenticity" element={<VoiceAuthenticity />} />
          <Route path="/voice-analysis" element={<VoiceAnalysis />} />
          <Route path="/bioauthenticity" element={<BioAuthenticity />} />
          <Route path="/metaverification" element={<MetaVerification />} />
          <Route path="/documentverification" element={<DocumentVerification />} />
          <Route path="/document-analysis" element={<DocumentAnalysis />} />
          <Route path="/trustscore" element={<TrustScore />} />
          <Route path="/trustscore-analysis" element={<TrustScoreAnalysis />} />
          <Route path="/casestudy" element={<CaseStudy />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
