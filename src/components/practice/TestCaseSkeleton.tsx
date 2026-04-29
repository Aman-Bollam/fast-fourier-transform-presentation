import { FAKE_TEST_CASES } from "@/lib/placeholders";

export function TestCaseSkeleton() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300 mb-4">
        Test Cases
      </h3>
      <ul className="divide-y divide-slate-800">
        {FAKE_TEST_CASES.map((tc, i) => (
          <li key={i} className="py-3 grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center text-sm">
            <span className="text-xs text-slate-500 font-mono">#{i + 1}</span>
            <span className="font-mono text-slate-400 truncate">{tc.input}</span>
            <span className="font-mono text-slate-400 truncate">{tc.expected}</span>
            <span className="text-xs text-slate-500">{tc.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
