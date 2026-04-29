import { FAKE_TRACE_VARIABLES } from "@/lib/placeholders";

export function VariablePanel() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300 mb-4">
        Variables
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="pb-2 font-medium">Name</th>
            <th className="pb-2 font-medium">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {FAKE_TRACE_VARIABLES.map((v) => (
            <tr key={v.name}>
              <td className="py-2 font-mono text-slate-300">{v.name}</td>
              <td className="py-2 font-mono text-slate-500">{v.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
