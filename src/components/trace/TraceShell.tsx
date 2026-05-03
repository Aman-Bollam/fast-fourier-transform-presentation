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
    <div className="space-y-6 pb-20">
      <TraceTabBar mode={mode} onModeChange={handleModeChange} />

      {/* Algorithm blurb */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed">{blurb.summary}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {blurb.phases.map((phase, i) => (
            <div key={phase.label} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">{phase.label}</p>
                <p className="text-xs text-slate-500 leading-snug">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs font-mono text-slate-500 border-t border-slate-800 pt-3">{blurb.input}</p>
      </div>

      <TraceLegend mode={mode} activeKind={currentStep.kind} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-4">
          <TraceVisualization step={currentStep} mode={mode} />
          <TraceCodePanel
            code={mode === "recursive" ? RECURSIVE_CODE : ITERATIVE_CODE}
            highlightLine={currentStep.codeLineIndex}
            annotations={annotations}
            stepKind={currentStep.kind}
          />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Step explanation panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step Explanation</p>
            <p className="text-sm font-medium text-slate-200">{currentStep.stepLabel}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{currentStep.explanation}</p>
          </div>
          <VariablePanel variables={variables} />
        </div>
      </div>

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
