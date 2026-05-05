import type { TraceVariable } from "@/lib/fftTrace";

interface VariablePanelProps {
  variables: TraceVariable[];
}

export function VariablePanel({ variables }: VariablePanelProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/45 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      <div className="border-b border-slate-800/80 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Variables</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800/70 bg-slate-900/35">
            <th className="px-5 py-2 text-left text-xs font-medium text-slate-400">Name</th>
            <th className="px-5 py-2 text-left text-xs font-medium text-slate-400">Value</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((v, i) => (
            <tr
              key={i}
              className={`border-b border-slate-800/50 last:border-0 ${v.highlight ? "bg-amber-500/8" : ""}`}
            >
              <td className="px-5 py-2 font-mono text-xs text-slate-400">{v.name}</td>
              <td className={`px-5 py-2 font-mono text-xs ${v.highlight ? "text-amber-300" : "text-slate-200"}`}>
                {v.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
