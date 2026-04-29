"use client";

import { useState } from "react";

export function PracticeIDESkeleton() {
  const [output, setOutput] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 flex flex-col">
      <header className="flex items-center justify-between gap-2 mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Editor
        </h3>
        <select
          disabled
          className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1 text-xs text-slate-400"
        >
          <option>Language: Placeholder</option>
        </select>
      </header>

      <pre className="flex-1 min-h-48 rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm font-mono text-slate-500 overflow-auto">
{`// starter code goes here
function solve(input) {
  // placeholder
  return null;
}`}
      </pre>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOutput("✓ Sample 1 passed (placeholder)")}
          className="rounded-lg bg-blue-500/90 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          Run Tests
        </button>
        <span className="text-xs text-slate-500">
          No code is actually executed — UI placeholder only.
        </span>
      </div>

      {output && (
        <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 font-mono">
          {output}
        </div>
      )}
    </section>
  );
}
