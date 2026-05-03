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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Step Legend</p>
      <div className="flex flex-wrap gap-2">
        {kinds.map((kind) => {
          const c = STEP_COLORS[kind];
          const isActive = kind === activeKind;
          return (
            <div
              key={kind}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 transition-all ${
                isActive
                  ? `${c.chipBg} ${c.chipBorder} ring-1 ring-inset ${c.chipBorder}`
                  : "border-slate-700/50 bg-slate-800/30"
              }`}
            >
              {/* Color dot */}
              <span
                className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  isActive ? c.chipText.replace("text-", "bg-") : "bg-slate-600"
                }`}
              />
              <div>
                <p className={`text-xs font-semibold capitalize ${isActive ? c.chipText : "text-slate-400"}`}>
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
