import { STEP_COLORS } from "@/lib/fftTrace";

interface TraceCodePanelProps {
  code: string;
  highlightLine: number;
  annotations: Record<number, string>;
  stepKind: string;
}

export function TraceCodePanel({ code, highlightLine, annotations, stepKind }: TraceCodePanelProps) {
  const lines = code.split("\n");
  const colors = STEP_COLORS[stepKind] ?? STEP_COLORS["call"];

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/45 shadow-[inset_0_1px_0_rgba(148,163,184,0.04)] backdrop-blur">
      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(260px,0.9fr)] border-b border-slate-800/80 px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Code</p>
        <p className="hidden text-xs font-semibold uppercase tracking-wide text-slate-400 sm:block">← annotation</p>
      </div>
      <pre className="overflow-x-auto p-0 text-xs leading-6">
        {lines.map((line, i) => {
          const isActive = i === highlightLine;
          const annotation = annotations[i];
          return (
            <div
              key={i}
              className={`grid min-w-[760px] grid-cols-[2.5rem_minmax(0,1.25fr)_minmax(260px,0.9fr)] items-start border-l-2 px-4 ${
                isActive
                  ? `${colors.activeBg} ${colors.activeBorder}`
                  : "border-transparent hover:bg-slate-900/35"
              }`}
            >
              {/* Line number */}
              <span className="select-none pr-3 text-right text-slate-600">
                {i + 1}
              </span>
              {/* Code */}
              <span className={`whitespace-pre ${isActive ? colors.activeText : "text-slate-400"}`}>
                {line}
              </span>
              {/* Annotation */}
              <span
                className={`truncate pl-8 italic ${
                  isActive ? `${colors.activeText} opacity-90` : "text-slate-600"
                }`}
                title={annotation}
              >
                {annotation}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
