import { KaTeX } from "@/components/shared/KaTeX";

interface FormulaItem {
  name: string;
  latex: string;
  description: string;
}

const FORMULAS: FormulaItem[] = [
  {
    name: "Discrete Fourier Transform",
    latex: "X_k = \\sum_{j=0}^{N-1} x_j \\cdot e^{-2\\pi i k j / N}",
    description:
      "Evaluates the input polynomial at the N-th roots of unity. Each output X_k is the polynomial evaluated at ω_N^k.",
  },
  {
    name: "Inverse DFT",
    latex: "x_j = \\frac{1}{N} \\sum_{k=0}^{N-1} X_k \\cdot e^{2\\pi i k j / N}",
    description:
      "Reconstructs the original sequence from its DFT. Note the 1/N scaling factor required after the inverse transform.",
  },
  {
    name: "Butterfly Operation",
    latex:
      "X[k] = E[k] + \\omega_N^k \\cdot O[k] \\qquad X[k+N/2] = E[k] - \\omega_N^k \\cdot O[k]",
    description:
      "Core of the Cooley-Tukey algorithm. Combines the DFT of even-indexed (E) and odd-indexed (O) sub-problems.",
  },
  {
    name: "Twiddle Factor",
    latex:
      "\\omega_N^k = e^{-2\\pi i k / N} = \\cos\\!\\left(\\frac{2\\pi k}{N}\\right) - i\\sin\\!\\left(\\frac{2\\pi k}{N}\\right)",
    description:
      "The complex root of unity used in the butterfly. These are the N-th roots of unity equally spaced on the unit circle.",
  },
  {
    name: "Convolution Theorem",
    latex:
      "(a \\ast b) = \\mathcal{F}^{-1}\\!\\left(\\mathcal{F}(a) \\cdot \\mathcal{F}(b)\\right)",
    description:
      "Convolution in the time domain equals pointwise multiplication in the frequency domain. This is why FFT enables O(n log n) polynomial multiplication.",
  },
];

export function FormulaReference() {
  return (
    <div className="space-y-3">
      {FORMULAS.map((f) => (
        <div
          key={f.name}
          className="grid gap-4 rounded-xl border border-cyan-500/20 bg-slate-950/45 p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur lg:grid-cols-[minmax(180px,0.7fr)_minmax(260px,1fr)_minmax(260px,1.2fr)] lg:items-center"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-500/35 bg-cyan-500/8 text-lg font-semibold text-cyan-300">
              Σ
            </span>
            <h4 className="text-sm font-semibold text-slate-200">{f.name}</h4>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-slate-950/60 px-4 py-3">
            <KaTeX math={f.latex} displayMode className="text-slate-100" />
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
