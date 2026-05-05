"use client";

import { useState, useEffect } from "react";

interface Step {
  i: number;
  j: number;
  product: number;
  resultIndex: number;
}

const steps: Step[] = [
  { i: 0, j: 0, product: 4,  resultIndex: 0 },
  { i: 0, j: 1, product: 5,  resultIndex: 1 },
  { i: 1, j: 0, product: 8,  resultIndex: 1 },
  { i: 1, j: 1, product: 10, resultIndex: 2 },
  { i: 2, j: 0, product: 12, resultIndex: 2 },
  { i: 2, j: 1, product: 15, resultIndex: 3 },
];

const aCoeffs = [1, 2, 3];
const bCoeffs = [4, 5];
const aLabels = ["1", "2x", "3x²"];
const bLabels = ["4", "5x"];

function computeRunningResult(upToStep: number): number[] {
  const result = [0, 0, 0, 0];
  for (let s = 0; s <= upToStep; s++) {
    result[steps[s].resultIndex] += steps[s].product;
  }
  return result;
}

export function Module1NaiveMultiply() {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(id);
  }, [isPlaying]);

  const current = steps[stepIndex];
  const runningResult = computeRunningResult(stepIndex);

  const cellW = 60;
  const cellH = 40;
  const gridOffsetX = 80;
  const gridOffsetY = 30;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">
          Module 1 — The Problem: O(n²) Multiplication
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          <span className="text-blue-400 font-mono">(1 + 2x + 3x²)</span>
          {" × "}
          <span className="text-cyan-400 font-mono">(4 + 5x)</span>
          {" — watch each pairwise product accumulate"}
        </p>
      </div>

      <svg
        viewBox="0 0 400 260"
        className="w-full rounded-xl bg-slate-950/60"
        aria-label="Naive polynomial multiplication animation"
      >
        {/* Column labels — A coefficients */}
        {aCoeffs.map((_, ci) => (
          <text
            key={ci}
            x={gridOffsetX + ci * cellW + cellW / 2}
            y={gridOffsetY - 8}
            textAnchor="middle"
            fontSize={11}
            fill="#818cf8"
            fontFamily="monospace"
          >
            {aLabels[ci]}
          </text>
        ))}

        {/* Row labels — B coefficients */}
        {bCoeffs.map((_, ri) => (
          <text
            key={ri}
            x={gridOffsetX - 8}
            y={gridOffsetY + ri * cellH + cellH / 2 + 4}
            textAnchor="end"
            fontSize={11}
            fill="#c084fc"
            fontFamily="monospace"
          >
            {bLabels[ri]}
          </text>
        ))}

        {/* "A" header label */}
        <text x={gridOffsetX + (aCoeffs.length * cellW) / 2} y={14} textAnchor="middle" fontSize={10} fill="#64748b">A →</text>
        {/* "B" header label */}
        <text x={18} y={gridOffsetY + (bCoeffs.length * cellH) / 2 + 4} textAnchor="middle" fontSize={10} fill="#64748b">B ↓</text>

        {/* Grid cells */}
        {bCoeffs.map((bv, ri) =>
          aCoeffs.map((av, ci) => {
            const isActive = current.i === ci && current.j === ri;
            const isPast =
              stepIndex > steps.findIndex((s) => s.i === ci && s.j === ri);
            const x = gridOffsetX + ci * cellW;
            const y = gridOffsetY + ri * cellH;
            return (
              <g key={`${ci}-${ri}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellW - 2}
                  height={cellH - 2}
                  rx={4}
                  fill={isActive ? "#1e40af" : isPast ? "#1e293b" : "#0f172a"}
                  stroke={isActive ? "#3b82f6" : "#334155"}
                  strokeWidth={isActive ? 1.5 : 0.5}
                />
                <text
                  x={x + (cellW - 2) / 2}
                  y={y + (cellH - 2) / 2 + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fill={isActive ? "#93c5fd" : isPast ? "#475569" : "#64748b"}
                  fontFamily="monospace"
                >
                  {av * bv}
                </text>
              </g>
            );
          })
        )}

        {/* Divider */}
        <line x1={20} y1={130} x2={380} y2={130} stroke="#334155" strokeWidth={0.5} />

        {/* Result label */}
        <text x={30} y={148} fontSize={10} fill="#64748b">Result coefficients:</text>

        {/* Result boxes */}
        {runningResult.map((val, idx) => {
          const isActiveResult = current.resultIndex === idx;
          const rx = 60 + idx * 72;
          const ry = 155;
          return (
            <g key={idx}>
              <rect
                x={rx}
                y={ry}
                width={56}
                height={36}
                rx={6}
                fill={isActiveResult ? "#1d4ed8" : "#1e293b"}
                stroke={isActiveResult ? "#60a5fa" : "#334155"}
                strokeWidth={isActiveResult ? 1.5 : 0.5}
              />
              <text
                x={rx + 28}
                y={ry + 14}
                textAnchor="middle"
                fontSize={9}
                fill="#64748b"
              >
                {`x^${idx}`}
              </text>
              <text
                x={rx + 28}
                y={ry + 28}
                textAnchor="middle"
                fontSize={13}
                fill={isActiveResult ? "#93c5fd" : "#94a3b8"}
                fontFamily="monospace"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Step annotation */}
        <text
          x={200}
          y={220}
          textAnchor="middle"
          fontSize={10}
          fill="#94a3b8"
          fontFamily="monospace"
        >
          {`a[${current.i}] × b[${current.j}] = ${aCoeffs[current.i]} × ${bCoeffs[current.j]} = ${current.product} → result[${current.resultIndex}]`}
        </text>
        <text x={200} y={248} textAnchor="middle" fontSize={9} fill="#475569">
          Final: 4 + 13x + 22x² + 15x³
        </text>
      </svg>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (stepIndex >= steps.length - 1) {
              setStepIndex(0);
              setIsPlaying(true);
            } else {
              setIsPlaying((p) => !p);
            }
          }}
          className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          {isPlaying ? "Pause" : stepIndex >= steps.length - 1 ? "Restart" : "Play"}
        </button>
        <button
          onClick={() => setStepIndex((p) => Math.min(p + 1, steps.length - 1))}
          disabled={isPlaying || stepIndex >= steps.length - 1}
          className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Step →
        </button>
        <button
          onClick={() => { setIsPlaying(false); setStepIndex(0); }}
          className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition-colors"
        >
          Reset
        </button>
        <span className="ml-auto text-xs text-slate-500 font-mono">
          {stepIndex + 1} / {steps.length}
        </span>
      </div>
    </div>
  );
}
