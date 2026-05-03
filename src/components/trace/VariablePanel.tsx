import type { TraceVariable } from "@/lib/fftTrace";

interface VariablePanelProps {
  variables: TraceVariable[];
}

export function VariablePanel({ variables }: VariablePanelProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Variables</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800/60">
            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Value</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((v, i) => (
            <tr
              key={i}
              className={`border-b border-slate-800/40 last:border-0 ${v.highlight ? "bg-amber-500/5" : ""}`}
            >
              <td className="px-4 py-2 font-mono text-xs text-slate-400">{v.name}</td>
              <td className={`px-4 py-2 font-mono text-xs ${v.highlight ? "text-amber-300" : "text-slate-300"}`}>
                {v.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
