"use client";

import { useState } from "react";
import { KaTeX } from "@/components/shared/KaTeX";

type NValue = 4 | 8 | 16;

export function Module2UnityCircle() {
  const [n, setN] = useState<NValue>(8);
  const [selectedK, setSelectedK] = useState<number | null>(null);

  const cx = 150;
  const cy = 150;
  const radius = 110;

  const points = Array.from({ length: n }, (_, k) => {
    const angle = (2 * Math.PI * k) / n;
    return {
      k,
      angle,
      x: cx + radius * Math.cos(angle),
      y: cy - radius * Math.sin(angle),
      re: Math.cos(angle),
      im: Math.sin(angle),
    };
  });

  function handleNChange(val: NValue) {
    setN(val);
    setSelectedK(null);
  }

  const selected = selectedK !== null ? points[selectedK] : null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">
          Module 2 — Roots of Unity
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Click a point to see its value. The n-th roots of unity are the evaluation points for DFT.
        </p>
      </div>

      {/* n selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-mono">n =</span>
        {([4, 8, 16] as NValue[]).map((val) => (
          <button
            key={val}
            onClick={() => handleNChange(val)}
            className={`px-3 py-1 rounded-lg text-sm font-mono font-medium transition-colors ${
              n === val
                ? "bg-cyan-600 text-white"
                : "border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 300 300"
          className="w-full rounded-xl bg-slate-950/60"
          aria-label="Unit circle with n-th roots of unity"
        >
          {/* Axes */}
          <line x1={cx} y1={20} x2={cx} y2={280} stroke="#334155" strokeWidth={0.8} />
          <line x1={20} y1={cy} x2={280} y2={cy} stroke="#334155" strokeWidth={0.8} />

          {/* Axis labels */}
          <text x={275} y={cy - 6} fontSize={9} fill="#475569">Re</text>
          <text x={cx + 4} y={26} fontSize={9} fill="#475569">Im</text>
          <text x={cx + 3} y={cy - 3} fontSize={8} fill="#475569">0</text>
          <text x={cx + radius - 4} y={cy + 12} fontSize={8} fill="#475569">1</text>
          <text x={cx - 2} y={cy - radius + 14} fontSize={8} fill="#475569">i</text>

          {/* Unit circle */}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#334155" strokeWidth={1} />

          {/* Lines from center to each point */}
          {points.map((pt) => (
            <line
              key={pt.k}
              x1={cx}
              y1={cy}
              x2={pt.x}
              y2={pt.y}
              stroke={pt.k === selectedK ? "#3b82f6" : "#1e293b"}
              strokeWidth={pt.k === selectedK ? 1.2 : 0.5}
            />
          ))}

          {/* Points */}
          {points.map((pt) => (
            <circle
              key={pt.k}
              cx={pt.x}
              cy={pt.y}
              r={pt.k === selectedK ? 6 : 4}
              fill={pt.k === selectedK ? "#3b82f6" : "#06b6d4"}
              stroke={pt.k === selectedK ? "#93c5fd" : "#22d3ee"}
              strokeWidth={1}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedK(pt.k === selectedK ? null : pt.k)}
            />
          ))}

          {/* k index labels for small n */}
          {n <= 8 &&
            points.map((pt) => {
              const labelR = radius + 16;
              const lx = cx + labelR * Math.cos(pt.angle);
              const ly = cy - labelR * Math.sin(pt.angle);
              return (
                <text
                  key={pt.k}
                  x={lx}
                  y={ly + 4}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#64748b"
                  fontFamily="monospace"
                >
                  {pt.k}
                </text>
              );
            })}
        </svg>

        {/* Tooltip */}
        {selected !== null && (
          <div className="mt-3 rounded-xl border border-blue-800/50 bg-blue-950/40 p-3 space-y-1.5">
            <div className="text-xs text-blue-300 font-mono">
              k = {selected.k} &nbsp;|&nbsp; Re = {selected.re.toFixed(4)} &nbsp;|&nbsp; Im = {selected.im.toFixed(4)}
            </div>
            <div className="text-sm">
              <KaTeX
                math={`\\omega_{${n}}^{${selected.k}} = e^{2\\pi i \\cdot ${selected.k}/${n}}`}
                className="text-blue-200"
              />
            </div>
            <div className="text-xs text-slate-500">
              = {selected.re.toFixed(3)} + {selected.im.toFixed(3)}i
            </div>
          </div>
        )}

        {selectedK === null && (
          <p className="mt-2 text-xs text-slate-600 text-center">
            Click any point to inspect its value
          </p>
        )}
      </div>
    </div>
  );
}
