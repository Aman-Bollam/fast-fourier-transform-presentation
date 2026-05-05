"use client";

import { useEffect, useState } from "react";
import { ProblemCard } from "@/components/practice/ProblemCard";
import { CodeIDE } from "@/components/practice/CodeIDE";
import { BenchmarkPanel } from "@/components/practice/BenchmarkPanel";
import { ComplexityChart } from "@/components/practice/ComplexityChart";
import { FFT_PROBLEMS, findProblemById } from "@/lib/fftProblems";

const SELECTED_STORAGE_KEY = "fft-ide-selected-problem";

const EXTERNAL_LINKS = [
  {
    platform: "CSES",
    title: "Polynomial Multiplication",
    difficulty: "Intro",
    description:
      "Direct FFT application — given two polynomials, compute their product. The canonical entry-level FFT problem.",
    href: "https://cses.fi/problemset/task/1112",
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    platform: "AtCoder",
    title: "ATC001-C — Fast Fourier Transform",
    difficulty: "Medium",
    description:
      "Classic AtCoder introduction: count the number of ways to pick one element each from two arrays such that their sum equals each target.",
    href: "https://atcoder.jp/contests/atc001/tasks/fft_c",
    color: "text-blue-400",
    badgeBg: "bg-blue-500/10 border-blue-500/30",
  },
  {
    platform: "Codeforces",
    title: "CF 1257G — Divisor Set",
    difficulty: "Hard",
    description:
      "Divide-and-conquer FFT: multiply together the linear factors of a large polynomial without materialising the full product at each step.",
    href: "https://codeforces.com/problemset/problem/1257/G",
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30",
  },
  {
    platform: "Codeforces",
    title: "CF 993E — Nikita and Order Statistics",
    difficulty: "Hard",
    description:
      "Count pairs of subarrays with specific prefix-sum properties. Reduces to a circular convolution solvable with FFT over the prefix-sum array.",
    href: "https://codeforces.com/problemset/problem/993/E",
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30",
  },
  {
    platform: "cp-algorithms",
    title: "FFT tutorial & template",
    difficulty: "Reference",
    description:
      "Comprehensive walkthrough of recursive FFT, iterative FFT, and NTT with ready-to-paste C++ code.",
    href: "https://cp-algorithms.com/algebra/fft.html",
    color: "text-slate-400",
    badgeBg: "bg-slate-500/10 border-slate-500/30",
  },
  {
    platform: "Codeforces Blog",
    title: "Introduction to FFT (jakobkogler)",
    difficulty: "Reference",
    description:
      "Step-by-step derivation from polynomials to the butterfly operation, with intuition on why the algorithm works.",
    href: "https://codeforces.com/blog/entry/43499",
    color: "text-slate-400",
    badgeBg: "bg-slate-500/10 border-slate-500/30",
  },
];

function PracticeHeroVisual() {
  const nodes = [
    [55, 72], [112, 42], [172, 76], [232, 45], [292, 82], [352, 50], [412, 72],
    [70, 132], [142, 112], [214, 136], [286, 118], [360, 142], [430, 116],
  ];

  return (
    <svg viewBox="0 0 560 220" className="h-52 w-full text-cyan-400" aria-hidden="true">
      <defs>
        <linearGradient id="practiceMesh" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
          <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="practiceWave" x1="0" x2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
          <stop offset="65%" stopColor="#22d3ee" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      {nodes.map(([x, y], i) => (
        <g key={i}>
          {i < nodes.length - 1 && (
            <line x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} stroke="url(#practiceMesh)" strokeWidth="1.2" />
          )}
          {i < nodes.length - 3 && (
            <line x1={x} y1={y} x2={nodes[i + 3][0]} y2={nodes[i + 3][1]} stroke="#0ea5e9" strokeOpacity="0.24" strokeWidth="1" />
          )}
          <circle cx={x} cy={y} r={2.6} fill="#22d3ee" opacity="0.85" />
        </g>
      ))}

      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M230 ${132 - i * 20} C 270 ${95 - i * 12}, 310 ${160 - i * 10}, 350 ${112 - i * 14} S 420 ${76 - i * 8}, 488 ${118 - i * 18}`}
          fill="none"
          stroke="url(#practiceWave)"
          strokeWidth="1.2"
          opacity={0.45 + i * 0.12}
        />
      ))}

      {Array.from({ length: 26 }).map((_, i) => {
        const h = 18 + ((i * 19) % 88);
        return (
          <rect
            key={i}
            x={410 + i * 4.3}
            y={182 - h}
            width="1.6"
            height={h}
            rx="0.8"
            fill="#0ea5e9"
            opacity={0.08 + (i % 6) * 0.035}
          />
        );
      })}
    </svg>
  );
}

export default function PracticePage() {
  const [selectedId, setSelectedId] = useState<string>(FFT_PROBLEMS[0].id);

  // Restore last selection on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SELECTED_STORAGE_KEY);
      if (saved && FFT_PROBLEMS.some((p) => p.id === saved)) {
        setSelectedId(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist selection when it changes.
  useEffect(() => {
    try {
      localStorage.setItem(SELECTED_STORAGE_KEY, selectedId);
    } catch {
      /* ignore */
    }
  }, [selectedId]);

  const selectedProblem = findProblemById(selectedId);

  return (
    <div className="space-y-10">
      <section className="grid items-center gap-8 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
        <header>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Practice
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
            Problems & Editor
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            Pick a Codeforces problem, write a solution in Python or C++, and grade it locally against the public sample tests.
          </p>
        </header>
        <div className="hidden lg:block">
          <PracticeHeroVisual />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Problems
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FFT_PROBLEMS.map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              selected={p.id === selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Built-in editor
        </h2>
        <CodeIDE problem={selectedProblem} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Complexity comparison
          </h2>
          <ComplexityChart />
        </div>
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Live benchmark
          </h2>
          <BenchmarkPanel />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          External practice
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-cyan-500/15 bg-slate-950/45 p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur transition-colors hover:border-cyan-500/45 hover:bg-slate-900/55"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${link.badgeBg} ${link.color}`}
                >
                  {link.platform}
                </span>
                <span className="text-xs text-slate-500">{link.difficulty}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-semibold ${link.color}`}>
                    {link.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{link.description}</p>
                </div>
                <span className="mt-6 text-2xl text-blue-300 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
