import { KaTeX } from "@/components/shared/KaTeX";

export function Module4NTT() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 border-l-4 border-l-cyan-400 flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">
          Module 4 — Number Theoretic Transform (NTT)
        </h3>
        <p className="text-sm text-slate-400 mt-1 leading-relaxed">
          NTT is a variant of FFT that works over modular arithmetic instead of
          complex numbers. Instead of complex roots of unity, we use primitive
          roots of a prime modulus — giving exact integer results with no
          floating-point precision issues.
        </p>
      </div>

      <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 px-4 py-3 space-y-1">
        <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">
          Most common NTT prime
        </p>
        <p className="text-sm text-slate-300 font-mono">
          998244353 = 119 × 2²³ + 1
        </p>
        <p className="text-xs text-slate-500">
          A Fermat prime with primitive root g = 3. Supports transforms up to
          size 2²³ ≈ 8 million.
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3">
        <p className="text-xs text-slate-500 mb-2">Primitive root of unity in NTT:</p>
        <div className="flex justify-center">
          <KaTeX
            math="\omega = g^{(p-1)/n} \bmod p"
            displayMode={true}
            className="text-cyan-300"
          />
        </div>
        <p className="text-xs text-slate-600 mt-1 text-center">
          where p = 998244353, g = 3, n = transform length (power of 2)
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
          Use cases in competitive programming
        </p>
        <ul className="space-y-1.5 text-sm text-slate-400">
          {[
            "Polynomial multiplication with integer coefficients",
            "Counting problems requiring modular arithmetic",
            "String convolution and pattern matching",
            "Subset sum convolution (AND-convolution, OR-convolution)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-950/30 px-4 py-3 space-y-1.5">
        <p className="text-xs font-semibold text-slate-300">NTT vs FFT — when to choose:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-cyan-900/40 bg-cyan-950/20 p-2">
            <p className="text-cyan-400 font-semibold mb-1">Use NTT when</p>
            <ul className="text-slate-400 space-y-0.5">
              <li>• Coefficients are integers</li>
              <li>• Answer needs to be mod p</li>
              <li>• Precision matters</li>
            </ul>
          </div>
          <div className="rounded-lg border border-cyan-900/40 bg-cyan-950/20 p-2">
            <p className="text-cyan-400 font-semibold mb-1">Use FFT when</p>
            <ul className="text-slate-400 space-y-0.5">
              <li>• Coefficients are real/complex</li>
              <li>• Need arbitrary modulus</li>
              <li>• Signal processing tasks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
