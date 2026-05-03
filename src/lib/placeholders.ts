export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus augue ac pulvinar blandit. Nam semper lectus eu arcu rutrum posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod eros vel diam dapibus pulvinar. Curabitur ultrices tincidunt blandit. Vestibulum ante libero, eleifend eu lobortis eu, aliquam eu felis. Donec non nunc velit. Suspendisse potenti.";

export type Accent = "blue" | "purple" | "cyan" | "emerald";

export type FeatureCardData = {
  title: string;
  description: string;
  href: string;
  accent: Accent;
};

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: "Learn",
    description:
      "Interactive visualizations and a written article walking through DFT, the Cooley-Tukey algorithm, and NTT.",
    href: "/learn",
    accent: "blue",
  },
  {
    title: "Trace",
    description:
      "Step through recursive and iterative FFT with live variable inspection and highlighted code.",
    href: "/trace",
    accent: "purple",
  },
  {
    title: "Practice",
    description:
      "Built-in Python/C++ editor, Codeforces problem links, and a live naive-vs-FFT benchmark.",
    href: "/practice",
    accent: "cyan",
  },
  {
    title: "Resources",
    description:
      "Competition-ready code templates, key formulas, and common implementation pitfalls.",
    href: "/resources",
    accent: "emerald",
  },
];

export const ASSIGNMENT_MAP: { left: string; right: string; href: string }[] = [
  { left: "Tutorial", right: "Learn", href: "/learn" },
  { left: "Examples", right: "Trace", href: "/trace" },
  { left: "Practice Problems", right: "Practice", href: "/practice" },
  { left: "Citations", right: "Citations", href: "/citations" },
];

export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemCardData = {
  title: string;
  difficulty: Difficulty;
  tags: string[];
  blurb: string;
  href: string;
};

export const PROBLEM_CARDS: ProblemCardData[] = [
  {
    title: "CF 1096G — Lucky Tickets",
    difficulty: "Medium",
    tags: ["fft", "convolution", "counting"],
    blurb:
      "Count pairs of length-n strings whose digit sums are equal. Model as polynomial multiplication to count matching digit-sum pairs in O(n log n).",
    href: "https://codeforces.com/problemset/problem/1096/G",
  },
  {
    title: "CF 632E — Thief in a Shop",
    difficulty: "Hard",
    tags: ["fft", "ntt", "knapsack"],
    blurb:
      "Determine which total values can be achieved by choosing exactly k items. Use FFT/NTT to accelerate the polynomial exponentiation for the knapsack.",
    href: "https://codeforces.com/problemset/problem/632/E",
  },
  {
    title: "CF 755G — PolandBall and Many Other Balls",
    difficulty: "Hard",
    tags: ["ntt", "polynomial", "matrix-exponentiation"],
    blurb:
      "Count groupings of n balls in k ways. Raise a 2×2 matrix of generating-function polynomials to the n-th power via binary doubling with NTT over mod 998244353.",
    href: "https://codeforces.com/problemset/problem/755/G",
  },
];

export type ResourceSection = {
  title: string;
  description: string;
  bullets: string[];
  accent: Accent;
};

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    title: "Templates",
    description: "Reusable code snippets for the most common patterns.",
    bullets: [
      "Recursive FFT (C++)",
      "Iterative FFT with bit-reversal (C++)",
      "NTT mod 998244353 (C++)",
      "Python FFT using cmath",
    ],
    accent: "blue",
  },
  {
    title: "Key Formulas",
    description: "Compact reference for the formulas you'll reach for most often.",
    bullets: [
      "DFT: X_k = Σ x_n · e^{-2πikn/N}",
      "Butterfly: X[k] = E[k] + ω^k · O[k]",
      "Convolution theorem: IFFT(FFT(a) · FFT(b))",
      "Twiddle factor: ω_N^k = e^{-2πik/N}",
    ],
    accent: "purple",
  },
  {
    title: "References",
    description: "External readings and links that go deeper on the topic.",
    bullets: [
      "CLRS §30 — Polynomials and the FFT",
      "cp-algorithms.com/algebra/fft.html",
      "Competitive Programmer's Handbook §24",
      "Nayuki FFT project",
    ],
    accent: "cyan",
  },
  {
    title: "Common Mistakes",
    description: "Pitfalls worth knowing about before you hit them in a contest.",
    bullets: [
      "Not padding array to next power of 2 ≥ 2(n−1)",
      "Using floating-point for NTT (must use modular integers)",
      "Off-by-one: degree-n × degree-m → n+m+1 coefficients",
      "Forgetting to divide by N after inverse FFT",
    ],
    accent: "emerald",
  },
];

export type TraceVariable = { name: string; value: string };

export const FAKE_TRACE_VARIABLES: TraceVariable[] = [
  { name: "n", value: "8" },
  { name: "depth", value: "0" },
  { name: "array", value: "[1, 1, 0, 0, 0, 0, 0, 0]" },
  { name: "omega_k", value: "—" },
  { name: "step", value: "call" },
];

export type TestCase = { input: string; expected: string; status: string };

export const FAKE_TEST_CASES: TestCase[] = [
  {
    input: "3 2\n1 2 3\n4 5",
    expected: "4 13 22 15",
    status: "—",
  },
  {
    input: "2 2\n1 1\n1 1",
    expected: "1 2 1",
    status: "—",
  },
  {
    input: "4 4\n1 0 0 1\n1 0 0 1",
    expected: "1 0 0 2 0 0 1",
    status: "—",
  },
];

export const VISUAL_TUTORIAL_MODULES = [
  {
    title: "The Problem",
    subtitle: "Naive O(n²) polynomial multiplication",
  },
  {
    title: "Roots of Unity",
    subtitle: "Complex numbers on the unit circle",
  },
  {
    title: "Cooley-Tukey FFT",
    subtitle: "Divide and conquer in frequency space",
  },
  {
    title: "NTT & Applications",
    subtitle: "Modular arithmetic and CP use cases",
  },
];
