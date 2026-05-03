"use client";
import type { TraceMode } from "@/lib/fftTrace";

interface TraceTabBarProps {
  mode: TraceMode;
  onModeChange: (mode: TraceMode) => void;
}

export function TraceTabBar({ mode, onModeChange }: TraceTabBarProps) {
  return (
    <div className="flex gap-2 border-b border-slate-800 pb-0">
      {(["recursive", "iterative"] as TraceMode[]).map(m => (
        <button
          key={m}
          onClick={() => onModeChange(m)}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            mode === m
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          {m === "recursive" ? "Recursive FFT" : "Iterative FFT"}
        </button>
      ))}
    </div>
  );
}
