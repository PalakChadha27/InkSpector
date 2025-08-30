import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdSecurity, MdDownload } from "react-icons/md";

/**
 * DocumentAnalysis
 * - Enhanced with Heat Analysis Map, Ink Analysis, Paper Analysis, Metadata
 * - Added PDF Report Generation functionality
 */
const DocumentAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safe defaults if nothing was passed
  const {
    fileName = "sample_document.pdf",
    fileSize = "2.45 MB",
    documentType = "PDF",
    isAuthentic = true,
    confidence = 88,
    securityFeatures = [
      "Valid digital signature",
      "Consistent metadata",
      "No content tampering detected"
    ],
    fontConsistency = 92,
    metadataScore = 85,
    tamperProbability = 12,
    digitalSignature = "Verified",
    creationDate = "2023-11-15 14:32",
    modificationHistory = "No unauthorized modifications",
    
    // New analysis parameters
    inkAnalysis = {
      consistency: "High",
      patternMatch: 92,
      chemicalComposition: "Standard Office Ink",
      ageEstimation: "Consistent with creation date"
    },
    paperAnalysis = {
      type: "Standard A4",
      weight: "80 gsm",
      fiberPattern: "Consistent",
      watermark: "None detected"
    },
    metadataAnalysis = {
      author: "John Doe",
      creator: "Adobe Acrobat Pro",
      producer: "Adobe PDF Library",
      created: "2023-11-15T14:32:00Z",
      modified: "2023-11-15T14:32:00Z",
      application: "Adobe Acrobat 11.0",
      pdfVersion: "1.5"
    },
    
    // Data for visualizations
    contentAnalysis = [
      { section: 1, score: 92 },
      { section: 2, score: 85 },
      { section: 3, score: 96 },
      { section: 4, score: 88 },
      { section: 5, score: 91 },
    ],
    metadataTimeline = [
      { t: 1, changes: 0 },
      { t: 2, changes: 2 },
      { t: 3, changes: 0 },
      { t: 4, changes: 1 },
      { t: 5, changes: 0 },
    ],
    
    // Heat map data
    heatMapData = [
      { x: 1, y: 1, value: 12 },
      { x: 2, y: 1, value: 45 },
      { x: 3, y: 1, value: 8 },
      { x: 4, y: 1, value: 22 },
      { x: 1, y: 2, value: 5 },
      { x: 2, y: 2, value: 78 },
      { x: 3, y: 2, value: 15 },
      { x: 4, y: 2, value: 33 },
      { x: 1, y: 3, value: 18 },
      { x: 2, y: 3, value: 25 },
      { x: 3, y: 3, value: 62 },
      { x: 4, y: 3, value: 10 },
      { x: 1, y: 4, value: 5 },
      { x: 2, y: 4, value: 15 },
      { x: 3, y: 4, value: 8 },
      { x: 4, y: 4, value: 85 },
    ],
    
    // Heat analysis data
    heatAnalysisData = [
      { aspect: "Text Consistency", value: 92, risk: "Low" },
      { aspect: "Image Integrity", value: 85, risk: "Low" },
      { aspect: "Format Validation", value: 96, risk: "Low" },
      { aspect: "Digital Signature", value: 88, risk: "Low" },
      { aspect: "Metadata Consistency", value: 75, risk: "Medium" },
      { aspect: "Content Anomalies", value: 65, risk: "Medium" },
    ],
    
    detectedAnomalies = [],
    recommendations = [
      "Verify with original source document if available.",
      "Check for digital certificate expiration date.",
    ],
    documentUrl,
  } = location.state || {};

  // Function to generate PDF report
  const generatePDFReport = () => {
    // In a real application, this would generate an actual PDF
    // For demo purposes, we'll create a download link with a mock PDF
    const element = document.createElement("a");
    const file = new Blob(["Mock PDF report content"], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.replace(/\.[^/.]+$/, "")}_analysis_report.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center"
        >
          ← Back
        </button>

        <div className="bg-gray-800 border border-[#00ff41] rounded-2xl p-8 shadow-lg">
          {/* Header with Download Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <MdSecurity className="text-4xl text-[#00ff41] mr-4" />
              <h1 className="text-3xl font-bold">Document Analysis Dashboard</h1>
            </div>
            <button
              onClick={generatePDFReport}
              className="flex items-center px-4 py-2 bg-[#00ff41] text-gray-900 rounded-lg hover:opacity-90"
            >
              <MdDownload className="mr-2" />
              Download PDF Report
            </button>
          </div>

          {/* Top row: File + Verdict + Confidence Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <Label>File</Label>
              <Value mono>{fileName}</Value>
              <div className="h-2" />
              <Label>Size</Label>
              <Value mono>{fileSize}</Value>
              <div className="h-2" />
              <Label>Type</Label>
              <Value mono>{documentType}</Value>
              {documentUrl && (
                <div className="mt-4">
                  <a 
                    href={documentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#00ff41] underline text-sm"
                  >
                    View Document
                  </a>
                </div>
              )}
            </Card>

            <Card>
              <Label>Verdict</Label>
              <span
                className={`inline-block mt-2 px-3 py-1 text-lg font-bold rounded-full ${
                  isAuthentic
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {isAuthentic ? "Authentic" : "Potential Fraud"}
              </span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Pill label="Digital Signature" value={digitalSignature} />
                <Pill
                  label="Tamper Probability"
                  value={`${clampPct(tamperProbability)}%`}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Pill label="Creation Date" value={creationDate} />
                <Pill label="Modification History" value={modificationHistory} />
              </div>
            </Card>

            <Card className="flex items-center justify-center">
              <RadialGauge
                value={clampPct(confidence)}
                size={180}
                strokeWidth={14}
                label="Confidence"
              />
            </Card>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <MetricTile label="Font Consistency" value={`${clampPct(fontConsistency)}%`} accent />
            <MetricTile label="Metadata Score" value={`${clampPct(metadataScore)}%`} />
            <MetricTile label="Tamper Probability" value={`${clampPct(tamperProbability)}%`} warn />
            <MetricTile label="Digital Signature" value={digitalSignature} />
          </div>

          {/* New Analysis Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <SectionTitle>Ink Analysis</SectionTitle>
              <KV label="Consistency" value={inkAnalysis.consistency} />
              <KV label="Pattern Match" value={`${inkAnalysis.patternMatch}%`} />
              <KV label="Chemical Composition" value={inkAnalysis.chemicalComposition} />
              <KV label="Age Estimation" value={inkAnalysis.ageEstimation} />
            </Card>

            <Card>
              <SectionTitle>Paper Analysis</SectionTitle>
              <KV label="Type" value={paperAnalysis.type} />
              <KV label="Weight" value={paperAnalysis.weight} />
              <KV label="Fiber Pattern" value={paperAnalysis.fiberPattern} />
              <KV label="Watermark" value={paperAnalysis.watermark} />
            </Card>

            <Card>
              <SectionTitle>Metadata Analysis</SectionTitle>
              <KV label="Author" value={metadataAnalysis.author} />
              <KV label="Creator" value={metadataAnalysis.creator} />
              <KV label="PDF Version" value={metadataAnalysis.pdfVersion} />
              <KV label="Application" value={metadataAnalysis.application} />
            </Card>
          </div>

          {/* Security Features */}
          <Card className="mb-8">
            <SectionTitle>Security Features</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {securityFeatures.map((feat, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <p className="text-sm text-gray-300">{feat}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Heat Map */}
          <Card className="mb-8">
            <SectionTitle>Document Anomaly Heat Map</SectionTitle>
            <p className="text-sm text-gray-400 mb-4">
              Visual representation of potential tampering across document sections
            </p>
            <HeatMapSVG
              data={heatMapData}
              width={520}
              height={200}
              cellSize={40}
              cellGap={4}
            />
            <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
              <span>Low Risk</span>
              <span>Medium Risk</span>
              <span>High Risk</span>
            </div>
          </Card>

          {/* Heat Analysis Map */}
          <Card className="mb-8">
            <SectionTitle>Comprehensive Heat Analysis</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {heatAnalysisData.map((item, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-300">{item.aspect}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.risk === "Low" ? "bg-green-500/20 text-green-400" :
                      item.risk === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {item.risk} Risk
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.risk === "Low" ? "bg-green-500" :
                        item.risk === "Medium" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-400 mt-1">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <SectionTitle>Content Analysis Score</SectionTitle>
              <BarChartSVG
                data={contentAnalysis}
                xKey="section"
                yKey="score"
                height={200}
                padding={12}
              />
              <SmallLegend items={[{ label: "Authenticity Score", swatch: "#00ff41" }]} />
            </Card>

            <Card>
              <SectionTitle>Metadata Changes Timeline</SectionTitle>
              <LineChartSVG
                data={metadataTimeline}
                xKey="t"
                yKey="changes"
                height={200}
                padding={12}
                yLabel="Changes"
              />
              <SmallLegend items={[{ label: "Metadata Changes", swatch: "#00ff41" }]} />
            </Card>
          </div>

          {/* Anomalies & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <SectionTitle className="text-[#ff7777]">Detected Anomalies</SectionTitle>
              {detectedAnomalies.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {detectedAnomalies.map((a, i) => (
                    <li key={i} className="text-red-400">
                      {a}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No significant anomalies detected.</p>
              )}
            </Card>
            <Card>
              <SectionTitle>Recommendations</SectionTitle>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.map((r, i) => (
                  <li key={i} className="text-gray-300">
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------ Reusable components ------------------------ */

const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800/60 border border-gray-700 rounded-xl p-5 ${className}`}>
    {children}
  </div>
);

const Label = ({ children }) => (
  <p className="text-sm text-gray-400">{children}</p>
);

const Value = ({ children, mono }) => (
  <p className={`text-lg ${mono ? "font-mono" : "font-semibold"} text-white`}>{children}</p>
);

const SectionTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold mb-3 text-[#00ff41] ${className}`}>{children}</h3>
);

const Pill = ({ label, value }) => (
  <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-sm font-medium text-white mt-1">{value}</p>
  </div>
);

const MetricTile = ({ label, value, accent, warn }) => (
  <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
    <p className="text-sm text-gray-300">{label}</p>
    <p
      className={`text-2xl font-bold mt-1 ${
        warn ? "text-red-400" : accent ? "text-[#00ff41]" : "text-white"
      }`}
    >
      {value}
    </p>
  </div>
);

const KV = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-b-0">
    <span className="text-gray-300">{label}</span>
    <span className="text-white font-mono">{value}</span>
  </div>
);

const clampPct = (n) => {
  const x = Number.isFinite(+n) ? +n : 0;
  return Math.max(0, Math.min(100, Math.round(x)));
};

// Radial gauge using simple circle strokes
const RadialGauge = ({ value = 0, size = 160, strokeWidth = 12, label = "" }) => {
  const pct = clampPct(value);
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} role="img" aria-label={`${label} ${pct}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00ff41"
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#00ff41"
        >
          {pct}%
        </text>
      </svg>
      <p className="mt-2 text-sm text-gray-300">{label}</p>
    </div>
  );
};

// Line chart (changes over time)
const LineChartSVG = ({ data = [], xKey, yKey, height = 160, padding = 10, yLabel = "" }) => {
  const W = 520;
  const H = height;
  const P = padding;

  const xs = data.map((d) => Number(d?.[xKey]));
  const ys = data.map((d) => Number(d?.[yKey]));
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, 1);

  const xScale = (x) => P + ((x - minX) / (maxX - minX || 1)) * (W - 2 * P);
  const yScale = (y) => H - P - ((y - minY) / (maxY - minY || 1)) * (H - 2 * P);

  const points = data
    .map((d) => `${xScale(Number(d?.[xKey]))},${yScale(Number(d?.[yKey]))}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#555" />
      <line x1={P} y1={P} x2={P} y2={H - P} stroke="#555" />
      {yLabel && (
        <text x={P} y={P - 4} fill="#aaa" fontSize="10">
          {yLabel}
        </text>
      )}
      <polyline fill="none" stroke="#00ff41" strokeWidth="2.5" points={points} />
    </svg>
  );
};

// Bar chart (score by section)
const BarChartSVG = ({ data = [], xKey, yKey, height = 160, padding = 10 }) => {
  const W = 520;
  const H = height;
  const P = padding;
  const N = data.length || 1;

  const ys = data.map((d) => Number(d?.[yKey]));
  const maxY = Math.max(...ys, 1);

  const barGap = 8;
  const barWidth = Math.max(6, (W - 2 * P - (N - 1) * barGap) / N);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#555" />
      <line x1={P} y1={P} x2={P} y2={H - P} stroke="#555" />
      {data.map((d, i) => {
        const x = P + i * (barWidth + barGap);
        const val = Number(d?.[yKey]);
        const h = ((val / (maxY || 1)) * (H - 2 * P)) || 0;
        return (
          <rect
            key={i}
            x={x}
            y={H - P - h}
            width={barWidth}
            height={h}
            rx="4"
            fill="#00ff41"
          />
        );
      })}
    </svg>
  );
};

// Heat Map component for document anomaly visualization
const HeatMapSVG = ({ data = [], width = 520, height = 200, cellSize = 40, cellGap = 4 }) => {
  const getColor = (value) => {
    if (value < 25) return "#00ff41";
    if (value < 60) return "#ffcc00";
    return "#ff3333";
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {data.map((item, index) => {
        const x = (item.x - 1) * (cellSize + cellGap) + cellGap;
        const y = (item.y - 1) * (cellSize + cellGap) + cellGap;
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill={getColor(item.value)}
              rx="4"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
            <text
              x={x + cellSize / 2}
              y={y + cellSize / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
            >
              {item.value}%
            </text>
          </g>
        );
      })}
      <text x={10} y={height - 10} fill="#aaa" fontSize="10">Page Sections</text>
    </svg>
  );
};

const SmallLegend = ({ items = [] }) => (
  <div className="mt-2 flex flex-wrap items-center gap-4">
    {items.map((it, i) => (
      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
        <span
          className="inline-block w-3 h-3 rounded"
          style={{ background: it.swatch }}
        />
        {it.label}
      </div>
    ))}
  </div>
);

export default DocumentAnalysis;
