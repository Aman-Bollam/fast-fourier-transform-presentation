import { KaTeX } from "@/components/shared/KaTeX";
import { Module1NaiveMultiply } from "./Module1NaiveMultiply";
import { Module2UnityCircle } from "./Module2UnityCircle";
import { Module3RecursionTree } from "./Module3RecursionTree";
import { Module4NTT } from "./Module4NTT";

// ── Shared helpers ────────────────────────────────────────────────────────────

function DisplayMath({ math }: { math: string }) {
  return (
    <div className="my-4 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 overflow-x-auto text-center">
      <KaTeX math={math} displayMode className="text-slate-200" />
    </div>
  );
}

function InlineMath({ math }: { math: string }) {
  return <KaTeX math={math} className="text-slate-200" />;
}

/** Small "where: variable = meaning" legend rendered below an equation */
function VarLegend({ vars }: { vars: { sym: string; meaning: string }[] }) {
  return (
    <div className="mb-4 rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Where</p>
      <ul className="space-y-1">
        {vars.map(({ sym, meaning }) => (
          <li key={sym} className="flex items-baseline gap-2 text-sm">
            <span className="font-mono text-blue-300 shrink-0 min-w-[7rem]">
              <KaTeX math={sym} />
            </span>
            <span className="text-slate-400">{meaning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Amber-tinted box for a concrete worked example */
function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl border border-amber-800/40 bg-amber-950/20 px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-3">
        Worked Example — {title}
      </p>
      <div className="space-y-2 text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

function Step({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0 mt-0.5 rounded bg-amber-800/30 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300 uppercase tracking-wide">
        {label}
      </span>
      <span>{children}</span>
    </div>
  );
}

/** Label that appears above an embedded interactive module */
function InteractiveLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 mb-3 flex items-center gap-2">
      <span className="inline-block size-1.5 rounded-full bg-blue-400" />
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">{children}</p>
    </div>
  );
}

// ── Article ───────────────────────────────────────────────────────────────────

export function FFTArticle() {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 sm:p-8 max-w-none">
      <header className="mb-8 pb-6 border-b border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
          Written Article
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
          Fast Fourier Transform — A Complete Guide
        </h2>
        <p className="mt-3 text-slate-400 leading-relaxed max-w-2xl">
          From naive polynomial multiplication to the Cooley-Tukey algorithm,
          Number Theoretic Transforms, and practical competitive programming
          techniques.
        </p>
      </header>

      {/* ── Section 1 ── */}
      <h3 className="text-slate-100 font-semibold mt-8 mb-3 text-lg">1. Introduction</h3>
      <p className="leading-relaxed text-slate-300">
        Polynomial multiplication appears constantly in competitive programming —
        computing convolutions, string matching via correlation, counting lattice
        paths, and combinatorial enumeration. Given two polynomials{" "}
        <InlineMath math="A(x) = \sum_{i=0}^{n-1} a_i x^i" /> and{" "}
        <InlineMath math="B(x) = \sum_{j=0}^{m-1} b_j x^j" />, their product{" "}
        <InlineMath math="C(x)" /> has degree <InlineMath math="n + m - 2" /> and
        the <InlineMath math="k" />-th coefficient is:
      </p>
      <DisplayMath math="c_k = \sum_{j=0}^{k} a_j \, b_{k-j}" />
      <VarLegend
        vars={[
          { sym: "a_j",    meaning: "j-th coefficient of polynomial A" },
          { sym: "b_{k-j}", meaning: "(k−j)-th coefficient of polynomial B" },
          { sym: "c_k",    meaning: "k-th coefficient of the product C" },
        ]}
      />
      <p className="leading-relaxed text-slate-300">
        This is a convolution sum. The naive algorithm computes every pair{" "}
        <InlineMath math="(a_j,\, b_{k-j})" />, costing{" "}
        <InlineMath math="O(n^2)" /> operations total. The animation below
        makes that cost concrete — watch every individual product get computed
        one at a time before accumulating into the result.
      </p>

      <Example title="naive multiplication — (1 + 2x + 3x²) × (4 + 5x)">
        <Step label="A">
          Coefficients of A: <code className="font-mono text-blue-300">[1, 2, 3]</code>
          &nbsp;→&nbsp;<InlineMath math="a_0=1,\ a_1=2,\ a_2=3" />
        </Step>
        <Step label="B">
          Coefficients of B: <code className="font-mono text-cyan-300">[4, 5]</code>
          &nbsp;→&nbsp;<InlineMath math="b_0=4,\ b_1=5" />
        </Step>
        <Step label="c₀">
          <InlineMath math="c_0 = a_0 b_0 = 1 \cdot 4 = 4" />
        </Step>
        <Step label="c₁">
          <InlineMath math="c_1 = a_0 b_1 + a_1 b_0 = 1\cdot5 + 2\cdot4 = 13" />
        </Step>
        <Step label="c₂">
          <InlineMath math="c_2 = a_1 b_1 + a_2 b_0 = 2\cdot5 + 3\cdot4 = 22" />
        </Step>
        <Step label="c₃">
          <InlineMath math="c_3 = a_2 b_1 = 3\cdot5 = 15" />
        </Step>
        <Step label="result">
          <code className="font-mono text-emerald-300">[4, 13, 22, 15]</code>
          &nbsp;→&nbsp;<InlineMath math="4 + 13x + 22x^2 + 15x^3" />.
          Six products, computed explicitly. This is the O(n²) cost.
        </Step>
      </Example>

      {/* ── Module 1 ── */}
      <InteractiveLabel>Interactive — Step through the naive algorithm</InteractiveLabel>
      <Module1NaiveMultiply />

      <p className="leading-relaxed text-slate-300 mt-6">
        FFT reduces this to{" "}
        <InlineMath math="O(n \log n)" /> by exploiting the convolution theorem:
        pointwise multiplication in the frequency domain equals convolution in the
        time domain. To understand why, we first need the Discrete Fourier Transform.
      </p>

      {/* ── Section 2 ── */}
      <h3 className="text-slate-100 font-semibold mt-10 mb-3 text-lg">2. The Discrete Fourier Transform</h3>
      <p className="leading-relaxed text-slate-300">
        The Discrete Fourier Transform (DFT) of a length-<InlineMath math="n" />{" "}
        sequence evaluates the associated polynomial at the{" "}
        <InlineMath math="n" />-th <em>roots of unity</em> — the{" "}
        <InlineMath math="n" /> complex numbers{" "}
        <InlineMath math="\omega_n^0, \omega_n^1, \ldots, \omega_n^{n-1}" /> that
        satisfy <InlineMath math="z^n = 1" />. The{" "}
        <InlineMath math="k" />-th DFT output is:
      </p>
      <DisplayMath math="X_k \;=\; \sum_{j=0}^{n-1} x_j \cdot \omega_n^{jk}, \qquad k = 0, 1, \ldots, n-1" />
      <VarLegend
        vars={[
          { sym: "n",              meaning: "length of the input (must be a power of 2 for FFT)" },
          { sym: "x_j",            meaning: "j-th input sample — the j-th polynomial coefficient" },
          { sym: "X_k",            meaning: "k-th output — the polynomial evaluated at ω_n^k" },
          { sym: "\\omega_n",      meaning: "e^{2πi/n} — the primitive n-th root of unity" },
          { sym: "\\omega_n^{jk}", meaning: "e^{2πi·jk/n} — the twiddle factor at position (j, k)" },
        ]}
      />
      <p className="leading-relaxed text-slate-300">
        The <InlineMath math="n" /> evaluation points are equally spaced around
        the unit circle in the complex plane, each at angle{" "}
        <InlineMath math="2\pi k / n" /> radians. The interactive diagram below
        makes this concrete — select different values of{" "}
        <InlineMath math="n" /> and click any point to see its exact complex value.
      </p>

      {/* ── Module 2 ── */}
      <InteractiveLabel>Interactive — Explore the n-th roots of unity</InteractiveLabel>
      <Module2UnityCircle />

      <p className="leading-relaxed text-slate-300 mt-6">
        The inverse DFT recovers the original sequence from its frequency
        representation:
      </p>
      <DisplayMath math="x_j \;=\; \frac{1}{n} \sum_{k=0}^{n-1} X_k \cdot \omega_n^{-jk}" />
      <VarLegend
        vars={[
          { sym: "1/n",             meaning: "required scaling — always divide by n after the inverse transform" },
          { sym: "\\omega_n^{-jk}", meaning: "e^{-2πi·jk/n} — same roots traversed in the opposite direction" },
        ]}
      />

      <Example title="DFT of [1, 1, 0, 0] by hand (n = 4)">
        <Step label="setup">
          Input <InlineMath math="x = [1, 1, 0, 0]" />. The 4th roots of unity
          are <InlineMath math="\omega_4^0=1,\ \omega_4^1=i,\ \omega_4^2=-1,\ \omega_4^3=-i" />.
        </Step>
        <Step label="X₀">
          <InlineMath math="X_0 = 1\cdot1 + 1\cdot1 + 0 + 0 = 2" />
        </Step>
        <Step label="X₁">
          <InlineMath math="X_1 = 1\cdot1 + 1\cdot i + 0 + 0 = 1+i" />
        </Step>
        <Step label="X₂">
          <InlineMath math="X_2 = 1\cdot1 + 1\cdot(-1) + 0 + 0 = 0" />
        </Step>
        <Step label="X₃">
          <InlineMath math="X_3 = 1\cdot1 + 1\cdot(-i) + 0 + 0 = 1-i" />
        </Step>
        <Step label="result">
          <InlineMath math="\hat{A} = [2,\ 1+i,\ 0,\ 1-i]" />. Notice{" "}
          <InlineMath math="X_2 = 0" /> because <InlineMath math="\omega_4^2 = -1" />{" "}
          is a root of <InlineMath math="1+x" />. Try selecting n=4 in the
          diagram above and clicking <InlineMath math="\omega^2" /> to see why.
        </Step>
      </Example>

      {/* ── Section 3 ── */}
      <h3 className="text-slate-100 font-semibold mt-10 mb-3 text-lg">3. The Cooley-Tukey FFT Algorithm</h3>
      <p className="leading-relaxed text-slate-300">
        Computing the DFT naively from the formula costs{" "}
        <InlineMath math="O(n^2)" /> — one inner sum per output. The Cooley-Tukey
        algorithm (1965) achieves <InlineMath math="O(n \log n)" /> by
        divide-and-conquer. The key observation is that any polynomial can be
        split by its even and odd indexed coefficients:
      </p>
      <DisplayMath math="A(x) \;=\; A_{\text{even}}(x^2) \;+\; x \cdot A_{\text{odd}}(x^2)" />
      <VarLegend
        vars={[
          { sym: "A_{\\text{even}}(y)", meaning: "polynomial from even-indexed coefficients: a₀ + a₂y + a₄y² + …" },
          { sym: "A_{\\text{odd}}(y)",  meaning: "polynomial from odd-indexed coefficients: a₁ + a₃y + a₅y² + …" },
          { sym: "x^2",                 meaning: "substituting x² evaluates both halves at the same n/2 points" },
        ]}
      />

      <Example title="even/odd split on A = [1, 2, 3, 4, 5, 6]">
        <Step label="even">
          Indices 0, 2, 4 → <InlineMath math="A_{\text{even}}(y) = 1 + 3y + 5y^2" />
        </Step>
        <Step label="odd">
          Indices 1, 3, 5 → <InlineMath math="A_{\text{odd}}(y) = 2 + 4y + 6y^2" />
        </Step>
        <Step label="verify">
          <InlineMath math="A_{\text{even}}(x^2) + x\cdot A_{\text{odd}}(x^2) = (1+3x^2+5x^4) + x(2+4x^2+6x^4)" />{" "}
          <InlineMath math="= 1+2x+3x^2+4x^3+5x^4+6x^5\ \checkmark" />
        </Step>
        <Step label="key">
          Each half has length 3 instead of 6 — the problem is halved. Recurse,
          then combine with a butterfly step. The recursion tree below shows
          every level of this splitting for an 8-element input.
        </Step>
      </Example>

      {/* ── Module 3 ── */}
      <InteractiveLabel>Interactive — Cooley-Tukey recursion tree (n = 8)</InteractiveLabel>
      <Module3RecursionTree />

      <p className="leading-relaxed text-slate-300 mt-6">
        The key identity <InlineMath math="(\omega_n^k)^2 = \omega_{n/2}^k" />{" "}
        means both halves of the split share the same{" "}
        <InlineMath math="n/2" /> evaluation points. So the results of the two
        recursive calls can be reused when combining. This combine step — the
        butterfly — is the heart of the FFT:
      </p>
      <DisplayMath math="X[k] \;=\; E[k] \;+\; \omega_n^k \cdot O[k]" />
      <DisplayMath math="X\!\left[k + \tfrac{n}{2}\right] \;=\; E[k] \;-\; \omega_n^k \cdot O[k]" />
      <VarLegend
        vars={[
          { sym: "E[k]",        meaning: "k-th output of the FFT of the even half" },
          { sym: "O[k]",        meaning: "k-th output of the FFT of the odd half" },
          { sym: "\\omega_n^k", meaning: "twiddle factor — rotates O[k] before combining" },
          { sym: "X[k]",        meaning: "upper butterfly output (k-th frequency bin)" },
          { sym: "X[k+n/2]",    meaning: "lower butterfly output ((k+n/2)-th frequency bin)" },
        ]}
      />
      <p className="leading-relaxed text-slate-300">
        One butterfly computes two outputs from two inputs in{" "}
        <InlineMath math="O(1)" />. There are <InlineMath math="n/2" />{" "}
        butterflies per level and <InlineMath math="\log_2 n" /> levels in the
        tree, giving <InlineMath math="T(n) = 2T(n/2) + O(n) = O(n \log n)" />.
      </p>

      <Example title="one butterfly pass — n = 4, input [1, 1, 0, 0]">
        <Step label="setup">
          After recursing: <InlineMath math="E = \text{FFT}([1,0]) = [1,1]" />,{" "}
          <InlineMath math="O = \text{FFT}([1,0]) = [1,1]" />.
          Twiddle factors: <InlineMath math="\omega_4^0=1,\ \omega_4^1=i" />.
        </Step>
        <Step label="k=0↑">
          <InlineMath math="X[0] = E[0] + \omega_4^0\cdot O[0] = 1 + 1 = 2" />
        </Step>
        <Step label="k=0↓">
          <InlineMath math="X[2] = E[0] - \omega_4^0\cdot O[0] = 1 - 1 = 0" />
        </Step>
        <Step label="k=1↑">
          <InlineMath math="X[1] = E[1] + \omega_4^1\cdot O[1] = 1 + i = 1+i" />
        </Step>
        <Step label="k=1↓">
          <InlineMath math="X[3] = E[1] - \omega_4^1\cdot O[1] = 1 - i = 1-i" />
        </Step>
        <Step label="result">
          <InlineMath math="[2,\ 1+i,\ 0,\ 1-i]" /> — matches the by-hand DFT
          from Section 2. Both outputs at each k reuse the same E[k] and O[k],
          computed only once.
        </Step>
      </Example>

      {/* ── Section 4 ── */}
      <h3 className="text-slate-100 font-semibold mt-10 mb-3 text-lg">4. Polynomial Multiplication via FFT</h3>
      <p className="leading-relaxed text-slate-300">
        The convolution theorem connects the DFT to polynomial multiplication:
      </p>
      <DisplayMath math="(a \ast b) \;=\; \mathcal{F}^{-1}\!\left(\mathcal{F}(a) \cdot \mathcal{F}(b)\right)" />
      <VarLegend
        vars={[
          { sym: "\\mathcal{F}(a)",   meaning: "the DFT (forward FFT) of coefficient array a" },
          { sym: "\\cdot",            meaning: "pointwise (element-by-element) multiplication" },
          { sym: "\\mathcal{F}^{-1}", meaning: "the inverse DFT (IFFT)" },
          { sym: "a \\ast b",         meaning: "the convolution of a and b — the product polynomial's coefficients" },
        ]}
      />
      <p className="leading-relaxed text-slate-300">Five steps to multiply two polynomials with FFT:</p>
      <ol className="mt-3 space-y-2 text-slate-300 list-decimal list-inside leading-relaxed">
        <li>
          <strong className="text-slate-200">Pad to power-of-2 size.</strong>{" "}
          Result degree is <InlineMath math="\deg A + \deg B" />, so pad both
          to the next power of 2 ≥ <InlineMath math="\deg A + \deg B + 1" />.
        </li>
        <li>
          <strong className="text-slate-200">FFT both inputs.</strong> Compute{" "}
          <InlineMath math="\hat{A} = \text{FFT}(A)" /> and{" "}
          <InlineMath math="\hat{B} = \text{FFT}(B)" /> in{" "}
          <InlineMath math="O(n \log n)" /> each.
        </li>
        <li>
          <strong className="text-slate-200">Pointwise multiply.</strong>{" "}
          <InlineMath math="\hat{C}[k] = \hat{A}[k] \cdot \hat{B}[k]" /> for
          each <InlineMath math="k" /> — this is <InlineMath math="O(n)" />.
        </li>
        <li>
          <strong className="text-slate-200">Inverse FFT.</strong>{" "}
          <InlineMath math="C = \text{IFFT}(\hat{C})" /> in{" "}
          <InlineMath math="O(n \log n)" />.
        </li>
        <li>
          <strong className="text-slate-200">Divide by n.</strong> The IFFT
          includes a <InlineMath math="1/n" /> factor — apply it to every
          coefficient.
        </li>
      </ol>

      <Example title="full FFT multiplication — [1, 2, 3] × [4, 5]">
        <Step label="pad">
          Product has 4 coefficients. Pad to n=4:{" "}
          <InlineMath math="A=[1,2,3,0],\ B=[4,5,0,0]" />.
        </Step>
        <Step label="FFT A">
          <InlineMath math="\hat{A} = [6,\ -2+2i,\ -2,\ -2-2i]" />
        </Step>
        <Step label="FFT B">
          <InlineMath math="\hat{B} = [9,\ 4-5i,\ -1,\ 4+5i]" />
        </Step>
        <Step label="pointwise ×">
          <InlineMath math="\hat{C} = [54,\ 2+18i,\ 2,\ 2-18i]" />
        </Step>
        <Step label="IFFT ÷ 4">
          <InlineMath math="C = [4,\ 13,\ 22,\ 15]" />
        </Step>
        <Step label="result">
          <code className="font-mono text-emerald-300">[4, 13, 22, 15]</code> — same answer as
          the naive calculation from Section 1, but the FFT approach used
          <InlineMath math="O(n \log n)" /> work instead of{" "}
          <InlineMath math="O(n^2)" />.
        </Step>
      </Example>

      {/* ── Section 5 ── */}
      <h3 className="text-slate-100 font-semibold mt-10 mb-3 text-lg">5. Competitive Programming Notes</h3>
      <ul className="mt-3 space-y-3 text-slate-300">
        <li className="flex items-start gap-2">
          <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
          <span>
            <strong className="text-slate-200">Floating-point precision.</strong>{" "}
            Standard FFT uses <code className="font-mono text-slate-300">complex&lt;double&gt;</code>.
            Rounding errors corrupt results when coefficients are large. Use{" "}
            <code className="font-mono text-slate-300">long double</code> or switch
            to NTT for exact integer arithmetic.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
          <span>
            <strong className="text-slate-200">Iterative bit-reversal FFT.</strong>{" "}
            Recursive Cooley-Tukey has large constant factors. Production
            implementations use an iterative bottom-up approach with a
            bit-reversal permutation to reorder inputs in-place, improving cache
            performance significantly. This is what the Trace page demonstrates.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
          <span>
            <strong className="text-slate-200">Array padding.</strong> Always
            pad to the next power of 2 ≥ <InlineMath math="n + m - 1" />.
            Under-padding causes circular aliasing — high-degree coefficients wrap
            around and corrupt lower ones.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
          <span>
            <strong className="text-slate-200">NTT for integer problems.</strong>{" "}
            When answers must be computed modulo a prime, use the Number Theoretic
            Transform. It replaces complex roots of unity with modular primitive
            roots, giving exact integer results with no floating-point error. The
            most common modulus is 998244353.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
          <span>
            <strong className="text-slate-200">Crossover point.</strong> Naive
            multiplication is faster for small polynomials (roughly{" "}
            <InlineMath math="n \lesssim 64" />) due to FFT&apos;s higher constant
            factor.
          </span>
        </li>
      </ul>

      {/* ── Module 4 ── */}
      <InteractiveLabel>Deep dive — Number Theoretic Transform (NTT)</InteractiveLabel>
      <Module4NTT />
    </article>
  );
}
