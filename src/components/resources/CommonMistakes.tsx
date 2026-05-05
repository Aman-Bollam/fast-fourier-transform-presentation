interface MistakeItem {
  title: string;
  explanation: string;
  fix: string;
}

const MISTAKES: MistakeItem[] = [
  {
    title: "Array not padded to a power of 2",
    explanation:
      "FFT requires arrays of length 2^k. Multiplying polynomials of degree n and m produces degree n+m, requiring 2^k ≥ n+m+1 elements.",
    fix: "Pad to the next power of 2 ≥ (len_a + len_b - 1) before calling FFT.",
  },
  {
    title: "Using floating-point arithmetic for NTT",
    explanation:
      "NTT operates over modular integers, not complex doubles. Using std::complex<double> with NTT will give wrong answers.",
    fix: "Use integer arrays with modular arithmetic. Replace omega with modular power: g^((MOD-1)/n) mod MOD.",
  },
  {
    title: "Off-by-one in result array size",
    explanation:
      "Multiplying a degree-n polynomial by a degree-m polynomial gives a degree-(n+m) polynomial, which has n+m+1 coefficients.",
    fix: "Allocate result array of size a.size() + b.size() - 1, then resize after IFFT.",
  },
  {
    title: "Forgetting to divide by N after inverse FFT",
    explanation:
      "The inverse DFT formula includes a 1/N scaling factor. Many iterative implementations omit this step.",
    fix: "After IFFT, divide every element by n: for (auto& x : a) x /= n;",
  },
  {
    title: "Not reducing mod p in each NTT butterfly step",
    explanation:
      "In NTT, intermediate products must be reduced mod p at each step to prevent 64-bit integer overflow.",
    fix: "Apply % MOD after every multiplication: v = (long long)wk * a[i+j+len/2] % MOD;",
  },
];

export function CommonMistakes() {
  return (
    <div className="space-y-3">
      {MISTAKES.map((m, i) => (
        <div
          key={i}
          className="grid gap-4 rounded-xl border border-cyan-500/20 bg-slate-950/45 p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:items-center"
        >
          <div className="flex items-start gap-4">
            <span className="mt-1 text-lg text-amber-300">⚠</span>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">{m.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{m.explanation}</p>
            </div>
          </div>
          <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-3">
            <span className="text-xs font-medium text-emerald-400">Fix: </span>
            <span className="text-xs text-emerald-300">{m.fix}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
