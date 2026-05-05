import { STEP_COLORS, STEP_LABELS, STEP_DESCRIPTIONS } from "@/lib/fftTrace";

interface TraceLegendProps {
  mode: "recursive" | "iterative";
  activeKind: string;
}

const RECURSIVE_KINDS = ["call", "base", "split", "combine", "return"] as const;
const ITERATIVE_KINDS = ["bit_reverse", "butterfly_op"] as const;

export function TraceLegend({ mode, activeKind }: TraceLegendProps) {
  const kinds = mode === "recursive" ? RECURSIVE_KINDS : ITERATIVE_KINDS;

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/45 p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Step Legend</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {kinds.map((kind) => {
          const c = STEP_COLORS[kind];
          const isActive = kind === activeKind;
          return (
            <div
              key={kind}
              className={`flex min-h-16 items-start gap-2 rounded-lg border px-3 py-3 transition-all ${
                isActive
                  ? `${c.chipBg} ${c.chipBorder} ring-1 ring-inset ${c.chipBorder}`
                  : "border-slate-700/50 bg-slate-900/45"
              }`}
            >
              {/* Color dot */}
              <span
                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                  isActive ? c.chipText.replace("text-", "bg-") : "bg-slate-600"
                }`}
              />
              <div>
                <p className={`text-xs font-semibold capitalize ${isActive ? c.chipText : "text-slate-300"}`}>
                  {STEP_LABELS[kind]}
                </p>
                <p className={`text-xs leading-snug ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                  {STEP_DESCRIPTIONS[kind]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
