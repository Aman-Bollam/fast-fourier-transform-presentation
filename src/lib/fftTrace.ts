export type TraceMode = "recursive" | "iterative";

export interface Complex {
  re: number;
  im: number;
}

function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}
function sub(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}
function mul(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}
function omega(k: number, n: number): Complex {
  const angle = -2 * Math.PI * k / n;
  return { re: Math.cos(angle), im: Math.sin(angle) };
}
function fmtComplex(c: Complex): string {
  const re = c.re.toFixed(3);
  const im = Math.abs(c.im).toFixed(3);
  const sign = c.im >= 0 ? "+" : "−";
  if (Math.abs(c.im) < 1e-10) return re;
  return `${re} ${sign} ${im}i`;
}

// ─── Recursive ───────────────────────────────────────────────────────────────

export type RecursiveStepKind = "call" | "base" | "split" | "combine" | "return";

export interface RecursiveStep {
  kind: RecursiveStepKind;
  depth: number;
  subarray: Complex[];
  startIndex: number;
  callStackDepth: number;
  codeLineIndex: number;
  stepLabel: string;
  explanation: string;
  twiddleK?: number;
  twiddleFactor?: Complex;
  result?: Complex[];
}

export const RECURSIVE_CODE = `function fft(a, inv = false) {
  const n = a.length;
  if (n === 1) return a;           // base case
  const even = a.filter((_, i) => i % 2 === 0);
  const odd  = a.filter((_, i) => i % 2 !== 0);
  const E = fft(even, inv);
  const O = fft(odd,  inv);
  const out = new Array(n);
  for (let k = 0; k < n/2; k++) {
    const w = omega(k, n, inv);    // twiddle factor
    out[k]       = E[k] + w * O[k];
    out[k + n/2] = E[k] - w * O[k];
  }
  return out;
}`;

export function generateRecursiveTrace(): RecursiveStep[] {
  const INPUT: Complex[] = [1, 1, 0, 0, 0, 0, 0, 0].map(re => ({ re, im: 0 }));
  const steps: RecursiveStep[] = [];
  let callStackDepth = 0;

  function fftRec(arr: Complex[], depth: number, startIndex: number): Complex[] {
    callStackDepth++;
    steps.push({
      kind: "call",
      depth,
      subarray: [...arr],
      startIndex,
      callStackDepth,
      codeLineIndex: 0,
      stepLabel: `fft(n=${arr.length}, start=${startIndex})`,
      explanation: `Entering FFT on subarray of length ${arr.length} starting at index ${startIndex}. We will recursively split this into even- and odd-indexed elements.`,
    });

    if (arr.length === 1) {
      steps.push({
        kind: "base",
        depth,
        subarray: [...arr],
        startIndex,
        callStackDepth,
        codeLineIndex: 2,
        stepLabel: `Base case: n=1, return [${fmtComplex(arr[0])}]`,
        explanation: `Base case reached. A single-element array is already its own DFT: X[0] = x[0].`,
        result: [...arr],
      });
      callStackDepth--;
      return [...arr];
    }

    const even = arr.filter((_, i) => i % 2 === 0);
    const odd = arr.filter((_, i) => i % 2 !== 0);
    steps.push({
      kind: "split",
      depth,
      subarray: [...arr],
      startIndex,
      callStackDepth,
      codeLineIndex: 3,
      stepLabel: `Split n=${arr.length}: even=[${even.map(c => fmtComplex(c)).join(", ")}], odd=[${odd.map(c => fmtComplex(c)).join(", ")}]`,
      explanation: `Split into even-indexed coefficients [${even.map(c => fmtComplex(c)).join(", ")}] and odd-indexed [${odd.map(c => fmtComplex(c)).join(", ")}]. We recurse on each half.`,
    });

    const E = fftRec(even, depth + 1, startIndex);
    const O = fftRec(odd, depth + 1, startIndex + arr.length / 2);

    const out: Complex[] = new Array(arr.length);
    for (let k = 0; k < arr.length / 2; k++) {
      const w = omega(k, arr.length);
      const wO = mul(w, O[k]);
      steps.push({
        kind: "combine",
        depth,
        subarray: [...arr],
        startIndex,
        callStackDepth,
        codeLineIndex: 9,
        twiddleK: k,
        twiddleFactor: w,
        stepLabel: `Butterfly k=${k}: ω^${k}_${arr.length} · O[${k}]`,
        explanation: `Butterfly operation at k=${k}. Twiddle factor ω^${k}_${arr.length} = ${fmtComplex(w)}. X[${k}] = E[${k}] + ω·O[${k}] = ${fmtComplex(add(E[k], wO))}. X[${k + arr.length / 2}] = E[${k}] - ω·O[${k}] = ${fmtComplex(sub(E[k], wO))}.`,
      });
      out[k] = add(E[k], wO);
      out[k + arr.length / 2] = sub(E[k], wO);
    }

    steps.push({
      kind: "return",
      depth,
      subarray: [...arr],
      startIndex,
      callStackDepth,
      codeLineIndex: 12,
      result: [...out],
      stepLabel: `Return from fft(n=${arr.length}, start=${startIndex})`,
      explanation: `Returning combined result of length ${arr.length} for subproblem at depth ${depth}: [${out.slice(0, 4).map(c => fmtComplex(c)).join(", ")}${out.length > 4 ? ", ..." : ""}].`,
    });

    callStackDepth--;
    return out;
  }

  fftRec(INPUT, 0, 0);
  return steps;
}

// ─── Iterative ────────────────────────────────────────────────────────────────

export type IterativeStepKind = "bit_reverse" | "butterfly_op";

export interface IterativeStep {
  kind: IterativeStepKind;
  array: Complex[];
  activeIndices: [number, number] | null;
  passLength?: number;
  twiddleFactor?: Complex;
  codeLineIndex: number;
  stepLabel: string;
  explanation: string;
}

export const ITERATIVE_CODE = `function fftIterative(a) {
  const n = a.length;
  // Bit-reversal permutation
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) [a[i], a[j]] = [a[j], a[i]];
  }
  // Butterfly passes
  for (let len = 2; len <= n; len <<= 1) {
    const w = omega(1, len);
    for (let i = 0; i < n; i += len) {
      let wk = { re: 1, im: 0 };
      for (let j = 0; j < len/2; j++, wk = mul(wk, w)) {
        const u = a[i+j], v = mul(wk, a[i+j+len/2]);
        a[i+j]         = add(u, v);
        a[i+j+len/2]   = sub(u, v);
      }
    }
  }
  return a;
}`;

export function generateIterativeTrace(): IterativeStep[] {
  const INPUT: Complex[] = [1, 1, 0, 0, 0, 0, 0, 0].map(re => ({ re, im: 0 }));
  const steps: IterativeStep[] = [];
  const a = [...INPUT];
  const n = 8;

  // Bit-reversal permutation
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [a[i], a[j]] = [a[j], a[i]];
      steps.push({
        kind: "bit_reverse",
        array: [...a],
        activeIndices: [i, j],
        codeLineIndex: 3,
        stepLabel: `Swap a[${i}] ↔ a[${j}]`,
        explanation: `Bit-reversal permutation: swap positions ${i} (binary ${i.toString(2).padStart(3, "0")}) and ${j} (binary ${j.toString(2).padStart(3, "0")}). This reorders elements so butterfly passes can proceed iteratively.`,
      });
    }
  }

  // Permutation complete step
  steps.push({
    kind: "bit_reverse",
    array: [...a],
    activeIndices: null,
    codeLineIndex: 3,
    stepLabel: `Bit-reversal permutation complete`,
    explanation: `All swaps complete. Array is now in bit-reversed order: [${a.map(c => fmtComplex(c)).join(", ")}]. Ready for butterfly passes.`,
  });

  // Butterfly passes
  for (let len = 2; len <= n; len <<= 1) {
    const wBase = omega(1, len);
    for (let i = 0; i < n; i += len) {
      let wk: Complex = { re: 1, im: 0 };
      for (let j = 0; j < len / 2; j++) {
        const u = a[i + j];
        const v = mul(wk, a[i + j + len / 2]);
        const idx1 = i + j;
        const idx2 = i + j + len / 2;
        steps.push({
          kind: "butterfly_op",
          array: [...a],
          activeIndices: [idx1, idx2],
          passLength: len,
          twiddleFactor: wk,
          codeLineIndex: 14,
          stepLabel: `Pass len=${len}: butterfly(${idx1}, ${idx2}), ω=${fmtComplex(wk)}`,
          explanation: `Pass length=${len}. Butterfly on indices ${idx1} and ${idx2}. u=a[${idx1}]=${fmtComplex(u)}, v=ω·a[${idx2}]=${fmtComplex(v)}. New a[${idx1}]=${fmtComplex(add(u, v))}, a[${idx2}]=${fmtComplex(sub(u, v))}.`,
        });
        a[i + j] = add(u, v);
        a[i + j + len / 2] = sub(u, v);
        wk = mul(wk, wBase);
      }
    }
  }

  return steps;
}

// ─── Annotations & color config ──────────────────────────────────────────────

/** Plain-English description for each line of the recursive FFT pseudocode. */
export const RECURSIVE_ANNOTATIONS: Record<number, string> = {
  0:  "Enter: FFT on subarray of length n",
  1:  "Store the current subarray length",
  2:  "Base case — single element is its own DFT",
  3:  "Extract even-indexed coefficients → A_even",
  4:  "Extract odd-indexed coefficients → A_odd",
  5:  "Recurse on the even half",
  6:  "Recurse on the odd half",
  7:  "Allocate combined output array",
  8:  "Butterfly combine loop  (k = 0 … n/2 − 1)",
  9:  "Compute twiddle factor  ω^k_n = e^{−2πik/n}",
  10: "Upper output:  X[k]     = E[k] + ω · O[k]",
  11: "Lower output:  X[k+n/2] = E[k] − ω · O[k]",
  12: "End butterfly loop",
  13: "Return combined DFT result up the call stack",
  14: "End of function",
};

/** Plain-English description for each line of the iterative FFT pseudocode. */
export const ITERATIVE_ANNOTATIONS: Record<number, string> = {
  0:  "Enter: iterative in-place FFT",
  1:  "Store array length",
  2:  "── Phase 1: bit-reversal permutation ──",
  3:  "Outer loop  i = 1 … n−1",
  4:  "Initialise bit mask at the highest bit",
  5:  "Walk down bits to find the bit-reversed index j",
  6:  "XOR in the current bit",
  7:  "Swap a[i] ↔ a[j]  when i < j",
  8:  "End bit-reversal loop",
  9:  "── Phase 2: butterfly passes ──",
  10: "Pass lengths: 2, 4, 8, …, n",
  11: "Base twiddle factor for this pass",
  12: "Loop over groups of size len",
  13: "Accumulated twiddle factor  wk = ω^j_len",
  14: "Inner butterfly loop  j = 0 … len/2 − 1",
  15: "Read pair:  u = a[upper],  v = wk · a[lower]",
  16: "Write upper:  a[upper] = u + v",
  17: "Write lower:  a[lower] = u − v",
  18: "End inner loop",
  19: "End group loop",
  20: "End pass loop",
  21: "Return transformed array",
  22: "End of function",
};

/** Tailwind classes keyed by step kind — used consistently in legend + code panel. */
export const STEP_COLORS: Record<string, {
  activeBg:     string;
  activeBorder: string;
  activeText:   string;
  chipBg:       string;
  chipBorder:   string;
  chipText:     string;
}> = {
  call: {
    activeBg:     "bg-blue-500/20",
    activeBorder: "border-l-blue-500",
    activeText:   "text-blue-200",
    chipBg:       "bg-blue-500/15",
    chipBorder:   "border-blue-500/50",
    chipText:     "text-blue-300",
  },
  base: {
    activeBg:     "bg-emerald-500/20",
    activeBorder: "border-l-emerald-500",
    activeText:   "text-emerald-200",
    chipBg:       "bg-emerald-500/15",
    chipBorder:   "border-emerald-500/50",
    chipText:     "text-emerald-300",
  },
  split: {
    activeBg:     "bg-amber-500/20",
    activeBorder: "border-l-amber-500",
    activeText:   "text-amber-200",
    chipBg:       "bg-amber-500/15",
    chipBorder:   "border-amber-500/50",
    chipText:     "text-amber-300",
  },
  combine: {
    activeBg:     "bg-purple-500/20",
    activeBorder: "border-l-purple-500",
    activeText:   "text-purple-200",
    chipBg:       "bg-purple-500/15",
    chipBorder:   "border-purple-500/50",
    chipText:     "text-purple-300",
  },
  return: {
    activeBg:     "bg-slate-500/20",
    activeBorder: "border-l-slate-400",
    activeText:   "text-slate-200",
    chipBg:       "bg-slate-700/40",
    chipBorder:   "border-slate-500/50",
    chipText:     "text-slate-300",
  },
  bit_reverse: {
    activeBg:     "bg-amber-500/20",
    activeBorder: "border-l-amber-500",
    activeText:   "text-amber-200",
    chipBg:       "bg-amber-500/15",
    chipBorder:   "border-amber-500/50",
    chipText:     "text-amber-300",
  },
  butterfly_op: {
    activeBg:     "bg-purple-500/20",
    activeBorder: "border-l-purple-500",
    activeText:   "text-purple-200",
    chipBg:       "bg-purple-500/15",
    chipBorder:   "border-purple-500/50",
    chipText:     "text-purple-300",
  },
};

/** Human-readable label for each step kind. */
export const STEP_LABELS: Record<string, string> = {
  call:         "call",
  base:         "base case",
  split:        "split",
  combine:      "butterfly",
  return:       "return",
  bit_reverse:  "bit-reverse",
  butterfly_op: "butterfly",
};

/** One-line description shown in the legend. */
export const STEP_DESCRIPTIONS: Record<string, string> = {
  call:         "Entering a recursive FFT subproblem",
  base:         "n = 1 — single element is its own DFT",
  split:        "Separating even & odd indexed coefficients",
  combine:      "Butterfly: combining two half-DFTs via twiddle factor",
  return:       "Returning the combined result up the call stack",
  bit_reverse:  "Reordering elements by their bit-reversed index",
  butterfly_op: "Butterfly: applying u+v / u−v in-place",
};

// ─── Shared exports ───────────────────────────────────────────────────────────

export type TraceStep = RecursiveStep | IterativeStep;

export interface FFTTraceResult {
  mode: TraceMode;
  steps: TraceStep[];
}

export interface TraceVariable {
  name: string;
  value: string;
  highlight?: boolean;
}

export function getVariablesForStep(step: TraceStep, mode: TraceMode): TraceVariable[] {
  if (mode === "recursive") {
    const s = step as RecursiveStep;
    return [
      { name: "n", value: String(s.subarray.length) },
      { name: "depth", value: String(s.depth) },
      { name: "start", value: String(s.startIndex) },
      { name: "stack depth", value: String(s.callStackDepth) },
      { name: "step kind", value: s.kind, highlight: true },
      ...(s.twiddleK !== undefined ? [{ name: "k", value: String(s.twiddleK) }] : []),
      ...(s.twiddleFactor !== undefined
        ? [{ name: "ω^k", value: fmtComplex(s.twiddleFactor), highlight: true }]
        : []),
    ];
  } else {
    const s = step as IterativeStep;
    return [
      { name: "step kind", value: s.kind },
      ...(s.passLength !== undefined ? [{ name: "pass length", value: String(s.passLength) }] : []),
      ...(s.activeIndices !== null
        ? [
            { name: "index 1", value: String(s.activeIndices[0]) },
            { name: "index 2", value: String(s.activeIndices[1]) },
          ]
        : []),
      ...(s.twiddleFactor !== undefined
        ? [{ name: "ω", value: fmtComplex(s.twiddleFactor), highlight: true }]
        : []),
    ];
  }
}
