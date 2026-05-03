"use client";

interface TraceControlsProps {
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

export function TraceControls({ stepIndex, totalSteps, onPrev, onNext, onReset }: TraceControlsProps) {
  return (
    <div className="sticky bottom-4 z-10 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/90 backdrop-blur-md px-5 py-3 shadow-xl shadow-black/40">
        <button
          onClick={onReset}
          disabled={stepIndex === 0}
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
        <button
          onClick={onPrev}
          disabled={stepIndex === 0}
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <span className="text-sm text-slate-500 min-w-[90px] text-center">
          Step {stepIndex + 1} of {totalSteps}
        </span>
        <button
          onClick={onNext}
          disabled={stepIndex === totalSteps - 1}
          className="rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
