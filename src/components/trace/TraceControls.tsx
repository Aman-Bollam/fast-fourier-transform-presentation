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
    <div className="sticky bottom-4 z-30 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-slate-950/90 px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <button
          onClick={onReset}
          disabled={stepIndex === 0}
          className="rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset
        </button>
        <button
          onClick={onPrev}
          disabled={stepIndex === 0}
          className="rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="min-w-[90px] text-center text-sm text-slate-400">
          Step {stepIndex + 1} of {totalSteps}
        </span>
        <button
          onClick={onNext}
          disabled={stepIndex === totalSteps - 1}
          className="rounded-lg border border-blue-400/60 bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.35)] transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
