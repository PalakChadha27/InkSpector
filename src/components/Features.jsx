import React from 'react';
import { FaHome, FaTools, FaBook, FaSearch, FaUserPlus, FaPenFancy, FaLayerGroup, FaEraser, FaFingerprint, FaMapMarkerAlt, FaHistory } from "react-icons/fa";
import { MdGesture, MdTouchApp, MdSpeed } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FaRegFilePdf } from "react-icons/fa6";
import { GrScan } from "react-icons/gr";
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
        <section className="px-8 py-16 bg-gray-800 rounded-t-3xl">
          <h3 className="text-3xl font-bold text-center mb-12">Comprehensive Forensic Analysis</h3>
          <p className="text-center max-w-xl mx-auto text-gray-400 text-lg mb-16">
            InkSpector combines cutting-edge AI models to help you verify authenticity across images, audio, text, and documents — all in one place.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-[#00ff41] transition">
              <div className="mb-4 text-3xl" style={{ color: "#00ff41" }}><MdGesture /></div>
              <h4 className="text-xl font-semibold mb-3">Deepfake Detection</h4>
              <p className="text-gray-400 mb-4">
                Identifies AI-manipulated or tampered face images and videos using advanced convolutional neural networks that analyze pixel-level inconsistencies and temporal artifacts.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MdGesture className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Stroke Pattern Analysis</div>
                    <div className="text-gray-400 text-sm">Identifies unnatural pen movements</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdTouchApp className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Pressure Point Mapping</div>
                    <div className="text-gray-400 text-sm">Detects inconsistent pressure application</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdSpeed className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Behavioral Biometrics</div>
                    <div className="text-gray-400 text-sm">Analyzes writing speed and rhythm</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-700 rounded">
                  <div className="h-1.5 rounded px-10" style={{ backgroundColor: "#00ff41", width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-[#00ff41] transition">
              <div className="mb-4 text-3xl" style={{ color: "#00ff41" }}><HiOutlineDocumentText /></div>
              <h4 className="text-xl font-semibold mb-3">Text Tamper Detection</h4>
              <p className="text-gray-400 mb-4">
                Reveals altered text, erasures, and additions through spectral analysis and ink density measurements.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaPenFancy className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Ink Spectral Analysis</div>
                    <div className="text-gray-400 text-sm">Identifies different ink compositions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaLayerGroup className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Layer Detection</div>
                    <div className="text-gray-400 text-sm">Reveals overwritten text</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaEraser className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Erasure Identification</div>
                    <div className="text-gray-400 text-sm">Detects chemical and physical erasures</div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-700 rounded">
                  <div className="h-1.5 rounded px-10" style={{ backgroundColor: "#00ff41", width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-[#00ff41] transition">
              <div className="mb-4 text-3xl" style={{ color: "#00ff41" }}><FaFingerprint /></div>
              <h4 className="text-xl font-semibold mb-3">Metadata Forensics</h4>
              <p className="text-gray-400 mb-4">
                Extracts and analyzes hidden digital fingerprints including creation tools, modification history, and geolocation data.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaHistory className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Timeline Analysis</div>
                    <div className="text-gray-400 text-sm">Reconstructs document history</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Geolocation Tracking</div>
                    <div className="text-gray-400 text-sm">Identifies document origin locations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaFingerprint className="text-lg" style={{ color: "#00ff41" }} />
                  <div>
                    <div className="font-semibold text-white">Digital Fingerprinting</div>
                    <div className="text-gray-400 text-sm">Identifies editing software used</div>
                  </div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-gray-700 rounded">
                <div className="h-1.5 rounded" style={{ backgroundColor: "#00ff41", width: '85%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="px-8 bg-gray-800 rounded-t-3xl">
          <h3 className="text-3xl font-bold text-center mb-12">Our Forensic Tools</h3>
          <p className="text-center max-w-xl mx-auto text-gray-400 text-lg mb-12">
            Specialized tools designed for different document forensic analysis needs
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: <MdGesture />, title: "Deepfake Detection", desc: "Identifies AI-manipulated or tampered face images and videos using advanced convolutional neural networks that analyze pixel-level inconsistencies and temporal artifacts.", link: "/deepfake",availability:true },
              { icon: <HiOutlineDocumentText />, title: "Voice Authenticity Analysis", desc: "Detects synthetic or cloned voice recordings through audio feature extraction and classification models, distinguishing real human speech from AI-generated audio", link: "/voiceauthenticity",availability:false },
              { icon: <FaFingerprint />, title: "Bio/Profile Originality Checking", desc: "Uses natural language processing to compare user bios and profiles against known datasets, detecting copied or AI-generated text to flag suspicious identities.", link: "/bioauthenticity",availability:true },
              { icon: <GrScan />, title: "Metadata Integrity Verification", desc: "Examines file metadata such as EXIF data in images or documents for inconsistencies and signs of tampering, adding an extra layer of authenticity validation.", link: "/metaverification",availability:true },
              { icon: <FaRegFilePdf />, title: "Document Verification", desc: "Employs OCR, format analysis, and forgery detection techniques to validate the authenticity of official documents like IDs, passports, certificates, and invoices.", link: "/documentverification",availability:false },
              { icon: <FaRegFilePdf />, title: "Trust Score Aggregation", desc: "Combines outputs from all AI models into a single, easy-to-understand trust score with a color-coded risk indicator, simplifying decision-making for users.", link: "/trustscore",availability:false }
            ].map((tool, i) => (
              <div key={i} className="p-6 bg-gray-900 rounded-xl border border-gray-700 hover:border-[#00ff41] transition">
                <div className="mb-4 text-3xl" style={{ color: "#00ff41" }}>{tool.icon}</div>
                <h4 className="text-xl font-semibold mb-3">{tool.title}</h4>
                <p className="text-gray-400 mb-4">{tool.desc}</p>
                <Link to={tool.link}>
                  <button
                    disabled={!tool.availability}
                    className="px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: "#00ff41",
                      color: "#000",
                      boxShadow: "0 4px 10px rgba(0,255,65,0.3)"
                    }}
                  >
                    Try Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
