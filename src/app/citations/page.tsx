import { CitationSection } from "@/components/citations/CitationSection";
import type { Citation } from "@/components/citations/CitationCard";

const CITATIONS: Citation[] = [
  {
    id: "clrs",
    title: "Introduction to Algorithms, 4th Edition",
    authors: "Cormen, Leiserson, Rivest, Stein",
    year: 2022,
    description:
      'The definitive algorithms textbook. Chapter 30 ("Polynomials and the FFT") provides a rigorous mathematical derivation of the DFT, the FFT algorithm, and polynomial multiplication. Includes proofs of correctness and complexity analysis.',
    category: "textbook",
    section: "Chapter 30 — Polynomials and the FFT",
  },
  {
    id: "cph",
    title: "Competitive Programmer's Handbook",
    authors: "Antti Laaksonen",
    year: 2018,
    url: "https://cses.fi/book/book.pdf",
    description:
      "A freely available competitive programming reference. Chapter 24 covers polynomial multiplication via FFT and NTT, with concise implementation-focused explanations targeted at competitive programmers.",
    category: "textbook",
    section: "Chapter 24 — Polynomial Multiplication",
  },
  {
    id: "cp-algorithms-fft",
    title: "Fast Fourier Transform — CP-Algorithms",
    authors: "CP-Algorithms contributors",
    year: "2024 (continuously updated)",
    url: "https://cp-algorithms.com/algebra/fft.html",
    description:
      "A comprehensive walkthrough of FFT for competitive programming. Covers recursive and iterative Cooley-Tukey implementations, NTT with mod 998244353, and practical tips for precision and performance.",
    category: "online",
  },
  {
    id: "nayuki-fft",
    title: "Free Small FFT in Multiple Languages",
    authors: "Nayuki Minase",
    year: 2021,
    url: "https://www.nayuki.io/page/free-small-fft-in-multiple-languages",
    description:
      "Clean, minimal, and correct FFT implementations in C, C++, Java, JavaScript, Python, and more. Valuable as a correctness reference when debugging your own implementation.",
    category: "online",
  },
  {
    id: "wikipedia-cooley-tukey",
    title: "Cooley–Tukey FFT Algorithm",
    authors: "Wikipedia contributors",
    year: "2024 (continuously updated)",
    url: "https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm",
    description:
      "Covers the history of the FFT (Cooley & Tukey, 1965), the mathematical derivation of the divide-and-conquer recursion, and a description of the butterfly diagram. Good for understanding the algorithm's origins.",
    category: "online",
  },
  {
    id: "cf-fft-intro",
    title: "FFT: From Numbers to Polynomials",
    authors: "jakobkogler (Codeforces)",
    year: 2017,
    url: "https://codeforces.com/blog/entry/43499",
    description:
      "A highly cited Codeforces blog post that motivates FFT through polynomial multiplication, covers precision issues with floating-point FFT, and introduces NTT as a remedy. Includes multiple worked examples.",
    category: "competitive",
  },
  {
    id: "cf-fft-comprehensive",
    title: "A Comprehensive Introduction to the FFT",
    authors: "matthew99 (Codeforces)",
    year: 2018,
    url: "https://codeforces.com/blog/entry/48798",
    description:
      "Step-by-step derivation of FFT from the DFT definition, with emphasis on the iterative implementation and bit-reversal permutation. Also covers NTT and gives template code for competitive programming.",
    category: "competitive",
  },
  {
    id: "kactl",
    title: "KACTL — KTH Algorithm Competition Template Library",
    authors: "KTH Royal Institute of Technology",
    year: "2024 (continuously maintained)",
    url: "https://github.com/kth-competitive-programming/kactl",
    description:
      "The template library used by KTH's ICPC teams, widely regarded as one of the best-maintained CP code libraries. The FFT and NTT implementations are battle-tested across hundreds of contest problems.",
    category: "competitive",
    section: "content/numerical/FastFourierTransform.h",
  },
];

function CitationsHeroVisual() {
  const rows = Array.from({ length: 8 });
  const cols = [126, 200, 274, 348];
  const output = { x: 424, y: 116 };

  return (
    <svg viewBox="0 0 560 240" className="h-56 w-full text-cyan-400" aria-hidden="true">
      <defs>
        <linearGradient id="citationsLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
          <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="citationsBars" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.72" />
        </linearGradient>
      </defs>

      {rows.map((_, i) => {
        const y = 42 + i * 21;
        return (
          <g key={i}>
            <path
              d={`M22 ${y} C 39 ${y - 14}, 53 ${y + 14}, 70 ${y} S 104 ${y - 14}, 118 ${y}`}
              fill="none"
              stroke="url(#citationsLine)"
              strokeWidth="1.2"
            />
            {cols.map((x, col) => (
              <circle key={x} cx={x} cy={y} r={2.4} fill="#22d3ee" opacity={0.45 + col * 0.11} />
            ))}
          </g>
        );
      })}

      {rows.map((_, row) => {
        const y = 42 + row * 21;
        return cols.slice(0, -1).flatMap((x, col) => {
          const nextX = cols[col + 1];
          const y2 = 42 + ((row + 2 + col) % rows.length) * 21;
          return (
            <line
              key={`${row}-${col}`}
              x1={x}
              y1={y}
              x2={nextX}
              y2={y2}
              stroke="#0ea5e9"
              strokeOpacity={0.28 + col * 0.08}
              strokeWidth="1"
            />
          );
        });
      })}

      {rows.map((_, i) => {
        const y = 42 + i * 21;
        return (
          <path
            key={i}
            d={`M348 ${y} C 376 ${y}, 398 ${116 + (y - 116) * 0.42}, ${output.x} ${output.y}`}
            fill="none"
            stroke="#22d3ee"
            strokeOpacity="0.34"
            strokeWidth="1"
          />
        );
      })}
      <circle cx={output.x} cy={output.y} r={4.8} fill="#22d3ee" />

      {Array.from({ length: 30 }).map((_, i) => {
        const h = 14 + ((i * 19) % 92);
        return (
          <rect
            key={i}
            x={462 + i * 3}
            y={200 - h}
            width="1.4"
            height={h}
            fill="url(#citationsBars)"
            opacity={0.15 + (i % 6) * 0.05}
          />
        );
      })}
    </svg>
  );
}

export default function CitationsPage() {
  const textbooks = CITATIONS.filter(c => c.category === "textbook");
  const online = CITATIONS.filter(c => c.category === "online");
  const competitive = CITATIONS.filter(c => c.category === "competitive");

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-8 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
        <header>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Citations
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
            References & Resources
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            All sources used in building this tutorial — textbooks, online references, and competitive programming resources.
          </p>
        </header>
        <div className="hidden lg:block">
          <CitationsHeroVisual />
        </div>
      </section>
      <CitationSection category="textbook" citations={textbooks} />
      <CitationSection category="online" citations={online} />
      <CitationSection category="competitive" citations={competitive} />
      <section className="rounded-xl border border-cyan-500/20 bg-slate-950/45 p-8 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-cyan-500/35 bg-cyan-500/8 text-cyan-300">
              <svg viewBox="0 0 28 28" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 7.5c0-1 .8-1.8 1.8-1.8h5c1.1 0 2.1.4 2.8 1.1.7-.7 1.7-1.1 2.8-1.1h5c1 0 1.8.8 1.8 1.8V21c0 .6-.5 1.1-1.1 1.1H17c-1.1 0-2.1.4-2.8 1.1-.7-.7-1.7-1.1-2.8-1.1H5.6c-.6 0-1.1-.5-1.1-1.1Z" />
                <path d="M14 6.8v15" />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-slate-100">Found a great resource?</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
                Help improve this lab by suggesting high-quality references and resources for the community.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/Aman-Bollam/fast-fourier-transform-presentation/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-500/60 bg-slate-950/60 px-5 py-3 text-sm font-medium text-blue-300 transition-colors hover:border-blue-400 hover:text-blue-200"
          >
            Suggest a resource →
          </a>
        </div>
      </section>
    </div>
  );
}
