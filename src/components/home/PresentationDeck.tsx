"use client";

import { useState } from "react";

const COMPLEXITY_ROWS = [
  { n: "100", naive: "10,000", fft: "664", ratio: "15x" },
  { n: "1,000", naive: "1,000,000", fft: "9,966", ratio: "100x" },
  { n: "10,000", naive: "100,000,000", fft: "132,877", ratio: "753x" },
  { n: "100,000", naive: "10,000,000,000", fft: "1,660,964", ratio: "6,022x" },
];

function rootPoints(n: number, cx = 150, cy = 150, r = 105) {
  return Array.from({ length: n }, (_, k) => {
    const angle = (2 * Math.PI * k) / n - Math.PI / 2;
    return {
      k,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 42 42" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 29a14 14 0 1 1 26 0" />
      <path d="m21 29 8-10" />
      <path d="M14 29h-2" />
      <path d="M30 29h-2" />
    </svg>
  );
}

function PolynomialFlowVisual() {
  const top = [52, 82, 112, 142, 172];
  const bottom = [52, 82, 112, 142, 172];
  const output = [300, 92, 330, 92, 360, 92, 390, 92, 420, 92, 450, 92];

  return (
    <svg viewBox="0 0 500 230" className="h-72 w-full max-w-[520px]" aria-hidden="true">
      <defs>
        <linearGradient id="polyLineBlue" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="polyLineCyan" x1="0" x2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <text x="18" y="82" fill="#93c5fd" fontSize="18" fontFamily="serif">A(x)</text>
      <text x="18" y="142" fill="#c084fc" fontSize="18" fontFamily="serif">B(x)</text>
      <text x="408" y="68" fill="#22d3ee" fontSize="18" fontFamily="serif">C(x)</text>

      {top.map((x, i) => (
        <g key={`top-${x}`}>
          <line x1={x} y1="86" x2={x} y2="138" stroke="#2563eb" strokeOpacity="0.25" strokeDasharray="3 3" />
          <circle cx={x} cy="86" r="6" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
          <circle cx={bottom[i]} cy="138" r="6" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" />
        </g>
      ))}

      {top.map((x, i) => (
        <path
          key={`curve-a-${x}`}
          d={`M ${x} 86 C ${190 + i * 12} ${20 + i * 10}, ${230 + i * 10} ${88 - i * 4}, 300 92`}
          fill="none"
          stroke="url(#polyLineBlue)"
          strokeWidth="1"
        />
      ))}
      {bottom.map((x, i) => (
        <path
          key={`curve-b-${x}`}
          d={`M ${x} 138 C ${175 + i * 14} ${195 - i * 8}, ${230 + i * 12} ${116 + i * 4}, 300 92`}
          fill="none"
          stroke="url(#polyLineCyan)"
          strokeWidth="1"
        />
      ))}

      {Array.from({ length: output.length / 2 }).map((_, i) => {
        const x = output[i * 2];
        const y = output[i * 2 + 1];
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
            <path
              d={`M ${x} ${y} C ${x + 18} ${130 + i * 5}, ${x + 32} ${154 + i * 2}, ${x + 46} ${112 + i * 3}`}
              fill="none"
              stroke="#22d3ee"
              strokeOpacity="0.25"
            />
          </g>
        );
      })}
    </svg>
  );
}

function ScalingChart() {
  const pointsNaive = [
    [68, 210],
    [160, 148],
    [252, 82],
    [344, 28],
  ];
  const pointsFft = [
    [68, 216],
    [160, 182],
    [252, 148],
    [344, 116],
  ];

  return (
    <svg viewBox="0 0 420 260" className="h-72 w-full" aria-hidden="true">
      <rect x="1" y="1" width="418" height="258" rx="18" fill="rgba(15,23,42,0.42)" stroke="rgba(148,163,184,0.18)" />
      <text x="56" y="38" fill="#f8fafc" fontSize="16" fontWeight="600">Algorithmic Scaling</text>
      <line x1="64" y1="218" x2="360" y2="218" stroke="#94a3b8" strokeOpacity="0.75" />
      <line x1="64" y1="218" x2="64" y2="54" stroke="#94a3b8" strokeOpacity="0.75" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <text x="40" y={218 - i * 48} fill="#cbd5e1" fontSize="12" textAnchor="end">10^{i + 2}</text>
          <line x1="64" y1={218 - i * 48} x2="360" y2={218 - i * 48} stroke="#334155" strokeOpacity="0.35" />
        </g>
      ))}
      <polyline points={pointsNaive.map((p) => p.join(",")).join(" ")} fill="none" stroke="#c084fc" strokeWidth="3" />
      <polyline points={pointsFft.map((p) => p.join(",")).join(" ")} fill="none" stroke="#38bdf8" strokeWidth="3" />
      {pointsNaive.map(([x, y]) => <circle key={`n-${x}`} cx={x} cy={y} r="3" fill="#c084fc" />)}
      {pointsFft.map(([x, y]) => <circle key={`f-${x}`} cx={x} cy={y} r="3" fill="#38bdf8" />)}
      <line x1="344" y1="28" x2="344" y2="218" stroke="#94a3b8" strokeDasharray="6 6" strokeOpacity="0.65" />
      <text x="356" y="34" fill="#c084fc" fontSize="14">Naive O(n²)</text>
      <text x="356" y="120" fill="#38bdf8" fontSize="14">FFT O(n log n)</text>
      <text x="210" y="246" fill="#cbd5e1" fontSize="13" fontStyle="italic">n</text>
    </svg>
  );
}

function ProcessVisual({ type }: { type: "wave" | "dots" | "return" }) {
  if (type === "dots") {
    return (
      <svg viewBox="0 0 120 90" className="h-28 w-36" aria-hidden="true">
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <circle key={`${row}-${col}-a`} cx={32 + col * 18} cy={24 + row * 18} r="5" fill="#a78bfa" />
          )),
        )}
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <circle key={`${row}-${col}-b`} cx={74 + col * 18} cy={24 + row * 18} r="5" fill="#c084fc" />
          )),
        )}
        <text x="60" y="52" textAnchor="middle" fill="#a78bfa" fontSize="24">x</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 140 90" className="h-28 w-40" aria-hidden="true">
      <circle cx="70" cy="45" r="39" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.18)" />
      <path
        d={type === "wave" ? "M20 45 C34 45, 34 28, 46 28 S58 62, 70 62 S82 28, 94 28 S106 45, 120 45" : "M20 54 C36 54, 38 35, 52 35 S66 70, 80 70 S94 20, 108 44 S118 54, 128 54"}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RootsCircle({ n }: { n: number }) {
  const points = rootPoints(n);
  return (
    <svg viewBox="0 0 300 300" className="h-[360px] w-full max-w-[390px]" aria-hidden="true">
      <defs>
        <filter id="rootGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <line x1="35" y1="150" x2="265" y2="150" stroke="#64748b" strokeOpacity="0.45" />
      <line x1="150" y1="35" x2="150" y2="265" stroke="#64748b" strokeOpacity="0.45" />
      <circle cx="150" cy="150" r="105" fill="none" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.75" />
      {points.map((p) => (
        <line key={`line-${p.k}`} x1="150" y1="150" x2={p.x} y2={p.y} stroke="#60a5fa" strokeOpacity="0.35" />
      ))}
      {points.map((p) => (
        <g key={p.k}>
          <circle cx={p.x} cy={p.y} r="7" fill={p.k % 2 === 0 ? "#38bdf8" : "#818cf8"} filter="url(#rootGlow)" />
          {n <= 8 && (
            <text
              x={150 + 130 * Math.cos((2 * Math.PI * p.k) / n - Math.PI / 2)}
              y={150 + 130 * Math.sin((2 * Math.PI * p.k) / n - Math.PI / 2)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#cbd5e1"
              fontSize="18"
              fontFamily="serif"
            >
              ω{p.k}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function ButterflyVisual() {
  return (
    <svg viewBox="0 0 520 260" className="h-72 w-full" aria-hidden="true">
      <defs>
        <radialGradient id="butterflyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="270" cy="128" r="18" fill="url(#butterflyGlow)" />
      <circle cx="270" cy="128" r="5" fill="#38bdf8" />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 36 + i * 23;
        const dy = y - 128;
        return (
          <g key={i}>
            <path
              d={`M 70 ${y} C 150 ${y}, 188 ${128 + dy * 0.42}, 270 128 C 360 ${128 - dy * 0.42}, 410 ${220 - y}, 500 ${220 - y}`}
              fill="none"
              stroke={i % 3 === 0 ? "#a78bfa" : "#2563eb"}
              strokeOpacity={0.18 + i * 0.035}
            />
            <circle cx="70" cy={y} r="2.5" fill={i % 3 === 0 ? "#a78bfa" : "#2563eb"} opacity="0.8" />
            <circle cx="500" cy={220 - y} r="2.5" fill={i % 3 === 0 ? "#a78bfa" : "#2563eb"} opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

function ApplicationsFlow() {
  return (
    <svg viewBox="0 0 420 110" className="h-28 w-full max-w-[520px]" aria-hidden="true">
      <defs>
        <linearGradient id="appFlow" x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M35 ${35 + i * 17} C95 ${10 + i * 24}, 135 ${80 - i * 10}, 200 55`} fill="none" stroke="url(#appFlow)" strokeOpacity="0.45" />
      ))}
      <circle cx="35" cy="35" r="4" fill="#38bdf8" />
      <circle cx="35" cy="52" r="4" fill="#60a5fa" />
      <circle cx="35" cy="69" r="4" fill="#8b5cf6" />
      <circle cx="210" cy="55" r="28" fill="rgba(14,165,233,0.12)" stroke="#38bdf8" />
      <text x="210" y="62" textAnchor="middle" fill="#dbeafe" fontSize="18">FFT</text>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M238 55 C295 ${38 + i * 13}, 320 ${35 + i * 17}, 370 ${35 + i * 17}`} fill="none" stroke="url(#appFlow)" strokeOpacity="0.36" />
      ))}
      <circle cx="370" cy="35" r="4" fill="#22c55e" />
      <circle cx="370" cy="52" r="4" fill="#38bdf8" />
      <circle cx="370" cy="69" r="4" fill="#60a5fa" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={392 + i * 5} y={78 - ((i * 7) % 34)} width="2" height={((i * 7) % 34) + 8} fill={i % 2 ? "#8b5cf6" : "#38bdf8"} opacity="0.8" />
      ))}
    </svg>
  );
}

function Slide1() {
  return (
    <div className="grid min-h-[550px] items-center gap-10 px-7 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1fr)]">
      <div className="space-y-7">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">The Problem</p>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">Multiplying Polynomials</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Given two polynomials, find their product — a fundamental operation in signal processing, convolution, and competitive programming.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/45 p-6 font-mono shadow-[inset_0_1px_0_rgba(148,163,184,0.05)]">
          <div className="space-y-4 text-lg">
            <p><span className="text-blue-300">A(x)</span><span className="mx-5 text-slate-500">=</span><span className="text-slate-100">1 + 2x + 3x²</span></p>
            <p><span className="text-cyan-300">B(x)</span><span className="mx-5 text-slate-500">=</span><span className="text-slate-100">4 + 5x</span></p>
            <div className="border-t border-slate-700/80 pt-4">
              <p><span className="text-cyan-300">C(x)</span><span className="mx-5 text-slate-500">=</span><span className="text-slate-400">A(x) · B(x)</span><span className="mx-3 text-slate-500">=</span><span className="text-cyan-300">4 + 13x + 22x² + 15x³</span></p>
            </div>
            <p className="pt-2 text-center text-sm text-slate-400">Each output coefficient is a sum of products:</p>
            <p className="text-center text-base text-blue-200">C[k] = Σ A[i] · B[k-i]</p>
          </div>
        </div>

        <div className="mx-auto flex w-fit items-center gap-4 rounded-2xl border border-cyan-500/15 bg-slate-950/45 px-6 py-4 text-slate-300">
          <span className="text-cyan-300"><GaugeIcon /></span>
          <span>Naive approach requires <strong className="text-cyan-300">O(n²)</strong> operations</span>
        </div>
      </div>

      <PolynomialFlowVisual />
    </div>
  );
}

function Slide2() {
  return (
    <div className="min-h-[550px] px-7 py-10">
      <div className="mb-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">Why It Matters</p>
        <h2 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-6xl">O(n²) Doesn&apos;t Scale</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Competitive programming problems routinely have n ≥ 100,000. The naive approach times out.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(380px,0.95fr)]">
        <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/45">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700/80 text-lg text-slate-300">
                <th className="px-6 py-5 font-medium">Degree n</th>
                <th className="px-6 py-5 text-right font-medium text-cyan-300">Naive ops</th>
                <th className="px-6 py-5 text-right font-medium text-blue-300">FFT ops</th>
                <th className="px-6 py-5 text-right font-medium text-cyan-300">Speedup</th>
              </tr>
            </thead>
            <tbody>
              {COMPLEXITY_ROWS.map((row, i) => (
                <tr key={row.n} className={`border-b border-slate-800/70 last:border-0 ${i === 3 ? "bg-blue-500/10" : ""}`}>
                  <td className="px-6 py-4 font-mono text-2xl text-slate-100">{row.n}</td>
                  <td className={`px-6 py-4 text-right font-mono text-2xl ${i === 3 ? "text-cyan-300" : "text-slate-100"}`}>{row.naive}</td>
                  <td className="px-6 py-4 text-right font-mono text-2xl text-blue-200">{row.fft}</td>
                  <td className="px-6 py-4 text-right font-mono text-2xl font-semibold text-cyan-300">{row.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScalingChart />
      </div>

      <div className="mt-8 flex w-fit items-center gap-4 rounded-2xl border border-cyan-500/20 bg-slate-950/45 px-6 py-4 text-lg text-slate-300">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400 text-cyan-300">ϟ</span>
        <span>At n = 100,000, FFT is over <strong className="text-cyan-300">6,000x</strong> faster than naive multiplication.</span>
      </div>
    </div>
  );
}

function Slide3() {
  const steps = [
    {
      num: "1",
      title: "Evaluate",
      body: "Evaluate both polynomials at the N-th roots of unity using FFT — O(n log n).",
      formula: "FFT(A), FFT(B)",
      visual: <ProcessVisual type="wave" />,
      color: "text-blue-300 border-blue-500/60",
    },
    {
      num: "2",
      title: "Pointwise Multiply",
      body: "Multiply the evaluated values element-by-element. Since we have values, not coefficients, this is just O(n).",
      formula: "C̃[k] = Ã[k] · B̃[k]",
      visual: <ProcessVisual type="dots" />,
      color: "text-cyan-300 border-cyan-500/60",
    },
    {
      num: "3",
      title: "Interpolate Back",
      body: "Apply the inverse FFT to recover the product polynomial's coefficients — O(n log n).",
      formula: "IFFT(C̃)",
      visual: <ProcessVisual type="return" />,
      color: "text-cyan-300 border-cyan-500/60",
    },
  ];

  return (
    <div className="min-h-[550px] px-7 py-10 text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">The Key Idea</p>
      <h2 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-6xl">Evaluate → Multiply → Interpolate</h2>
      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        Instead of multiplying coefficients directly, convert to value representation, multiply, then convert back.
      </p>

      <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.num} className="relative flex flex-col items-center">
            {i < steps.length - 1 && (
              <div className="pointer-events-none absolute left-[60%] top-32 hidden h-px w-[80%] bg-linear-to-r from-blue-500/40 to-cyan-400/70 lg:block" />
            )}
            <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full border bg-slate-950/60 text-3xl font-semibold ${step.color}`}>
              {step.num}
            </div>
            <h3 className="text-xl font-semibold text-slate-100">{step.title}</h3>
            <div className="my-4">{step.visual}</div>
            <p className="max-w-xs text-base leading-7 text-slate-400">{step.body}</p>
            <p className="mt-5 font-mono text-lg text-cyan-300">{step.formula}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex w-fit items-center gap-4 rounded-2xl border border-cyan-500/20 bg-slate-950/45 px-6 py-4 text-lg text-slate-300">
        <span className="text-cyan-300"><GaugeIcon /></span>
        <span>Total complexity: <strong className="font-mono text-cyan-300">O(n log n)</strong></span>
      </div>
    </div>
  );
}

function Slide4() {
  const [n, setN] = useState(8);

  return (
    <div className="min-h-[550px] px-7 py-10">
      <div className="text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">The Tool</p>
        <h2 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-6xl">Roots of Unity</h2>
        <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-400">
          The N-th roots of unity are N equally-spaced points on the unit circle in the complex plane.
          Their symmetric structure is what makes FFT possible.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(320px,0.9fr)_minmax(360px,1fr)]">
        <RootsCircle n={n} />
        <div className="space-y-6">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/45 p-7 font-mono">
            <p className="mb-5 text-base text-slate-400">n-th root of unity:</p>
            <p className="text-2xl text-cyan-300">ω_n^k = e^(2πik/n)</p>
            <p className="mt-5 text-2xl text-slate-300">= cos(2πk/n) + i sin(2πk/n)</p>
          </div>
          <p className="text-lg leading-8 text-slate-400">
            Key property: (ω_n^k)^n = 1. These symmetries collapse the DFT sum into a divide-and-conquer recursion.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-base text-slate-500">Show n =</span>
            {[4, 8, 16].map((v) => (
              <button
                key={v}
                onClick={() => setN(v)}
                className={`rounded-lg border px-5 py-2.5 font-mono text-lg transition-colors ${
                  n === v
                    ? "border-blue-500 bg-blue-500/15 text-blue-200 shadow-[0_0_28px_rgba(59,130,246,0.2)]"
                    : "border-slate-700 bg-slate-900/70 text-slate-400 hover:text-slate-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div className="relative min-h-[550px] overflow-hidden px-7 py-10">
      <div className="absolute right-0 top-20 hidden w-[40%] opacity-80 lg:block">
        <ButterflyVisual />
      </div>
      <div className="mx-auto max-w-4xl lg:mx-0 lg:ml-[18%]">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">The Algorithm</p>
        <h2 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">Cooley-Tukey Divide & Conquer</h2>
        <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-400">
          Split even and odd coefficients, recurse on each half, then combine with a butterfly operation.
        </p>

        <div className="mt-9 rounded-2xl border border-cyan-500/20 bg-slate-950/45 p-7 font-mono text-xl">
          <p className="mb-5 text-base text-slate-400">Core recursion:</p>
          <p className="text-slate-100">A(x) = A_even(x²) + x · A_odd(x²)</p>
          <div className="my-6 border-t border-slate-700/80" />
          <p className="text-blue-300">X[k] = E[k] + ω^k · O[k]</p>
          <p className="mt-4 text-cyan-300">X[k + n/2] = E[k] - ω^k · O[k]</p>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-3">
        {[
          { value: "2", label: "Subproblems", sub: "each half the size" },
          { value: "O(n)", label: "Combine step", sub: "butterfly pass" },
          { value: "O(n log n)", label: "Total", sub: "by master theorem" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-5 rounded-2xl border border-blue-500/25 bg-slate-950/45 p-6">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-blue-500/50 text-blue-300">
              <GaugeIcon />
            </span>
            <div>
              <p className="font-mono text-3xl font-semibold text-slate-100">{item.value}</p>
              <p className="mt-2 text-slate-200">{item.label}</p>
              <p className="mt-1 text-slate-400">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide6() {
  const cards = [
    {
      title: "Polynomial Multiplication",
      body: "Multiply two degree-n polynomials in O(n log n). Foundation for everything else.",
      tag: "direct",
      icon: "x²",
      tone: "blue",
    },
    {
      title: "String Convolution",
      body: "Count matches of a pattern in a text with wildcards. FFT treats the problem as polynomial multiplication.",
      tag: "strings",
      icon: "T",
      tone: "violet",
    },
    {
      title: "Subset Sum Counting",
      body: "Count how many subsets achieve each possible sum. Model as coefficient of a product polynomial.",
      tag: "combinatorics",
      icon: "Σ",
      tone: "cyan",
    },
    {
      title: "NTT for Exact Results",
      body: "When answers must be integers mod p, use NTT (mod 998244353) instead of floating-point FFT.",
      tag: "modular",
      icon: "NTT",
      tone: "emerald",
    },
  ];

  const toneClasses: Record<string, string> = {
    blue: "border-blue-500/45 text-blue-300",
    violet: "border-cyan-500/45 text-cyan-300",
    cyan: "border-cyan-500/45 text-cyan-300",
    emerald: "border-emerald-500/45 text-emerald-300",
  };

  return (
    <div className="min-h-[550px] px-7 py-10 text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-emerald-300">Competitive Programming</p>
      <h2 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-6xl">Where FFT Shows Up</h2>
      <p className="mx-auto mt-5 max-w-4xl text-xl leading-8 text-slate-400">
        FFT is the engine behind a surprisingly wide class of problems.
      </p>
      <div className="mx-auto mt-7">
        <ApplicationsFlow />
      </div>
      <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-2">
        {cards.map((card) => (
          <div key={card.title} className={`grid grid-cols-[72px_1fr_auto] gap-5 rounded-2xl border bg-slate-950/45 p-6 text-left ${toneClasses[card.tone]}`}>
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-current/45 bg-current/5 font-mono text-xl font-semibold">
              {card.icon}
            </span>
            <div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-lg leading-8 text-slate-400">{card.body}</p>
            </div>
            <span className="text-slate-500">{card.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SLIDES = [
  { id: 1, label: "The Problem", component: Slide1 },
  { id: 2, label: "Why It Matters", component: Slide2 },
  { id: 3, label: "The Key Idea", component: Slide3 },
  { id: 4, label: "Roots of Unity", component: Slide4 },
  { id: 5, label: "The Algorithm", component: Slide5 },
  { id: 6, label: "CP Applications", component: Slide6 },
];

export function PresentationDeck() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const SlideComponent = slide.component;

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/45 shadow-[0_24px_80px_rgba(2,6,23,0.52),inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      <div className="flex overflow-x-auto border-b border-slate-800/80 bg-slate-950/50">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`relative flex min-w-max flex-1 items-center justify-center gap-3 px-5 py-4 text-base transition-colors ${
              i === index ? "text-blue-200" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                i === index
                  ? "bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.75)]"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {s.id}
            </span>
            <span className={i === index ? "font-semibold" : ""}>{s.label}</span>
            {i === index && <span className="absolute inset-x-6 bottom-0 h-0.5 bg-blue-500 shadow-[0_0_22px_rgba(59,130,246,0.8)]" />}
          </button>
        ))}
      </div>

      <div className="bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,0.08),transparent_34%),radial-gradient(circle_at_80%_45%,rgba(37,99,235,0.07),transparent_28%)]">
        <SlideComponent />
      </div>

      <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/45 px-6 py-5">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
        >
          ← Previous
        </button>

        <div className="flex gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                i === index ? "h-3 w-3 bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.85)]" : "mt-0.5 h-2.5 w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setIndex((i) => Math.min(SLIDES.length - 1, i + 1))}
          disabled={index === SLIDES.length - 1}
          className="rounded-lg border border-blue-500/60 bg-blue-500/12 px-5 py-2.5 text-sm text-blue-200 transition-colors hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
