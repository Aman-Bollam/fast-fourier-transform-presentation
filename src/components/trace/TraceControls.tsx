"use client";

const BTN =
  "rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-colors";

export function TraceControls() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-4 flex flex-wrap items-center gap-2 justify-center">
      <button type="button" className={BTN} onClick={() => console.log("prev")}>
        ← Previous
      </button>
      <button type="button" className={BTN} onClick={() => console.log("next")}>
        Next →
      </button>
      <button
        type="button"
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        onClick={() => console.log("reset")}
      >
        Reset
      </button>
    </div>
  );
}
