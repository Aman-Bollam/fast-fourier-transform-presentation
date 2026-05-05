"use client";
import type { TraceMode } from "@/lib/fftTrace";

interface TraceTabBarProps {
  mode: TraceMode;
  onModeChange: (mode: TraceMode) => void;
}

export function TraceTabBar({ mode, onModeChange }: TraceTabBarProps) {
  return (
    <div className="inline-flex overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950/45 p-1 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)]">
      {(["recursive", "iterative"] as TraceMode[]).map(m => (
        <button
          key={m}
          onClick={() => onModeChange(m)}
          className={`relative min-w-36 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
            mode === m
              ? "bg-cyan-500/12 text-cyan-300 shadow-[inset_0_-2px_0_rgba(34,211,238,0.85)]"
              : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
          }`}
        >
          {m === "recursive" ? "Recursive FFT" : "Iterative FFT"}
        </button>
      ))}
    </div>
  );
}
