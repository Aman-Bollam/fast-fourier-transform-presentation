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
    <div className="space-y-4">
      {FORMULAS.map((f) => (
        <div
          key={f.name}
          className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 space-y-3"
        >
          <h4 className="text-sm font-semibold text-slate-200">{f.name}</h4>
          <div className="rounded-lg bg-slate-950/60 border border-slate-800 px-4 py-3 overflow-x-auto">
            <KaTeX math={f.latex} displayMode className="text-slate-100" />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
