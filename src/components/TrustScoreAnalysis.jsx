import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { MdSecurity } from "react-icons/md";

const TrustScoreAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { module, verifications, setVerifications } = location.state || {};
  const [score, setScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisDetails, setAnalysisDetails] = useState(null);

  useEffect(() => {
    if (!module) {
      navigate('/trustscore');
      return;
    }

    const timer = setTimeout(() => {
      const generatedScore = Math.floor(Math.random() * 101); // 0-100
      setScore(generatedScore);
      
      // Generate detailed analysis data
      const details = {
        fileName: module.name + "_analysis.json",
        fileSize: "2.1 KB",
        isAuthentic: generatedScore >= 70,
        confidence: generatedScore,
        securityFeatures: [
          "Multi-factor verification",
          "Behavioral analysis",
          "Pattern recognition"
        ],
        riskFactors: generatedScore < 70 ? [
          "Unusual activity patterns detected",
          "Inconsistent verification methods"
        ] : [],
        recommendations: generatedScore >= 70 ? [
          "Continue with current security practices",
          "Schedule regular security audits"
        ] : [
          "Enable additional verification methods",
          "Review recent activity for anomalies"
        ],
        // Data for charts
        scoreTimeline: [
          { t: 1, score: Math.max(0, generatedScore - 15) },
          { t: 2, score: Math.max(0, generatedScore - 8) },
          { t: 3, score: generatedScore },
          { t: 4, score: Math.min(100, generatedScore + 5) },
          { t: 5, score: generatedScore },
        ],
        factorBreakdown: [
          { factor: "Authentication", value: Math.floor(generatedScore * 0.9) },
          { factor: "Behavior", value: Math.floor(generatedScore * 0.8) },
          { factor: "Consistency", value: Math.floor(generatedScore * 0.95) },
          { factor: "History", value: Math.floor(generatedScore * 0.7) },
        ]
      };
      
      setAnalysisDetails(details);

      if (setVerifications) {
        setVerifications(prev =>
          prev.map(v => v.id === module.id ? { ...v, completed: true, score: generatedScore } : v)
        );
      }

      setIsAnalyzing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [module, navigate, setVerifications]);

  const getRisk = (score) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 50) return 'Medium Risk';
    return 'High Risk';
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-[#00ff41] hover:opacity-80 flex items-center self-start"
        >
          ← Back
        </button>

        <div className="bg-gray-800 border border-[#00ff41] rounded-xl p-8 w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-4">{module?.name} Analysis</h1>
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-6xl mb-4 text-[#00ff41]" />
            <p className="text-gray-300">Analyzing {module?.name}...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Header */}
          <div className="flex items-center mb-6">
            <MdSecurity className="text-4xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Trust Score Analysis Dashboard</h1>
          </div>

          {/* Top row: Module + Verdict + Confidence Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <Label>Module</Label>
              <Value mono>{module?.name}</Value>
              <div className="h-2" />
              <Label>Analysis ID</Label>
              <Value mono>{analysisDetails.fileName}</Value>
            </Card>

            <Card>
              <Label>Verdict</Label>
              <span
                className={`inline-block mt-2 px-3 py-1 text-lg font-bold rounded-full ${
                  analysisDetails.isAuthentic
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {analysisDetails.isAuthentic ? "Trustworthy" : "Needs Review"}
              </span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Pill label="Risk Level" value={getRisk(score)} />
                <Pill
                  label="Confidence"
                  value={`${clampPct(score)}%`}
                />
              </div>
            </Card>

            <Card className="flex items-center justify-center">
              <RadialGauge
                value={clampPct(score)}
                size={180}
                strokeWidth={14}
                label="Trust Score"
              />
            </Card>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <MetricTile label="Authentication" value={`${clampPct(analysisDetails.factorBreakdown[0].value)}%`} accent />
            <MetricTile label="Behavior" value={`${clampPct(analysisDetails.factorBreakdown[1].value)}%`} />
            <MetricTile label="Consistency" value={`${clampPct(analysisDetails.factorBreakdown[2].value)}%`} />
            <MetricTile label="History" value={`${clampPct(analysisDetails.factorBreakdown[3].value)}%`} />
          </div>

          {/* Security Features */}
          <Card className="mb-8">
            <SectionTitle>Security Features Analyzed</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {analysisDetails.securityFeatures.map((feat, idx) => (
                <div key={idx} className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <p className="text-sm text-gray-300">{feat}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <SectionTitle>Score Timeline</SectionTitle>
              <LineChartSVG
                data={analysisDetails.scoreTimeline}
                xKey="t"
                yKey="score"
                height={200}
                padding={12}
                yLabel="Score"
              />
              <SmallLegend items={[{ label: "Trust Score", swatch: "#00ff41" }]} />
            </Card>

            <Card>
              <SectionTitle>Factor Breakdown</SectionTitle>
              <BarChartSVG
                data={analysisDetails.factorBreakdown}
                xKey="factor"
                yKey="value"
                height={200}
                padding={12}
              />
              <SmallLegend items={[{ label: "Score %", swatch: "#00ff41" }]} />
            </Card>
          </div>

          {/* Risk Factors & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <SectionTitle className="text-[#ff7777]">Risk Factors</SectionTitle>
              {analysisDetails.riskFactors.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {analysisDetails.riskFactors.map((a, i) => (
                    <li key={i} className="text-red-400">
                      {a}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No significant risk factors detected.</p>
              )}
            </Card>
            <Card>
              <SectionTitle>Recommendations</SectionTitle>
              <ul className="list-disc pl-5 space-y-1">
                {analysisDetails.recommendations.map((r, i) => (
                  <li key={i} className="text-gray-300">
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Back to Dashboard Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/trustscore')}
              className="px-8 py-3 bg-[#00ff41] text-gray-900 font-medium rounded-lg hover:opacity-90"
            >
              Back to Trust Score Dashboard
            </button>
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
  const W = 520; // fixed width to avoid layout shift
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
      {/* axes */}
      <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#555" />
      <line x1={P} y1={P} x2={P} y2={H - P} stroke="#555" />
      {/* label */}
      {yLabel ? (
        <text x={P} y={P - 4} fill="#aaa" fontSize="10">
          {yLabel}
        </text>
      ) : null}
      {/* line */}
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

export default TrustScoreAnalysis;
