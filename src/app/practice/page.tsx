import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProblemCard } from "@/components/practice/ProblemCard";
import { CodeIDE } from "@/components/practice/CodeIDE";
import { TestCaseSkeleton } from "@/components/practice/TestCaseSkeleton";
import { BenchmarkPanel } from "@/components/practice/BenchmarkPanel";
import { ComplexityChart } from "@/components/practice/ComplexityChart";
import { PROBLEM_CARDS } from "@/lib/placeholders";

const EXTERNAL_LINKS = [
  {
    platform: "CSES",
    title: "Polynomial Multiplication",
    difficulty: "Intro",
    description: "Direct FFT application — given two polynomials, compute their product. The canonical entry-level FFT problem.",
    href: "https://cses.fi/problemset/task/1112",
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    platform: "AtCoder",
    title: "ATC001-C — Fast Fourier Transform",
    difficulty: "Medium",
    description: "Classic AtCoder introduction: count the number of ways to pick one element each from two arrays such that their sum equals each target.",
    href: "https://atcoder.jp/contests/atc001/tasks/fft_c",
    color: "text-blue-400",
    badgeBg: "bg-blue-500/10 border-blue-500/30",
  },
  {
    platform: "Codeforces",
    title: "CF 1257G — Divisor Set",
    difficulty: "Hard",
    description: "Divide-and-conquer FFT: multiply together the linear factors of a large polynomial without materialising the full product at each step.",
    href: "https://codeforces.com/problemset/problem/1257/G",
    color: "text-purple-400",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
  },
  {
    platform: "Codeforces",
    title: "CF 993E — Nikita and Order Statistics",
    difficulty: "Hard",
    description: "Count pairs of subarrays with specific prefix-sum properties. Reduces to a circular convolution solvable with FFT over the prefix-sum array.",
    href: "https://codeforces.com/problemset/problem/993/E",
    color: "text-purple-400",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
  },
  {
    platform: "cp-algorithms",
    title: "FFT tutorial & template",
    difficulty: "Reference",
    description: "Comprehensive walkthrough of recursive FFT, iterative FFT, and NTT with ready-to-paste C++ code.",
    href: "https://cp-algorithms.com/algebra/fft.html",
    color: "text-slate-400",
    badgeBg: "bg-slate-500/10 border-slate-500/30",
  },
  {
    platform: "Codeforces Blog",
    title: "Introduction to FFT (jakobkogler)",
    difficulty: "Reference",
    description: "Step-by-step derivation from polynomials to the butterfly operation, with intuition on why the algorithm works.",
    href: "https://codeforces.com/blog/entry/43499",
    color: "text-slate-400",
    badgeBg: "bg-slate-500/10 border-slate-500/30",
  },
];

export default function PracticePage() {
  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Practice"
        title="Problems & Editor"
        description="Built-in Python and C++ editor, Codeforces practice problems, a live performance benchmark, and test cases."
      />

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Problems
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_CARDS.map((p) => (
            <ProblemCard key={p.title} problem={p} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Built-in editor
        </h2>
        <CodeIDE />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Test cases
        </h2>
        <TestCaseSkeleton />
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
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${link.badgeBg} ${link.color}`}>
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
