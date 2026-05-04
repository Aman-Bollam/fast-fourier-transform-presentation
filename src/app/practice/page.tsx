"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
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
    color: "text-purple-400",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
  },
  {
    platform: "Codeforces",
    title: "CF 993E — Nikita and Order Statistics",
    difficulty: "Hard",
    description:
      "Count pairs of subarrays with specific prefix-sum properties. Reduces to a circular convolution solvable with FFT over the prefix-sum array.",
    href: "https://codeforces.com/problemset/problem/993/E",
    color: "text-purple-400",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
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
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Practice"
        title="Problems & Editor"
        description="Pick a Codeforces problem, write a solution in Python or C++, and grade it locally against the public sample tests."
      />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
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
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Built-in editor
        </h2>
        <CodeIDE problem={selectedProblem} />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Complexity comparison
        </h2>
        <ComplexityChart />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Live benchmark
        </h2>
        <BenchmarkPanel />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          External practice
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-4 hover:border-slate-700 hover:bg-slate-800/60 transition-colors space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded border ${link.badgeBg} ${link.color}`}
                >
                  {link.platform}
                </span>
                <span className="text-xs text-slate-500">{link.difficulty}</span>
              </div>
              <p className={`text-sm font-medium ${link.color} group-hover:underline`}>
                {link.title}
              </p>
              <p className="text-xs text-slate-500 leading-snug">{link.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
