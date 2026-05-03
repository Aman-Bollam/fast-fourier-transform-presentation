"use client";

import { useState } from "react";

// ─── Slide data ──────────────────────────────────────────────────────────────

const COMPLEXITY_ROWS = [
  { n: "100",     naive: "10,000",           fft: "664",           ratio: "15×" },
  { n: "1,000",   naive: "1,000,000",        fft: "9,966",         ratio: "100×" },
  { n: "10,000",  naive: "100,000,000",      fft: "132,877",       ratio: "753×" },
  { n: "100,000", naive: "10,000,000,000",   fft: "1,660,964",     ratio: "6,022×" },
];

// Unit circle roots for Slide 4 SVG
function rootPoints(n: number) {
  return Array.from({ length: n }, (_, k) => {
    const angle = (2 * Math.PI * k) / n;
    return {
      k,
      cx: 100 + 78 * Math.cos(angle - Math.PI / 2),
      cy: 100 + 78 * Math.sin(angle - Math.PI / 2),
    };
  });
}

// ─── Individual slide components ─────────────────────────────────────────────

function Slide1() {
  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">The Problem</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Multiplying Polynomials
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Given two polynomials, find their product — a fundamental operation in signal processing, convolution, and competitive programming.
        </p>
      </div>

      <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900/80 p-6 font-mono text-sm space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-blue-300">A(x)</span>
          <span className="text-slate-500">=</span>
          <span className="text-slate-200">1 + 2x + 3x²</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-purple-300">B(x)</span>
          <span className="text-slate-500">=</span>
          <span className="text-slate-200">4 + 5x</span>
        </div>
        <div className="border-t border-slate-700 pt-4 flex items-center gap-3 flex-wrap">
          <span className="text-cyan-300">C(x)</span>
          <span className="text-slate-500">=</span>
          <span className="text-emerald-300">4 + 13x + 22x² + 15x³</span>
        </div>
        <p className="text-xs text-slate-500">Each output coefficient is a sum of products: C[k] = Σ A[i]·B[k−i]</p>
      </div>

      <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-red-800/50 bg-red-950/30">
        <span className="text-2xl font-bold text-red-400">O(n²)</span>
        <span className="text-slate-400 text-sm">operations with the naive approach</span>
      </div>
    </div>
  );
}

function Slide2() {
  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-red-400">Why It Matters</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          O(n²) Doesn&apos;t Scale
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Competitive programming problems routinely have n ≥ 10⁵. The naive approach times out.
        </p>
      </div>

      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-5 py-3 text-left text-xs font-medium text-slate-500">Degree n</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-red-400">Naive ops</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-blue-400">FFT ops</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-emerald-400">Speedup</th>
            </tr>
          </thead>
          <tbody>
            {COMPLEXITY_ROWS.map((row, i) => (
              <tr key={row.n} className={`border-b border-slate-800/60 last:border-0 ${i === 3 ? "bg-red-950/20" : ""}`}>
                <td className="px-5 py-3 font-mono text-slate-300">{row.n}</td>
                <td className={`px-5 py-3 text-right font-mono ${i === 3 ? "text-red-400 font-semibold" : "text-slate-400"}`}>{row.naive}</td>
                <td className="px-5 py-3 text-right font-mono text-blue-300">{row.fft}</td>
                <td className="px-5 py-3 text-right font-mono text-emerald-300 font-semibold">{row.ratio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-slate-500 text-sm max-w-md text-center">
        At n = 100,000, FFT is over <span className="text-emerald-400 font-semibold">6,000×</span> faster than naive multiplication.
      </p>
    </div>
  );
}

function Slide3() {
  const steps = [
    {
      num: "1",
      color: "blue",
      title: "Evaluate",
      body: "Evaluate both polynomials at the N-th roots of unity using FFT — O(n log n).",
      formula: "FFT(A), FFT(B)",
    },
    {
      num: "2",
      color: "purple",
      title: "Pointwise Multiply",
      body: "Multiply the evaluated values element-by-element. Since we have values, not coefficients, this is just O(n).",
      formula: "C̃[k] = Ã[k] · B̃[k]",
    },
    {
      num: "3",
      color: "cyan",
      title: "Interpolate Back",
      body: "Apply the inverse FFT to recover the product polynomial's coefficients — O(n log n).",
      formula: "IFFT(C̃)",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "border-blue-500/50 text-blue-400",
    purple: "border-purple-500/50 text-purple-400",
    cyan: "border-cyan-500/50 text-cyan-400",
  };
  const bgMap: Record<string, string> = {
    blue: "bg-blue-500/10",
    purple: "bg-purple-500/10",
    cyan: "bg-cyan-500/10",
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">The Key Idea</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Evaluate → Multiply → Interpolate
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Instead of multiplying coefficients directly, convert to value representation, multiply, then convert back.
        </p>
      </div>

      <div className="w-full max-w-2xl grid sm:grid-cols-3 gap-4">
        {steps.map((s) => (
          <div key={s.num} className={`rounded-2xl border ${colorMap[s.color]} ${bgMap[s.color]} p-5 space-y-3`}>
            <div className={`text-3xl font-bold ${colorMap[s.color].split(" ")[1]}`}>{s.num}</div>
            <h3 className="text-base font-semibold text-slate-100">{s.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{s.body}</p>
            <p className={`font-mono text-xs ${colorMap[s.color].split(" ")[1]}`}>{s.formula}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-400">Total complexity:</span>
        <span className="font-mono font-bold text-emerald-400 text-base">O(n log n)</span>
      </div>
    </div>
  );
}

function Slide4() {
  const [n, setN] = useState(8);
  const points = rootPoints(n);

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">The Tool</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Roots of Unity
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          The N-th roots of unity are N equally-spaced points on the unit circle in the complex plane.
          Their symmetric structure is what makes FFT possible.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <svg viewBox="0 0 200 200" className="w-44 h-44 shrink-0">
          {/* Axes */}
          <line x1="10" y1="100" x2="190" y2="100" stroke="#334155" strokeWidth="1" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#334155" strokeWidth="1" />
          {/* Unit circle */}
          <circle cx="100" cy="100" r="78" fill="none" stroke="#475569" strokeWidth="1" />
          {/* Radial lines */}
          {points.map(p => (
            <line key={p.k} x1="100" y1="100" x2={p.cx} y2={p.cy} stroke="#1e40af" strokeWidth="1" strokeOpacity="0.5" />
          ))}
          {/* Points */}
          {points.map(p => (
            <circle key={p.k} cx={p.cx} cy={p.cy} r="5" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
          ))}
          {/* Labels for small n */}
          {n <= 8 && points.map(p => {
            const lx = 100 + 94 * Math.cos((2 * Math.PI * p.k) / n - Math.PI / 2);
            const ly = 100 + 94 * Math.sin((2 * Math.PI * p.k) / n - Math.PI / 2);
            return (
              <text key={p.k} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#94a3b8">
                ω{p.k}
              </text>
            );
          })}
        </svg>

        <div className="space-y-4 max-w-xs">
          <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 font-mono text-sm space-y-1">
            <p className="text-slate-500 text-xs mb-2">n-th root of unity:</p>
            <p className="text-cyan-300">ω_n^k = e^(2πik/n)</p>
            <p className="text-slate-400 text-xs mt-2">= cos(2πk/n) + i·sin(2πk/n)</p>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Key property: (ω_n^k)^n = 1. These symmetries collapse the DFT sum into a divide-and-conquer recursion.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Show n =</span>
            {[4, 8, 16].map(v => (
              <button
                key={v}
                onClick={() => setN(v)}
                className={`rounded px-2.5 py-1 text-xs font-mono transition-colors ${
                  n === v ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200"
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
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">The Algorithm</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Cooley-Tukey Divide & Conquer
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Split even and odd coefficients, recurse on each half, then combine with a butterfly operation.
        </p>
      </div>

      <div className="w-full max-w-xl space-y-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 font-mono text-sm space-y-2">
          <p className="text-slate-500 text-xs mb-3">Core recursion:</p>
          <p className="text-slate-300">A(x) = A_even(x²) + x · A_odd(x²)</p>
          <div className="border-t border-slate-700 my-3" />
          <p className="text-blue-300">X[k]       = E[k] + ω^k · O[k]</p>
          <p className="text-purple-300">X[k + n/2] = E[k] − ω^k · O[k]</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-center">
          {[
            { label: "Subproblems", value: "2", sub: "each half the size" },
            { label: "Combine step", value: "O(n)", sub: "butterfly pass" },
            { label: "Total", value: "O(n log n)", sub: "by master theorem" },
          ].map(item => (
            <div key={item.label} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <p className="text-xl font-bold font-mono text-blue-300">{item.value}</p>
              <p className="text-xs text-slate-400 mt-1">{item.label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide6() {
  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Competitive Programming</p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-100 tracking-tight">
          Where FFT Shows Up
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          FFT is the engine behind a surprisingly wide class of problems.
        </p>
      </div>

      <div className="w-full max-w-2xl grid sm:grid-cols-2 gap-4">
        {[
          {
            accent: "blue",
            title: "Polynomial Multiplication",
            body: "Multiply two degree-n polynomials in O(n log n). Foundation for everything else.",
            tag: "direct",
          },
          {
            accent: "purple",
            title: "String Convolution",
            body: "Count matches of a pattern in a text with wildcards. FFT treats the problem as polynomial multiplication.",
            tag: "strings",
          },
          {
            accent: "cyan",
            title: "Subset Sum Counting",
            body: "Count how many subsets achieve each possible sum. Model as coefficient of a product polynomial.",
            tag: "combinatorics",
          },
          {
            accent: "emerald",
            title: "NTT for Exact Results",
            body: "When answers must be integers mod p, use NTT (mod 998244353) instead of floating-point FFT.",
            tag: "modular",
          },
        ].map(c => {
          const border: Record<string, string> = {
            blue: "border-blue-500/40", purple: "border-purple-500/40",
            cyan: "border-cyan-500/40", emerald: "border-emerald-500/40",
          };
          const text: Record<string, string> = {
            blue: "text-blue-400", purple: "text-purple-400",
            cyan: "text-cyan-400", emerald: "text-emerald-400",
          };
          return (
            <div key={c.title} className={`rounded-2xl border ${border[c.accent]} bg-slate-900/60 p-5 space-y-2`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-semibold ${text[c.accent]}`}>{c.title}</h3>
                <span className="text-xs font-mono text-slate-600">{c.tag}</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{c.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Deck shell ──────────────────────────────────────────────────────────────

const SLIDES = [
  { id: 1, label: "The Problem",        component: Slide1 },
  { id: 2, label: "Why It Matters",     component: Slide2 },
  { id: 3, label: "The Key Idea",       component: Slide3 },
  { id: 4, label: "Roots of Unity",     component: Slide4 },
  { id: 5, label: "The Algorithm",      component: Slide5 },
  { id: 6, label: "CP Applications",    component: Slide6 },
];

export function PresentationDeck() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];
  const SlideComponent = slide.component;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/40 backdrop-blur overflow-hidden">
      {/* Slide tab strip */}
      <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/60">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 -mb-px transition-colors ${
              i === index
                ? "border-blue-500 text-blue-300 bg-blue-500/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <span className={`inline-flex items-center justify-center size-4 rounded-full text-[10px] font-bold ${
              i === index ? "bg-blue-500/30 text-blue-300" : "bg-slate-800 text-slate-500"
            }`}>
              {s.id}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div className="min-h-[420px] px-6 py-8 flex flex-col">
        <div className="flex-1">
          <SlideComponent />
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                i === index
                  ? "size-2.5 bg-blue-500"
                  : "size-2 bg-slate-700 hover:bg-slate-500 mt-0.5"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setIndex(i => Math.min(SLIDES.length - 1, i + 1))}
          disabled={index === SLIDES.length - 1}
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
