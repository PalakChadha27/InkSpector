import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardVoice } from "react-icons/md";

/**
 * VoiceAnalysis
 * - Works even if location.state is missing (falls back to demo data)
 * - No external chart libraries (pure SVG/CSS)
 * - Extra metrics + graphs: Confidence gauge, Pitch curve, Speech-rate bars
 */
const VoiceAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safe defaults if nothing was passed from the upload page
  const {
    fileName = "sample_audio.wav",
    fileSize = "1.24 MB",
    isAuthentic = true,
    confidence = 92, // 0-100
    speakerMatch = "Matched (Claimed Speaker)",
    backgroundNoise = "Low",
    pitchStability = "Stable",
    speechRate = "Normal",
    deepfakeProbability = 8, // 0-100
    liveness = "Human Voice Detected",
    emotion = "Neutral",
    clarityScore = 85, // 0-100
    formantMatch = 93, // 0-100
    tamperProbability = 7, // 0-100
    // Simple demo series; replace with real arrays from backend later
    pitchData = [
      { t: 0, hz: 185 },
      { t: 1, hz: 198 },
      { t: 2, hz: 192 },
      { t: 3, hz: 206 },
      { t: 4, hz: 197 },
      { t: 5, hz: 203 },
    ],
    speechRateSeries = [
      { t: 1, wpm: 118 },
      { t: 2, wpm: 132 },
      { t: 3, wpm: 125 },
      { t: 4, wpm: 141 },
      { t: 5, wpm: 136 },
    ],
    intensitySeries = [
      { t: 0, level: 0.42 },
      { t: 1, level: 0.51 },
      { t: 2, level: 0.47 },
      { t: 3, level: 0.58 },
      { t: 4, level: 0.55 },
      { t: 5, level: 0.60 },
    ],
    detectedAnomalies = [],
    recommendations = [
      "For sensitive actions, enable multi-factor verification.",
      "Re-check with a longer sample (≥10s) for higher confidence.",
    ],
    audioUrl, // optional: pass a blob/object URL from the upload page to enable playback
  } = location.state || {};

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
            <MdKeyboardVoice className="text-4xl text-[#00ff41] mr-4" />
            <h1 className="text-3xl font-bold">Voice Analysis Dashboard</h1>
          </div>

          {/* Top row: File + Verdict + Confidence Gauge */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <Label>File</Label>
              <Value mono>{fileName}</Value>
              <div className="h-2" />
              <Label>Size</Label>
              <Value mono>{fileSize}</Value>
              {audioUrl ? (
                <div className="mt-4">
                  <audio src={audioUrl} controls className="w-full" />
                </div>
              ) : null}
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
                {isAuthentic ? "Authentic" : "Potential Manipulation"}
              </span>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Pill label="Liveness" value={liveness} />
                <Pill
                  label="Deepfake Prob."
                  value={`${clampPct(deepfakeProbability)}%`}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Pill label="Emotion" value={emotion} />
                <Pill label="Speaker Match" value={speakerMatch} />
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
            <MetricTile label="Clarity Score" value={`${clampPct(clarityScore)}%`} accent />
            <MetricTile label="Formant Match" value={`${clampPct(formantMatch)}%`} />
            <MetricTile label="Tamper Probability" value={`${clampPct(tamperProbability)}%`} warn />
            <MetricTile label="Background Noise" value={backgroundNoise} />
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <SectionTitle>Pitch Curve (Hz)</SectionTitle>
              <LineChartSVG
                data={pitchData}
                xKey="t"
                yKey="hz"
                height={180}
                padding={12}
                yLabel="Hz"
              />
              <SmallLegend items={[{ label: "Pitch", swatch: "#00ff41" }]} />
            </Card>

            <Card>
              <SectionTitle>Speech Rate (WPM)</SectionTitle>
              <BarChartSVG
                data={speechRateSeries}
                xKey="t"
                yKey="wpm"
                height={180}
                padding={12}
              />
              <SmallLegend items={[{ label: "Words/min", swatch: "#00ff41" }]} />
            </Card>

            <Card>
              <SectionTitle>Audio Intensity (0–1)</SectionTitle>
              <AreaChartSVG
                data={intensitySeries}
                xKey="t"
                yKey="level"
                height={180}
                padding={12}
              />
              <SmallLegend items={[{ label: "Intensity", swatch: "#00ff41" }]} />
            </Card>
          </div>

          {/* Qualitative parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <SectionTitle>Acoustic Consistency</SectionTitle>
              <KV label="Pitch Stability" value={pitchStability} />
              <KV label="Speech Rate" value={speechRate} />
              <KV label="Formant Consistency" value={`${clampPct(formantMatch)}%`} />
              <KV label="Clarity Index" value={`${clampPct(clarityScore)}%`} />
            </Card>
            <Card>
              <SectionTitle>Digital Forensics</SectionTitle>
              <KV label="Deepfake Probability" value={`${clampPct(deepfakeProbability)}%`} />
              <KV label="Tamper Probability" value={`${clampPct(tamperProbability)}%`} />
              <KV label="Liveness" value={liveness} />
              <KV label="Background Noise" value={backgroundNoise} />
            </Card>
          </div>

          {/* Anomalies & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <SectionTitle className="text-[#ff7777]">Detected Anomalies</SectionTitle>
              {Array.isArray(detectedAnomalies) && detectedAnomalies.length > 0 ? (
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

/* ------------------------ Helper / UI components ------------------------ */

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

/* ------------------------------ Charts (SVG) ------------------------------ */

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

// Line chart (pitch over time)
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

// Bar chart (speech rate)
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

// Area chart (intensity 0-1)
const AreaChartSVG = ({ data = [], xKey, yKey, height = 160, padding = 10 }) => {
  const W = 520;
  const H = height;
  const P = padding;

  const xs = data.map((d) => Number(d?.[xKey]));
  const ys = data.map((d) => Number(d?.[yKey]));
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 1);
  const minY = 0; // clamp for 0–1 intensity
  const maxY = Math.max(...ys, 1);

  const xScale = (x) => P + ((x - minX) / (maxX - minX || 1)) * (W - 2 * P);
  const yScale = (y) => H - P - ((y - minY) / (maxY - minY || 1)) * (H - 2 * P);

  const topLine = data
    .map((d) => `${xScale(Number(d?.[xKey]))},${yScale(Number(d?.[yKey]))}`)
    .join(" ");

  const area = `${P},${H - P} ${topLine} ${W - P},${H - P} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="#555" />
      <line x1={P} y1={P} x2={P} y2={H - P} stroke="#555" />
      <path d={area} fill="rgba(0,255,65,0.15)" stroke="none" />
      <polyline fill="none" stroke="#00ff41" strokeWidth="2" points={topLine} />
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

export default VoiceAnalysis;

