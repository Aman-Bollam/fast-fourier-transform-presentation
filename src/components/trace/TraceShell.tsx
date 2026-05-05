"use client";

import { useState } from "react";
import {
  generateRecursiveTrace,
  generateIterativeTrace,
  getVariablesForStep,
  RECURSIVE_CODE,
  ITERATIVE_CODE,
  RECURSIVE_ANNOTATIONS,
  ITERATIVE_ANNOTATIONS,
  type TraceMode,
} from "@/lib/fftTrace";
import { TraceTabBar } from "./TraceTabBar";
import { TraceVisualization } from "./TraceVisualization";
import { TraceCodePanel } from "./TraceCodePanel";
import { TraceLegend } from "./TraceLegend";
import { VariablePanel } from "./VariablePanel";
import { TraceControls } from "./TraceControls";

// Pre-compute traces at module level to avoid re-generation on re-render
const RECURSIVE_STEPS = generateRecursiveTrace();
const ITERATIVE_STEPS = generateIterativeTrace();

export function TraceShell() {
  const [mode, setMode] = useState<TraceMode>("recursive");
  const [stepIndex, setStepIndex] = useState(0);

  const steps = mode === "recursive" ? RECURSIVE_STEPS : ITERATIVE_STEPS;
  const currentStep = steps[stepIndex];
  const variables = getVariablesForStep(currentStep, mode);

  function handleModeChange(newMode: TraceMode) {
    setMode(newMode);
    setStepIndex(0);
  }

  const annotations = mode === "recursive" ? RECURSIVE_ANNOTATIONS : ITERATIVE_ANNOTATIONS;

  const BLURBS = {
    recursive: {
      summary: "The recursive FFT (Cooley-Tukey) solves DFT in O(n log n) by divide-and-conquer. It splits the input in half, recurses on each half independently, then merges the results with a butterfly operation.",
      phases: [
        { label: "Split", desc: "Separate even-indexed and odd-indexed coefficients into two halves." },
        { label: "Recurse", desc: "Recursively compute the DFT of each half — the tree reaches depth log₂ n." },
        { label: "Butterfly", desc: "Combine: X[k] = E[k] + ω·O[k] and X[k+n/2] = E[k] − ω·O[k], where ω = e^(−2πi/n)." },
      ],
      input: "Input: [1, 1, 0, 0, 0, 0, 0, 0]  (coefficients of 1+x, zero-padded to 8 points)",
    },
    iterative: {
      summary: "The iterative FFT performs the same computation bottom-up without recursion. It first reorders elements by bit-reversed index, then runs log₂ n butterfly passes in-place — same O(n log n) work, better cache behaviour.",
      phases: [
        { label: "Bit-reversal", desc: "Permute the array so element at index i moves to bit-reverse(i). This is the order the recursive version would reach the base cases." },
        { label: "Pass len=2", desc: "First butterfly pass: combine adjacent pairs using ω = e^(−2πi/2) = −1." },
        { label: "Passes ×log n", desc: "Repeat with pass lengths 4, 8, …, n, doubling the sub-problem size each round." },
      ],
      input: "Input: [1, 1, 0, 0, 0, 0, 0, 0]  (same 8-point example as recursive tab)",
    },
  } as const;

  const blurb = BLURBS[mode];

  return (
    <div className="space-y-5 pb-20">
      <TraceTabBar mode={mode} onModeChange={handleModeChange} />

      {/* Algorithm blurb */}
      <div className="rounded-2xl border border-cyan-500/20 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.96))] p-6 shadow-[0_18px_55px_rgba(2,6,23,0.45)] backdrop-blur space-y-5">
        <p className="max-w-4xl text-sm leading-relaxed text-slate-300">{blurb.summary}</p>
        <div className="grid gap-4 lg:grid-cols-3">
          {blurb.phases.map((phase, i) => (
            <div
              key={phase.label}
              className="min-h-32 rounded-xl border border-slate-700/80 bg-slate-950/35 p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)]"
            >
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white shadow-[0_0_24px_rgba(59,130,246,0.45)]">
                {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{phase.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{phase.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="rounded-xl border border-slate-700/70 bg-slate-950/30 px-4 py-3 text-xs font-mono text-slate-400">{blurb.input}</p>
      </div>

      <TraceLegend mode={mode} activeKind={currentStep.kind} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
        <TraceVisualization step={currentStep} mode={mode} />
        <div className="space-y-4">
          {/* Step explanation panel */}
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/45 p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Step Explanation</p>
            <p className="text-base font-semibold text-slate-100">{currentStep.stepLabel}</p>
            <p className="text-sm leading-relaxed text-slate-400">{currentStep.explanation}</p>
          </div>
          <VariablePanel variables={variables} />
        </div>
      </div>

      <TraceCodePanel
        code={mode === "recursive" ? RECURSIVE_CODE : ITERATIVE_CODE}
        highlightLine={currentStep.codeLineIndex}
        annotations={annotations}
        stepKind={currentStep.kind}
      />

      <TraceControls
        stepIndex={stepIndex}
        totalSteps={steps.length}
        onPrev={() => setStepIndex(i => Math.max(0, i - 1))}
        onNext={() => setStepIndex(i => Math.min(steps.length - 1, i + 1))}
        onReset={() => setStepIndex(0)}
      />
    </div>
  );
}
