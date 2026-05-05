// Decorative SVG of an 8-point FFT data flow used in the homepage hero:
// 8 input sine waves (x_0 … x_7) feed a 3-stage butterfly network whose
// outputs converge to a single point and produce a frequency bar chart.
//
// Pure SVG, no animations, no glow filters — clean lines + opacity only.

const N = 8;
const WIDTH = 820;
const HEIGHT = 460;

const WAVE_COLOR = "rgb(34, 211, 238)";        // cyan-400
const LINE_COLOR = "rgba(34, 211, 238, 0.45)"; // cyan-400 @ 45%
const FAINT = "rgba(34, 211, 238, 0.18)";
const NODE_FILL = "rgb(2, 6, 23)";             // slate-950
const NODE_STROKE = "rgb(103, 232, 249)";      // cyan-300
const LABEL_COLOR = "rgb(148, 163, 184)";      // slate-400
const AXIS_COLOR = "rgba(148, 163, 184, 0.35)";
const TICK_COLOR = "rgb(100, 116, 139)";       // slate-500

// Two-tone wave (base + secondary harmonic) so each row looks more like
// an actual time-domain signal than a pure sine.
function signalPath(
  width: number,
  baseAmp: number,
  basePeriods: number,
  secAmp: number,
  secPeriods: number,
  phase: number,
  steps = 96,
): string {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * width;
    const y =
      Math.sin(t * Math.PI * 2 * basePeriods + phase) * baseAmp +
      Math.sin(t * Math.PI * 2 * secPeriods + phase * 1.7) * secAmp;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return "M" + pts.join(" L");
}

// Pre-baked per-row parameters so every wave looks distinct without RNG.
const ROW_WAVE_PARAMS = Array.from({ length: 8 }, (_, i) => ({
  basePeriods: 2.4 + (i % 4) * 0.4,
  secPeriods: 4.5 + (i * 0.7),
  baseAmp: 7 + (i % 3) * 1.5,
  secAmp: 2 + (i % 2) * 1.2,
  phase: i * 0.9,
}));

// Pre-baked-looking spectrum for the bar chart on the right.
const BAR_HEIGHTS = [
  72, 18, 12, 92, 14, 24, 102, 8, 6, 30, 56, 12, 64, 8, 40, 6,
];

export function FftHeroVisual() {
  const yTop = 50;
  const yBottom = 380;
  const rowY = (i: number) => yTop + (i / (N - 1)) * (yBottom - yTop);

  const labelX = 22;
  const waveStart = 50;
  const cols = [220, 320, 420, 520];          // 4 butterfly columns
  // Wave extends right up to (and slightly past) the first column node so
  // there's no flat connector segment between the signal and the network.
  const waveWidth = cols[0] - waveStart - 4;
  const convergeX = 600;
  const convergeY = (rowY(0) + rowY(N - 1)) / 2;

  const barX0 = 640;
  const barX1 = 800;
  const barBase = 380;
  const barTop = 110;
  const barCount = BAR_HEIGHTS.length;
  const barSlot = (barX1 - barX0) / barCount;
  const barWidth = barSlot * 0.65;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Eight input signals routed through an FFT butterfly network into a frequency bar chart"
      className="w-full h-auto"
    >
      {/* Faint horizontal gridlines behind the bar chart */}
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const y = barBase - f * (barBase - barTop);
        return (
          <line
            key={`grid-${f}`}
            x1={barX0 - 8}
            y1={y}
            x2={barX1 + 8}
            y2={y}
            stroke={AXIS_COLOR}
            strokeDasharray="2 4"
            strokeWidth={0.6}
          />
        );
      })}

      {/* Signal inputs: per-row wavy paths feeding directly into the network */}
      {Array.from({ length: N }, (_, i) => {
        const p = ROW_WAVE_PARAMS[i];
        const path = signalPath(
          waveWidth,
          p.baseAmp,
          p.basePeriods,
          p.secAmp,
          p.secPeriods,
          p.phase,
        );
        return (
          <g key={`in-${i}`} transform={`translate(0, ${rowY(i)})`}>
            <text
              x={labelX}
              y={4}
              fill={LABEL_COLOR}
              fontSize={13}
              fontFamily="ui-sans-serif, system-ui"
            >
              x
              <tspan fontSize={9} dy={4}>
                {i}
              </tspan>
            </text>
            <path
              d={path}
              transform={`translate(${waveStart}, 0)`}
              stroke={WAVE_COLOR}
              strokeWidth={1.4}
              fill="none"
              strokeLinecap="round"
              opacity={0.9}
            />
          </g>
        );
      })}

      {/* Butterfly stages: distance 1 → 2 → 4 */}
      {[1, 2, 4].map((dist, stage) => {
        const xA = cols[stage];
        const xB = cols[stage + 1];
        const segments: React.ReactElement[] = [];
        for (let i = 0; i < N; i++) {
          const j = i ^ dist;
          // Crossing edge
          segments.push(
            <line
              key={`s${stage}-${i}-x`}
              x1={xA}
              y1={rowY(i)}
              x2={xB}
              y2={rowY(j)}
              stroke={LINE_COLOR}
              strokeWidth={1}
            />,
          );
          // Straight-through edge
          segments.push(
            <line
              key={`s${stage}-${i}-s`}
              x1={xA}
              y1={rowY(i)}
              x2={xB}
              y2={rowY(i)}
              stroke={FAINT}
              strokeWidth={1}
            />,
          );
        }
        return <g key={`stage-${stage}`}>{segments}</g>;
      })}

      {/* Nodes on every column */}
      {cols.map((cx) =>
        Array.from({ length: N }, (_, i) => (
          <circle
            key={`node-${cx}-${i}`}
            cx={cx}
            cy={rowY(i)}
            r={3.5}
            fill={NODE_FILL}
            stroke={NODE_STROKE}
            strokeWidth={1.4}
          />
        )),
      )}

      {/* Convergence: 8 lines from final column to a single output point */}
      {Array.from({ length: N }, (_, i) => (
        <line
          key={`conv-${i}`}
          x1={cols[cols.length - 1]}
          y1={rowY(i)}
          x2={convergeX}
          y2={convergeY}
          stroke={LINE_COLOR}
          strokeWidth={1}
        />
      ))}
      <circle cx={convergeX} cy={convergeY} r={6} fill={WAVE_COLOR} />

      {/* Bar chart on the right */}
      {BAR_HEIGHTS.map((h, i) => {
        const x = barX0 + i * barSlot + (barSlot - barWidth) / 2;
        const height = (h / 100) * (barBase - barTop);
        const y = barBase - height;
        return (
          <rect
            key={`bar-${i}`}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            fill={WAVE_COLOR}
            opacity={0.85}
            rx={0.5}
          />
        );
      })}

      {/* Baseline + axis labels */}
      <line
        x1={barX0 - 6}
        y1={barBase}
        x2={barX1 + 6}
        y2={barBase}
        stroke={AXIS_COLOR}
        strokeWidth={1}
      />
      <text x={barX0 - 4} y={barBase + 18} fontSize={11} fill={TICK_COLOR}>
        0
      </text>
      <text
        x={(barX0 + barX1) / 2}
        y={barBase + 18}
        fontSize={11}
        fill={TICK_COLOR}
        textAnchor="middle"
      >
        N/2
      </text>
      <text x={barX1 + 4} y={barBase + 18} fontSize={11} fill={TICK_COLOR} textAnchor="end">
        N−1
      </text>
      <text
        x={barX1 + 14}
        y={barBase + 4}
        fontSize={12}
        fill={TICK_COLOR}
        fontStyle="italic"
      >
        k
      </text>
    </svg>
  );
}
